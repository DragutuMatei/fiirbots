import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, updateDoc, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';

function Admin() {
  const navigate = useNavigate();
  const [project, setProject] = useState({ title: '', description: '', tags: '', imageUrl: '', detailsUrl: '' });
  const [member, setMember] = useState({ name: '', role: '', imageUrl: '', socialLinks: { facebook: '', twitter: '', linkedin: '' } });
  const [competition, setCompetition] = useState({ name: '', description: '', type: 'national', date: '', location: '', status: '', results: '', imageUrl: '' });
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) navigate('/login');
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const projectsCollection = collection(db, 'projects');
      const membersCollection = collection(db, 'teamMembers');
      const competitionsCollection = collection(db, 'competitions');
      const [projectsSnapshot, membersSnapshot, competitionsSnapshot] = await Promise.all([
        getDocs(projectsCollection),
        getDocs(membersCollection),
        getDocs(competitionsCollection),
      ]);
      setProjects(projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setMembers(membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setCompetitions(competitionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Eroare la preluarea datelor:', error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.confirm('ATENȚIE: Această acțiune va ȘTERGE TOȚI membrii existenți din baza de date și îi va înlocui cu cei din fișierul tău CSV. Ești sigur?')) {
      e.target.value = null; // Resetăm input-ul dacă te răzgândești
      return;
    }

    // PapaParse știe să citească direct obiectul de tip "File"
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const sheetMembers = results.data;

          const membersCollection = collection(db, 'teamMembers');
          const snapshot = await getDocs(membersCollection);

          // 1. Ștergem tot din Firebase
          console.log("Ștergem toți membrii vechi...");
          for (const document of snapshot.docs) {
            await deleteDoc(doc(db, 'teamMembers', document.id));
          }

          // 2. Adăugăm membrii noi din fișier
          console.log("Adăugăm membrii noi...");
          for (const sheetMember of sheetMembers) {
            const currentName = sheetMember.name?.trim();

            if (!currentName) continue;

            await addDoc(collection(db, 'teamMembers'), {
              name: currentName,
              role: sheetMember.role?.trim() || 'FIIR',
              imageUrl: sheetMember.imageUrl?.trim() || '',
              socialLinks: { facebook: '', twitter: '', linkedin: '' }
            });
          }

          fetchData();
          alert('Baza de date a fost actualizată cu succes din fișierul tău CSV!');
        } catch (error) {
          console.error('Eroare la interacțiunea cu Firebase:', error);
          alert('Eroare la scrierea/ștergerea în baza de date Firebase.');
        }
      },
      error: (error) => {
        console.error('Eroare la citirea CSV-ului:', error);
        alert('A apărut o eroare la interpretarea fișierului.');
      }
    });

    // Resetăm input-ul pentru a putea încărca același fișier din nou la nevoie
    e.target.value = null;
  };
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'projects'), {
        ...project,
        tags: project.tags.split(',').map(tag => tag.trim()),
      });
      setProject({ title: '', description: '', tags: '', imageUrl: '', detailsUrl: '' });
      fetchData();
      alert('Proiect adăugat cu succes!');
    } catch (error) {
      console.error('Eroare la adăugarea proiectului:', error);
      alert('Eroare la adăugarea proiectului.');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'teamMembers'), member);
      setMember({ name: '', role: '', imageUrl: '', socialLinks: { facebook: '', twitter: '', linkedin: '' } });
      fetchData();
      alert('Membru adăugat cu succes!');
    } catch (error) {
      console.error('Eroare la adăugarea membrului:', error);
      alert('Eroare la adăugarea membrului.');
    }
  };

  const handleAddCompetition = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'competitions'), competition);
      setCompetition({ name: '', description: '', type: 'national', date: '', location: '', status: '', results: '', imageUrl: '' });
      fetchData();
      alert('Competiție adăugată cu succes!');
    } catch (error) {
      console.error('Eroare la adăugarea competiției:', error);
      alert('Eroare la adăugarea competiției.');
    }
  };

  const handleDelete = async (collectionName, id) => {
    if (window.confirm('Sigur vrei să ștergi acest element?')) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        fetchData();
        alert('Element șters cu succes!');
      } catch (error) {
        console.error('Eroare la ștergere:', error);
        alert('Eroare la ștergere.');
      }
    }
  };

  const [redirectLink, setredirectLink] = useState('');

  const fetchredirectLink = async () => {
    try {
      const linkDoc = await getDoc(doc(db, 'redirect', 'activeLink'));
      if (linkDoc.exists()) {
        setredirectLink(linkDoc.data().link);
      }
    } catch (error) {
      console.error('Eroare la preluarea link-ului de redirectionat:', error);
    }
  };

  const handleAddRedirect = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'redirect', 'activeLink'), { link: redirectLink });
      alert('Link de redirectionat salvat cu succes!');
      fetchredirectLink();
    } catch (error) {
      console.error('Eroare la salvarea link-ului de redirectionat:', error);
      alert('Eroare la salvarea link-ului de redirectionat.');
    }
  };

  const handleDeleteRedirect = async () => {
    if (window.confirm('Sigur vrei să ștergi link-ul de redirectionat?')) {
      try {
        await deleteDoc(doc(db, 'redirect', 'activeLink'));
        setredirectLink('');
        alert('Link de redirectionat șters cu succes!');
      } catch (error) {
        console.error('Eroare la ștergerea link-ului de redirectionat:', error);
        alert('Eroare la ștergerea link-ului de redirectionat.');
      }
    }
  };

  const handleExportCSV = () => {
    // 1. Aplatizăm datele ca să arate bine în tabel
    // Extragem link-urile din interiorul obiectului socialLinks
    const exportData = members.map(m => ({
      name: m.name || '',
      role: m.role || '',
      imageUrl: m.imageUrl || '',
      facebook: m.socialLinks?.facebook || '',
      twitter: m.socialLinks?.twitter || '',
      linkedin: m.socialLinks?.linkedin || ''
    }));

    // 2. Generăm CSV-ul cu PapaParse
    const csv = Papa.unparse(exportData);

    // 3. Creăm un link temporar pentru a forța browserul să descarce fișierul
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'membri_fiir.csv'); // Numele fișierului descărcat
    document.body.appendChild(link);

    link.click(); // Declansăm descărcarea

    // Curățăm link-ul temporar
    document.body.removeChild(link);
  };

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy mb-16 section-title">Dashboard Admin</h2>
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Deconectează-te
          </button>

          {/* Butonul nou de Upload CSV */}
          <label className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md cursor-pointer flex items-center justify-center">
            ⬇️ Încarcă CSV cu membrii
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExportCSV}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            ⬆️ Exportă în CSV membrii actuali
          </button>
        </div>

        {/* Add Recruitment Link Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-navy mb-6">Adaugă/Editare Link de redirect pentru fiirbots.ro/redirect dar si pentru butonul din fiirbots.ro/recrutari</h3>
          <form onSubmit={handleAddRedirect} className="space-y-4">
            <input
              type="url"
              placeholder="Link Redirect (ex. https://example.com)"
              value={redirectLink}
              onChange={e => setredirectLink(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <div className="flex space-x-4">
              <button type="submit" className="bg-skyblue text-navy px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                Salvează Link Redirectionat
              </button>
              <button
                type="button"
                onClick={handleDeleteRedirect}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
              >
                Șterge Link Redirect
              </button>
            </div>
          </form>
        </div>

        {/* Add Project Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-navy mb-6">Adaugă Proiect</h3>
          <form onSubmit={handleAddProject} className="space-y-4">
            <input
              type="text"
              placeholder="Titlu"
              value={project.title}
              onChange={e => setProject({ ...project, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              placeholder="Descriere"
              value={project.description}
              onChange={e => setProject({ ...project, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Tag-uri (separate prin virgulă)"
              value={project.tags}
              onChange={e => setProject({ ...project, tags: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="url"
              placeholder="URL Imagine (opțional)"
              value={project.imageUrl}
              onChange={e => setProject({ ...project, imageUrl: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="url"
              placeholder="URL Detalii (opțional)"
              value={project.detailsUrl}
              onChange={e => setProject({ ...project, detailsUrl: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="bg-skyblue text-navy px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
              Adaugă Proiect
            </button>
          </form>
        </div>

        {/* Projects List */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-navy mb-6">Proiecte Existente</h3>
          <ul className="space-y-4">
            {projects.map(p => (
              <li
                key={p.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <span className="font-semibold text-gray-800 text-lg mb-4 sm:mb-0">
                  {p.title}
                </span>

                {/* Zona de butoane grupate */}
                <div className="flex w-full sm:w-auto space-x-3 justify-end">
                  <Link
                    to={`/admin/edit/${p.id}`}
                    className="flex-1 sm:flex-none text-center bg-yellow-500 text-white px-5 py-2 rounded-md font-medium hover:bg-yellow-600 hover:shadow-lg transition-all"
                  >
                    Editează
                  </Link>
                  <button
                    onClick={() => handleDelete('projects', p.id)}
                    className="flex-1 sm:flex-none text-center bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600 hover:shadow-lg transition-all"
                  >
                    Șterge
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Projects List
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-navy mb-6">Proiecte Existente</h3>
          <ul className="space-y-4">
            {projects.map(p => (
              <li key={p.id} className="flex justify-between items-center">
                <span>{p.title}</span>
                <Link
                  to={`/admin/edit/${p.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Editează proiectul
                </Link>
                <button
                  onClick={() => handleDelete('projects', p.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Add Member Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-navy mb-6">Adaugă Membru</h3>
          <form onSubmit={handleAddMember} className="space-y-4">
            <input
              type="text"
              placeholder="Nume"
              value={member.name}
              onChange={e => setMember({ ...member, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Rol"
              value={member.role}
              onChange={e => setMember({ ...member, role: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="url"
              placeholder="URL Imagine (opțional)"
              value={member.imageUrl}
              onChange={e => setMember({ ...member, imageUrl: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="url"
              placeholder="Link Facebook (opțional)"
              value={member.socialLinks.facebook}
              onChange={e => setMember({ ...member, socialLinks: { ...member.socialLinks, facebook: e.target.value } })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="url"
              placeholder="Link Twitter (opțional)"
              value={member.socialLinks.twitter}
              onChange={e => setMember({ ...member, socialLinks: { ...member.socialLinks, twitter: e.target.value } })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="url"
              placeholder="Link LinkedIn (opțional)"
              value={member.socialLinks.linkedin}
              onChange={e => setMember({ ...member, socialLinks: { ...member.socialLinks, linkedin: e.target.value } })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="bg-skyblue text-navy px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
              Adaugă Membru
            </button>
          </form>
        </div>

        {/* Members List */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-navy mb-6">Membri Existenți</h3>
          <ul className="space-y-4">
            {members.map(m => (

              <li key={m.id} className="flex justify-between items-center">
                <span>{m.name}</span>
                <div>
                  <Link to={`/admin/edit-member/${m.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2">Editează</Link>
                  <button onClick={() => handleDelete('teamMembers', m.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Șterge</button>
                </div>
              </li>


            ))}
          </ul>
        </div>

        {/* Add Competition Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-navy mb-6">Adaugă Competiție</h3>
          <form onSubmit={handleAddCompetition} className="space-y-4">
            <input
              type="text"
              placeholder="Nume"
              value={competition.name}
              onChange={e => setCompetition({ ...competition, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              placeholder="Descriere"
              value={competition.description}
              onChange={e => setCompetition({ ...competition, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <select
              value={competition.type}
              onChange={e => setCompetition({ ...competition, type: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="national">Națională</option>
              <option value="international">Internațională</option>
            </select>
            <input
              type="text"
              placeholder="Data (ex. 15-16 Martie 2024)"
              value={competition.date}
              onChange={e => setCompetition({ ...competition, date: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Locație"
              value={competition.location}
              onChange={e => setCompetition({ ...competition, location: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Status (ex. Confirmat)"
              value={competition.status}
              onChange={e => setCompetition({ ...competition, status: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Rezultate (opțional)"
              value={competition.results}
              onChange={e => setCompetition({ ...competition, results: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="url"
              placeholder="URL Imagine (opțional)"
              value={competition.imageUrl}
              onChange={e => setCompetition({ ...competition, imageUrl: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="bg-skyblue text-navy px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
              Adaugă Competiție
            </button>
          </form>
        </div>

        {/* Competitions List */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-navy mb-6">Competiții Existente</h3>
          <ul className="space-y-4">
            {competitions.map(c => (
              <li key={c.id} className="flex justify-between items-center">
                <span>{c.name}</span>
                <div>
                  <Link to={`/admin/edit-competition/${c.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2">Editează</Link>
                  <button onClick={() => handleDelete('competitions', c.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Șterge</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Admin;
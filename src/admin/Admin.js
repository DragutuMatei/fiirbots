import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import Papa from 'papaparse';

// Importăm componentele
import AddProject from './AddProject';
import AddTeamMember from './AddTeamMember';
import AddCompetition from './AddCompetition';

function Admin() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [redirectLink, setredirectLink] = useState('');

  useEffect(() => {
    if (!auth.currentUser) navigate('/login');
    fetchData();
    fetchredirectLink();
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

  const fetchredirectLink = async () => {
    try {
      const linkDoc = await getDoc(doc(db, 'redirect', 'activeLink'));
      if (linkDoc.exists()) {
        setredirectLink(linkDoc.data().link);
      }
    } catch (error) {
      console.error('Eroare la preluarea link-ului:', error);
    }
  };

  const handleAddRedirect = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'redirect', 'activeLink'), { link: redirectLink });
      alert('Link de redirectionat salvat cu succes!');
      fetchredirectLink();
    } catch (error) {
      console.error(error);
      alert('Eroare la salvarea link-ului.');
    }
  };

  const handleDeleteRedirect = async () => {
    if (window.confirm('Sigur vrei să ștergi link-ul de redirectionat?')) {
      try {
        await deleteDoc(doc(db, 'redirect', 'activeLink'));
        setredirectLink('');
        alert('Link șters cu succes!');
      } catch (error) {
        console.error(error);
        alert('Eroare la ștergerea link-ului.');
      }
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
      }
    }
  };

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.confirm('ATENȚIE: Această acțiune va ȘTERGE TOȚI membrii existenți din baza de date și îi va înlocui cu cei din fișierul tău CSV. Ești sigur?')) {
      e.target.value = null; 
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const sheetMembers = results.data;
          const membersCollection = collection(db, 'teamMembers');
          const snapshot = await getDocs(membersCollection);

          for (const document of snapshot.docs) {
            await deleteDoc(doc(db, 'teamMembers', document.id));
          }

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
          console.error(error);
          alert('Eroare la scrierea/ștergerea în baza de date Firebase.');
        }
      },
      error: (error) => {
        console.error(error);
        alert('A apărut o eroare la interpretarea fișierului.');
      }
    });
    e.target.value = null;
  };

  const handleExportCSV = () => {
    const exportData = members.map(m => ({
      name: m.name || '',
      role: m.role || '',
      imageUrl: m.imageUrl || '',
      facebook: m.socialLinks?.facebook || '',
      twitter: m.socialLinks?.twitter || '',
      linkedin: m.socialLinks?.linkedin || ''
    }));

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'membri_fiir.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-cream min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy mb-12 section-title">Dashboard Admin</h2>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12 justify-center sm:justify-start">
          <button onClick={handleSignOut} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition shadow-md w-full sm:w-auto">
            Deconectează-te
          </button>
          <label className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md cursor-pointer flex items-center justify-center w-full sm:w-auto">
            ⬇️ Încarcă CSV membri
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>
          <button onClick={handleExportCSV} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md w-full sm:w-auto">
            ⬆️ Exportă CSV membri
          </button>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-navy mb-6">Adaugă/Editare Link Redirect</h3>
          <form onSubmit={handleAddRedirect} className="space-y-4">
            <input type="url" placeholder="Link Redirect (ex. https://example.com)" value={redirectLink} onChange={e => setredirectLink(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" required />
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="submit" className="bg-skyblue text-navy px-6 py-3 rounded-lg hover:bg-opacity-90 transition w-full sm:w-auto">Salvează Link</button>
              <button type="button" onClick={handleDeleteRedirect} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition w-full sm:w-auto">Șterge Link</button>
            </div>
          </form>
        </div>

        {/* PROIECTE */}
        <AddProject onAdd={fetchData} />
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-navy mb-6">Proiecte Existente</h3>
          <ul className="space-y-4">
            {projects.map(p => (
              <li key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-md transition">
                <span className="font-semibold text-gray-800 text-lg mb-4 sm:mb-0">{p.title}</span>
                <div className="flex w-full sm:w-auto gap-3 justify-end">
                  <Link to={`/admin/edit/${p.id}`} className="flex-1 sm:flex-none text-center bg-yellow-500 text-white px-5 py-2 rounded-md font-medium hover:bg-yellow-600 transition">Editează</Link>
                  <button onClick={() => handleDelete('projects', p.id)} className="flex-1 sm:flex-none bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600 transition">Șterge</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ECHIPĂ */}
        <AddTeamMember onAdd={fetchData} />
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-navy mb-6">Membri Existenți</h3>
          <ul className="space-y-4">
            {members.map(m => (
              <li key={m.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-md transition">
                <span className="font-semibold text-gray-800 text-lg mb-4 sm:mb-0">{m.name}</span>
                <div className="flex w-full sm:w-auto gap-3 justify-end">
                  <Link to={`/admin/edit-member/${m.id}`} className="flex-1 sm:flex-none text-center bg-yellow-500 text-white px-5 py-2 rounded-md font-medium hover:bg-yellow-600 transition">Editează</Link>
                  <button onClick={() => handleDelete('teamMembers', m.id)} className="flex-1 sm:flex-none bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600 transition">Șterge</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPETIȚII */}
        <AddCompetition onAdd={fetchData} />
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-navy mb-6">Competiții Existente</h3>
          <ul className="space-y-4">
            {competitions.map(c => (
              <li key={c.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-md transition">
                <span className="font-semibold text-gray-800 text-lg mb-4 sm:mb-0">{c.name}</span>
                <div className="flex w-full sm:w-auto gap-3 justify-end">
                  <Link to={`/admin/edit-competition/${c.id}`} className="flex-1 sm:flex-none text-center bg-yellow-500 text-white px-5 py-2 rounded-md font-medium hover:bg-yellow-600 transition">Editează</Link>
                  <button onClick={() => handleDelete('competitions', c.id)} className="flex-1 sm:flex-none bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600 transition">Șterge</button>
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
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

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

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy mb-16 section-title">Dashboard Admin</h2>
        <button onClick={handleSignOut} className="bg-red-500 text-white px-6 py-3 rounded-lg mb-8 hover:bg-red-600 transition">
          Deconectează-te
        </button>

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
              <li key={p.id} className="flex justify-between items-center">
                <span>{p.title}</span>
                <button
                  onClick={() => handleDelete('projects', p.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>
        </div>

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
                <button
                  onClick={() => handleDelete('teamMembers', m.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Șterge
                </button>
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
                <button
                  onClick={() => handleDelete('competitions', c.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Admin;
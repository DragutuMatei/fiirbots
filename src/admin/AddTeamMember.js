import React, { useState } from 'react';
import { db } from '../firebase';
// Adăugăm serverTimestamp
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

function AddTeamMember() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState(''); // Era lipsă în AddTeamMember din ce mi-ai trimis
  const [order, setOrder] = useState(''); // State nou
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'teamMembers'), {
        name,
        role,
        imageUrl,
        socialLinks: {
          facebook: facebook || null,
          linkedin: linkedin || null,
          twitter: twitter || null
        },
        order: order ? Number(order) : 999,
        createdAt: serverTimestamp()
      });
      alert('Membru adăugat cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la adăugarea membrului: ' + error.message);
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Adaugă Membru Echipă</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-lg p-6 bg-white rounded-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                 {/* ... (Toate inputurile tale vechi - name, role, imageUrl) ... */}
                <div className="mb-3"><label className="form-label">Nume</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                <div className="mb-3"><label className="form-label">Rol</label><input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required /></div>
                <div className="mb-3"><label className="form-label">URL Imagine</label><input type="text" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /></div>
                <div className="mb-3"><label className="form-label">Link Facebook (opțional)</label><input type="text" className="form-control" value={facebook} onChange={(e) => setFacebook(e.target.value)} /></div>
                <div className="mb-3"><label className="form-label">Link LinkedIn (opțional)</label><input type="text" className="form-control" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} /></div>
                <div className="mb-3"><label className="form-label">Link Twitter (opțional)</label><input type="text" className="form-control" value={twitter} onChange={(e) => setTwitter(e.target.value)} /></div>
                
                {/* Input pentru ordine */}
                <div className="mb-3">
                  <label className="form-label">Ordine afișare (1 apare primul)</label>
                  <input type="number" className="form-control" value={order} onChange={(e) => setOrder(e.target.value)} min="1" />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-4">Adaugă Membru</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeamMember;
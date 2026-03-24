import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { useNavigate, useParams } from 'react-router-dom';

function EditTeamMember() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [order, setOrder] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const docRef = doc(db, 'teamMembers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setRole(data.role || '');
          setImageUrl(data.imageUrl || '');
          setFacebook(data.socialLinks?.facebook || '');
          setLinkedin(data.socialLinks?.linkedin || '');
          setTwitter(data.socialLinks?.twitter || '');
          setOrder(data.order !== undefined && data.order !== 999 ? data.order : '');
        } else {
          alert('Membrul nu a fost găsit!');
          navigate('/admin');
        }
      } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
      }
    };
    fetchMember();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'teamMembers', id);
      await updateDoc(docRef, {
        name,
        role,
        imageUrl,
        socialLinks: {
          facebook: facebook || null,
          linkedin: linkedin || null,
          twitter: twitter || null
        },
        order: order ? Number(order) : 999 
      });
      alert('Membru actualizat cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la actualizarea membrului: ' + error.message);
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Editează Membru</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-lg p-6 bg-white rounded-xl">
            <form onSubmit={handleSubmit}>
              {/* ... (aceleași input-uri ca la AddTeamMember) ... */}
              <div className="mb-3"><label className="form-label">Nume</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
              <div className="mb-3"><label className="form-label">Rol</label><input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required /></div>
              <div className="mb-3"><label className="form-label">URL Imagine</label><input type="text" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /></div>
              <div className="mb-3"><label className="form-label">Link Facebook (opțional)</label><input type="text" className="form-control" value={facebook} onChange={(e) => setFacebook(e.target.value)} /></div>
              <div className="mb-3"><label className="form-label">Link LinkedIn (opțional)</label><input type="text" className="form-control" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} /></div>
              <div className="mb-3"><label className="form-label">Link Twitter (opțional)</label><input type="text" className="form-control" value={twitter} onChange={(e) => setTwitter(e.target.value)} /></div>
              <div className="mb-3"><label className="form-label">Ordine afișare (1 apare primul)</label><input type="number" className="form-control" value={order} onChange={(e) => setOrder(e.target.value)} min="1" /></div>
              
              <div className="flex gap-4 mt-6">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full">Salvează</button>
                <button type="button" onClick={() => navigate('/admin')} className="bg-gray-300 px-6 py-2 rounded-lg w-full">Anulează</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTeamMember;
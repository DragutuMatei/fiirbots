import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

function AddTeamMember() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  // În loc de text, stocăm fișierul propriu-zis
  const [imageFile, setImageFile] = useState(null); 
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [order, setOrder] = useState('');
  
  // Stare pentru a arăta că se încarcă datele
  const [isUploading, setIsUploading] = useState(false); 
  const navigate = useNavigate();

  // Funcția care urcă imaginea pe Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // ÎNLOCUIEȘTE CU DATELE TALE DE LA CLOUDINARY
    formData.append('upload_preset', 'fiirbots_website'); 
    const cloudName = 'dcndk7eiv'; 

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message || 'Eroare la încărcarea imaginii');
    }
    return data.secure_url; // Acesta este link-ul curat către imagine
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Începem procesul de încărcare

    try {
      let finalImageUrl = '';

      // Dacă utilizatorul a selectat o imagine, o urcăm prima dată
      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      }

      // După ce avem link-ul, salvăm în Firebase
      await addDoc(collection(db, 'teamMembers'), {
        name,
        role,
        imageUrl: finalImageUrl, // Salvăm link-ul returnat de Cloudinary
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
      alert('Eroare: ' + error.message);
    } finally {
      setIsUploading(false); // Oprim starea de încărcare indiferent de rezultat
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
                <div className="mb-3">
                  <label className="form-label">Nume</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required />
                </div>
                
                {/* NOU: Câmpul de tip 'file' pentru imagine */}
                <div className="mb-3">
                  <label className="form-label">Încarcă Fotografie (opțional)</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" // Permite doar imagini
                    onChange={(e) => setImageFile(e.target.files[0])} 
                  />
                  {imageFile && <small className="text-gray-500 mt-1">Fișier selectat: {imageFile.name}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Link Facebook (opțional)</label>
                  <input type="text" className="form-control" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Link LinkedIn (opțional)</label>
                  <input type="text" className="form-control" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Link Twitter (opțional)</label>
                  <input type="text" className="form-control" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Ordine afișare (1 apare primul)</label>
                  <input type="number" className="form-control" value={order} onChange={(e) => setOrder(e.target.value)} min="1" />
                </div>
                
                <button 
                  type="submit" 
                  className={`btn btn-primary w-full mt-4 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isUploading}
                >
                  {isUploading ? 'Se încarcă și se salvează...' : 'Adaugă Membru'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeamMember;
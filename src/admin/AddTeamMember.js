import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

function AddTeamMember({ onAdd }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [order, setOrder] = useState('');
  const [isUploading, setIsUploading] = useState(false); 

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fiirbots_website'); // Completează cu datele tale Cloudinary
    const cloudName = 'dcndk7eiv'; 

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message || 'Eroare la încărcare');
    return data.secure_url; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); 

    try {
      let finalImageUrl = '';
      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      }

      await addDoc(collection(db, 'teamMembers'), {
        name,
        role,
        imageUrl: finalImageUrl,
        socialLinks: {
          facebook: facebook || null,
          linkedin: linkedin || null,
          twitter: twitter || null
        },
        order: order ? Number(order) : 999,
        createdAt: serverTimestamp()
      });

      alert('Membru adăugat cu succes!');
      
      // Golim formularul
      setName(''); setRole(''); setImageFile(null); setFacebook(''); setLinkedin(''); setTwitter(''); setOrder('');
      
      // Dăm semnal către Admin.js să facă refresh la listă
      if (onAdd) onAdd(); 

    } catch (error) {
      alert('Eroare: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
      <h3 className="text-xl sm:text-2xl font-bold text-navy mb-6">Adaugă Membru Echipă</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nume" className="w-full p-3 border border-gray-300 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Rol" className="w-full p-3 border border-gray-300 rounded-lg" value={role} onChange={(e) => setRole(e.target.value)} required />
        
        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
          <label className="text-sm text-gray-600 block mb-1">Încarcă Fotografie (Cloudinary)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>

        <input type="url" placeholder="Link Facebook (opțional)" className="w-full p-3 border border-gray-300 rounded-lg" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
        <input type="url" placeholder="Link LinkedIn (opțional)" className="w-full p-3 border border-gray-300 rounded-lg" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        <input type="url" placeholder="Link Twitter (opțional)" className="w-full p-3 border border-gray-300 rounded-lg" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
        <input type="number" placeholder="Ordine afișare (1, 2, 3...)" className="w-full p-3 border border-gray-300 rounded-lg" value={order} onChange={(e) => setOrder(e.target.value)} min="1" />
        
        <button type="submit" disabled={isUploading} className={`bg-skyblue text-navy font-bold px-6 py-3 rounded-lg transition w-full sm:w-auto ${isUploading ? 'opacity-50' : 'hover:bg-opacity-90'}`}>
          {isUploading ? 'Se încarcă...' : 'Adaugă Membru'}
        </button>
      </form>
    </div>
  );
}

export default AddTeamMember;
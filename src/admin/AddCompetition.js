import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

function AddCompetition({ onAdd }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('national');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [results, setResults] = useState('');
  const [imageFile, setImageFile] = useState(null); // Înlocuiește imageUrl
  const [order, setOrder] = useState(''); 
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fiirbots_website'); // <-- AICI
    const cloudName = 'dcndk7eiv'; // <-- AICI

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

      await addDoc(collection(db, 'competitions'), {
        name,
        type,
        description,
        location,
        date,
        status,
        results: results || null,
        imageUrl: finalImageUrl,
        createdAt: serverTimestamp(),
        order: order ? Number(order) : 999 
      });

      alert('Competiție adăugată cu succes!');
      
      // Reset formulare
      setName(''); setType('national'); setDescription(''); setLocation(''); setDate(''); setStatus(''); setResults(''); setImageFile(null); setOrder('');
      if (onAdd) onAdd(); // Refresh listă
    } catch (error) {
      alert('Eroare: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
      <h3 className="text-xl sm:text-2xl font-bold text-navy mb-6">Adaugă Competiție</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nume Competiție" className="w-full p-3 border border-gray-300 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <select className="w-full p-3 border border-gray-300 rounded-lg" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="national">Națională</option>
          <option value="international">Internațională</option>
        </select>
        
        <textarea placeholder="Descriere" className="w-full p-3 border border-gray-300 rounded-lg h-24" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <input type="text" placeholder="Locație" className="w-full p-3 border border-gray-300 rounded-lg" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Data (ex. 15-16 Martie 2024)" className="w-full p-3 border border-gray-300 rounded-lg" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" placeholder="Status (ex. Confirmat, În pregătire)" className="w-full p-3 border border-gray-300 rounded-lg" value={status} onChange={(e) => setStatus(e.target.value)} required />
        <input type="text" placeholder="Rezultate (opțional)" className="w-full p-3 border border-gray-300 rounded-lg" value={results} onChange={(e) => setResults(e.target.value)} />
        
        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
          <label className="text-sm text-gray-600 block mb-1">Încarcă Fotografie Competiție (Cloudinary)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>

        <input type="number" placeholder="Ordine afișare (1, 2, 3...)" className="w-full p-3 border border-gray-300 rounded-lg" value={order} onChange={(e) => setOrder(e.target.value)} min="1" />
        
        <button type="submit" disabled={isUploading} className={`bg-skyblue text-navy font-bold px-6 py-3 rounded-lg transition w-full sm:w-auto ${isUploading ? 'opacity-50' : 'hover:bg-opacity-90'}`}>
          {isUploading ? 'Se încarcă...' : 'Adaugă Competiție'}
        </button>
      </form>
    </div>
  );
}

export default AddCompetition;
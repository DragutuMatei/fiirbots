import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

function AddProject({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState(null); // Înlocuiește imageUrl
  const [detailsUrl, setDetailsUrl] = useState('');
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

      await addDoc(collection(db, 'projects'), {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        imageUrl: finalImageUrl,
        detailsUrl,
        createdAt: serverTimestamp(),
        order: order ? Number(order) : 999 
      });
      alert('Proiect adăugat cu succes!');
      
      // Reset formulare
      setTitle(''); setDescription(''); setTags(''); setImageFile(null); setDetailsUrl(''); setOrder('');
      if (onAdd) onAdd(); // Refresh listă
    } catch (error) {
      alert('Eroare: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-12">
      <h3 className="text-xl sm:text-2xl font-bold text-navy mb-6">Adaugă Proiect</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Titlu" className="w-full p-3 border border-gray-300 rounded-lg" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Descriere" className="w-full p-3 border border-gray-300 rounded-lg h-24" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <input type="text" placeholder="Tag-uri (separate prin virgulă)" className="w-full p-3 border border-gray-300 rounded-lg" value={tags} onChange={(e) => setTags(e.target.value)} />
        
        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
          <label className="text-sm text-gray-600 block mb-1">Încarcă Fotografie Proiect (Cloudinary)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>

        <input type="url" placeholder="URL Detalii (link extern)" className="w-full p-3 border border-gray-300 rounded-lg" value={detailsUrl} onChange={(e) => setDetailsUrl(e.target.value)} />
        <input type="number" placeholder="Ordine afișare (1, 2, 3...)" className="w-full p-3 border border-gray-300 rounded-lg" value={order} onChange={(e) => setOrder(e.target.value)} min="1" />
        
        <button type="submit" disabled={isUploading} className={`bg-skyblue text-navy font-bold px-6 py-3 rounded-lg transition w-full sm:w-auto ${isUploading ? 'opacity-50' : 'hover:bg-opacity-90'}`}>
          {isUploading ? 'Se încarcă...' : 'Adaugă Proiect'}
        </button>
      </form>
    </div>
  );
}

export default AddProject;
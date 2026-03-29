import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { useNavigate, useParams } from 'react-router-dom';

function EditProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [detailsUrl, setDetailsUrl] = useState('');
  const [order, setOrder] = useState('');
  
  // Stări pentru imagine
  const [imageUrl, setImageUrl] = useState(''); 
  const [imageFile, setImageFile] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || '');
          setDescription(data.description || '');
          setTags(data.tags ? data.tags.join(', ') : ''); 
          setImageUrl(data.imageUrl || '');
          setDetailsUrl(data.detailsUrl || '');
          setOrder(data.order !== undefined && data.order !== 999 ? data.order : '');
        } else {
          alert('Proiectul nu a fost găsit!');
          navigate('/admin');
        }
      } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
      }
    };
    fetchProject();
  }, [id, navigate]);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fiirbots_website'); // ÎNLOCUIEȘTE
    const cloudName = 'dcndk7eiv'; // ÎNLOCUIEȘTE

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
      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const docRef = doc(db, 'projects', id);
      await updateDoc(docRef, {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        imageUrl: finalImageUrl,
        detailsUrl,
        order: order ? Number(order) : 999 
      });

      alert('Proiect actualizat cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la actualizarea proiectului: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-navy">Editează Proiectul</h2>
      <div className="max-w-2xl mx-auto">
        <div className="card shadow-lg p-6 bg-white rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Titlu</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-skyblue" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            
            <div>
              <label className="block text-gray-700 font-bold mb-2">Descriere</label>
              <textarea className="w-full px-3 py-2 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-skyblue" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            
            <div>
              <label className="block text-gray-700 font-bold mb-2">Tag-uri (separate prin virgulă)</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-skyblue" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <label className="block text-gray-700 font-bold mb-2">Imagine Proiect</label>
              {imageUrl && !imageFile && (
                <div className="mb-2 text-sm text-green-600 font-medium">✓ Acest proiect are deja o imagine setată. Încarcă alta doar dacă vrei să o înlocuiești.</div>
              )}
              <input type="file" accept="image/*" className="w-full" onChange={(e) => setImageFile(e.target.files[0])} />
              {imageFile && <div className="mt-2 text-sm text-blue-600">Fișier nou selectat: {imageFile.name}</div>}
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">URL Detalii (opțional)</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-skyblue" value={detailsUrl} onChange={(e) => setDetailsUrl(e.target.value)} placeholder="ex. https://link-catre-proiect.com" />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Ordine afișare (1 apare primul)</label>
              <input type="number" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-skyblue" value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Ex: 1, 2, 3..." min="1" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button type="submit" disabled={isUploading} className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-medium w-full transition ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
                {isUploading ? 'Se salvează...' : 'Salvează Modificările'}
              </button>
              <button type="button" disabled={isUploading} onClick={() => navigate('/admin')} className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium w-full hover:bg-gray-400 transition">
                Anulează
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
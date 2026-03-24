import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
// Importăm funcțiile necesare pentru editare
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { useNavigate, useParams } from 'react-router-dom';

function EditProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [detailsUrl, setDetailsUrl] = useState('');
  const [order, setOrder] = useState('');
  
  const navigate = useNavigate();
  // Preluăm ID-ul proiectului din URL
  const { id } = useParams(); 

  // Preluăm datele proiectului când se încarcă pagina
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || '');
          setDescription(data.description || '');
          // Transformăm array-ul de tag-uri înapoi în string pentru input
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'projects', id);
      await updateDoc(docRef, {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        imageUrl,
        detailsUrl,
        // Dacă order e gol, punem 999 pentru a-l trimite la coadă
        order: order ? Number(order) : 999 
      });
      alert('Proiect actualizat cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la actualizarea proiectului: ' + error.message);
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Editează Proiectul</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-lg p-6 bg-white rounded-xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Titlu</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Descriere</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Tag-uri (separate prin virgulă)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">URL Imagine</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Ordine afișare (1 apare primul)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="Ex: 1, 2, 3..."
                  min="1"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition w-full">
                  Salvează Modificările
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/admin')}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition w-full"
                >
                  Anulează
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { useNavigate, useParams } from 'react-router-dom';

function EditCompetition() {
  const [name, setName] = useState('');
  const [type, setType] = useState('national');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [results, setResults] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [order, setOrder] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const docRef = doc(db, 'competitions', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setType(data.type || 'national');
          setDescription(data.description || '');
          setLocation(data.location || '');
          setDate(data.date || '');
          setStatus(data.status || '');
          setResults(data.results || '');
          setImageUrl(data.imageUrl || '');
          setOrder(data.order !== undefined && data.order !== 999 ? data.order : '');
        } else {
          alert('Competiția nu a fost găsită!');
          navigate('/admin');
        }
      } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
      }
    };
    fetchCompetition();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'competitions', id);
      await updateDoc(docRef, {
        name,
        type,
        description,
        location,
        date,
        status,
        results: results || null,
        imageUrl,
        order: order ? Number(order) : 999 
      });
      alert('Competiție actualizată cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la actualizarea competiției: ' + error.message);
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Editează Competiția</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-lg p-6 bg-white rounded-xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nume Competiție</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Tip</label>
                <select className="form-control" value={type} onChange={(e) => setType(e.target.value)} required>
                  <option value="national">Națională</option>
                  <option value="international">Internațională</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Descriere</label>
                <textarea className="form-control h-32" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Locație</label>
                <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Data</label>
                <input type="text" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Rezultate (opțional)</label>
                <input type="text" className="form-control" value={results} onChange={(e) => setResults(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">URL Imagine (opțional)</label>
                <input type="url" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Ordine afișare (1 apare primul)</label>
                <input type="number" className="form-control" value={order} onChange={(e) => setOrder(e.target.value)} min="1" />
              </div>
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

export default EditCompetition;
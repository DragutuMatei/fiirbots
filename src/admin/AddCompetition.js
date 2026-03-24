import React, { useState } from 'react';
import { db } from '../firebase';
// Importăm serverTimestamp
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

function AddCompetition() {
  const [name, setName] = useState('');
  const [type, setType] = useState('national');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [results, setResults] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [order, setOrder] = useState(''); // State nou
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'competitions'), {
        name,
        type,
        description,
        location,
        date,
        status,
        results: results || null,
        imageUrl,
        order: order ? Number(order) : 999, // Salvăm ordinea
        createdAt: serverTimestamp() // Salvăm timestamp-ul
      });
      alert('Competiție adăugată cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la adăugarea competiției: ' + error.message);
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Adaugă Competiție</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-lg p-6 bg-white rounded-xl">
            <div className="card-body">
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
                  <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Locație</label>
                  <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Data (ex. 15-16 Martie 2024)</label>
                  <input type="text" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status (ex. Confirmat, În pregătire)</label>
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
                {/* Input pentru ordine */}
                <div className="mb-3">
                  <label className="form-label">Ordine afișare (1 apare primul)</label>
                  <input type="number" className="form-control" value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Ex: 1, 2, 3..." min="1" />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-4">Adaugă Competiție</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCompetition;
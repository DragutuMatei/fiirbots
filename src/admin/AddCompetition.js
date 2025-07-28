import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AddCompetition() {
  const [name, setName] = useState('');
  const [type, setType] = useState('national');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [results, setResults] = useState('');
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
        results: results || null
      });
      alert('Competiție adăugată cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la adăugarea competiției: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Adaugă Competiție</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nume Competiție</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tip</label>
                  <select
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="national">Națională</option>
                    <option value="international">Internațională</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Descriere</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Locație</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Data</label>
                  <input
                    type="text"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="ex. 15-16 Martie 2024"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="ex. Confirmat, În pregătire"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rezultate (opțional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                    placeholder="ex. Premiul I - 2022"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Adaugă Competiție</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCompetition;
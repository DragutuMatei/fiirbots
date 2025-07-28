import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AddTeamMember() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'teamMembers'), {
        name,
        role,
        imageUrl,
        socialLinks: {
          facebook: facebook || null,
          linkedin: linkedin || null
        }
      });
      alert('Membru adăugat cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la adăugarea membrului: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Adaugă Membru Echipă</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nume</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <input
                    type="text"
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">URL Imagine</label>
                  <input
                    type="text"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Link Facebook (opțional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Link LinkedIn (opțional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Adaugă Membru</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeamMember;
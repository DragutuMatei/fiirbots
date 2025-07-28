import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AddProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [detailsUrl, setDetailsUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'projects'), {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        imageUrl,
        detailsUrl
      });
      alert('Proiect adăugat cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la adăugarea proiectului: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Adaugă Proiect</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Titlu</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
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
                  <label className="form-label">Tag-uri (separate prin virgulă)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="ex. Robotică, AI, Computer Vision"
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
                  <label className="form-label">URL Detalii (opțional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={detailsUrl}
                    onChange={(e) => setDetailsUrl(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Adaugă Proiect</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
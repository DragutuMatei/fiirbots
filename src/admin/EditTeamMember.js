import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { useNavigate, useParams } from 'react-router-dom';

function EditTeamMember() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  
  // imageUrl va reține link-ul vechi (din baza de date)
  const [imageUrl, setImageUrl] = useState(''); 
  // imageFile va reține noul fișier, dacă utilizatorul alege să îl schimbe
  const [imageFile, setImageFile] = useState(null); 
  
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [order, setOrder] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Preluăm datele membrului la încărcarea paginii
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const docRef = doc(db, 'teamMembers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setRole(data.role || '');
          setImageUrl(data.imageUrl || ''); // Salvăm link-ul vechi
          setFacebook(data.socialLinks?.facebook || '');
          setLinkedin(data.socialLinks?.linkedin || '');
          setTwitter(data.socialLinks?.twitter || '');
          setOrder(data.order !== undefined && data.order !== 999 ? data.order : '');
        } else {
          alert('Membrul nu a fost găsit!');
          navigate('/admin');
        }
      } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
      }
    };
    fetchMember();
  }, [id, navigate]);

  // Aceeași funcție de upload către Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // ATENȚIE: Înlocuiește cu datele tale de la Cloudinary
    formData.append('upload_preset', 'fiirbots_website'); 
    const cloudName = 'dcndk7eiv'; 

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message || 'Eroare la încărcarea imaginii');
    }
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Plecăm de la premisa că păstrăm imaginea veche
      let finalImageUrl = imageUrl;

      // Dacă utilizatorul a selectat un FIȘIER NOU, îl urcăm și suprascriem link-ul
      if (imageFile) {
        finalImageUrl = await uploadImageToCloudinary(imageFile);
      }

      const docRef = doc(db, 'teamMembers', id);
      await updateDoc(docRef, {
        name,
        role,
        imageUrl: finalImageUrl, // Folosim fie link-ul vechi, fie pe cel nou abia generat
        socialLinks: {
          facebook: facebook || null,
          linkedin: linkedin || null,
          twitter: twitter || null
        },
        order: order ? Number(order) : 999 
      });

      alert('Membru actualizat cu succes!');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la actualizarea membrului: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Editează Membru</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-lg p-6 bg-white rounded-xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nume</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required />
              </div>
              
              {/* NOU: Secțiunea pentru imagine (afișează statusul curent și permite upload nou) */}
              <div className="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <label className="form-label font-bold text-gray-700">Fotografie Profil</label>
                
                {imageUrl && !imageFile && (
                  <div className="mb-2 text-sm text-green-600">
                    ✓ Are deja o imagine setată. Încarcă alta doar dacă vrei să o schimbi.
                  </div>
                )}
                
                <input 
                  type="file" 
                  className="form-control" 
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])} 
                />
                {imageFile && <div className="mt-2 text-sm text-blue-600">Fișier nou selectat: {imageFile.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Link Facebook (opțional)</label>
                <input type="text" className="form-control" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Link LinkedIn (opțional)</label>
                <input type="text" className="form-control" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Link Twitter (opțional)</label>
                <input type="text" className="form-control" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Ordine afișare (1 apare primul)</label>
                <input type="number" className="form-control" value={order} onChange={(e) => setOrder(e.target.value)} min="1" />
              </div>
              
              <div className="flex gap-4 mt-6">
                <button 
                  type="submit" 
                  className={`bg-blue-600 text-white px-6 py-2 rounded-lg w-full ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  disabled={isUploading}
                >
                  {isUploading ? 'Se salvează...' : 'Salvează Modificările'}
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/admin')} 
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg w-full hover:bg-gray-400"
                  disabled={isUploading}
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

export default EditTeamMember;
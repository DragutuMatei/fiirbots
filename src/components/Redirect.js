import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

function RedirectPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const linkDoc = await getDoc(doc(db, 'redirect', 'activeLink'));
        if (linkDoc.exists()) {
          const link = linkDoc.data().link;
          if (link) {
            window.location.href = link; // Redirect to the external link
          } else {
            setError('Niciun link de redirectionat disponibil.');
          }
        } else {
          setError('Niciun link de redirectionat găsit.');
        }
      } catch (error) {
        console.error('Eroare la preluarea link-ului de redirectionat:', error);
        setError('Eroare la încărcarea link-ului de redirectionat.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndRedirect();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <p className="text-navy text-xl">Se încarcă...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return null; // The redirect should happen before this is rendered
}

export default RedirectPage;
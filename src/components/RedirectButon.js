import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

function RedirectButon() {
  const [recruitmentLink, setRecruitmentLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const linkDoc = await getDoc(doc(db, 'redirect', 'activeLink'));
        if (linkDoc.exists()) {
          setRecruitmentLink(linkDoc.data().link);
        }
      } catch (error) {
        console.error('Eroare la preluarea link-ului de redirectionat:', error);
      }
    };
    fetchData();
  }, []);

  const handleRedirect = () => {
    if (recruitmentLink) {
      window.location.href = recruitmentLink; // Redirect to the external link
    } else {
      alert('Niciun link de redirectionat disponibil.');
    }
  };

  return (
    <div>
      {recruitmentLink ? (
        <button
          type="button"
          onClick={handleRedirect}
          className="bg-skyblue text-navy px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
        >
            Vezi unde duce link-ul 👀
        </button>
      ) : (
        <p>Niciun link de redirectionat disponibil.</p>
      )}
    </div>
  );
}

export default RedirectButon;
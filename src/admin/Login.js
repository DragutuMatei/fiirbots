import React from 'react';
import { auth, googleProvider, isAdminEmail } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!isAdminEmail(user.email)) {
        alert('Accesul este permis doar pentru email-uri @stim-ong.ro sau @fiirbots.ro');
        await auth.signOut();
        return;
      }
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Eroare la autentificare: ' + error.message);
    }
  };

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy mb-16 section-title">Login Admin</h2>
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <p className="text-navy text-lg mb-6 text-center">
            Autentifică-te folosind contul Google asociat cu adresa @stim-ong.ro sau @fiirbots.ro
          </p>
          <button onClick={handleGoogleSignIn} className="bg-skyblue text-navy px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition w-full flex items-center justify-center">
            <i className="fab fa-google mr-2"></i> Conectează-te cu Google
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
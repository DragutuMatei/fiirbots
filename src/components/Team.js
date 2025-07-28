import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const membersCollection = collection(db, 'teamMembers');
        const querySnapshot = await getDocs(membersCollection);
        const membersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeamMembers(membersData.sort((a, b) => b.id.localeCompare(a.id)));
      } catch (error) {
        console.error('Eroare la preluarea membrilor:', error);
      }
    };
    fetchTeamMembers();
  }, []);

  return (
    <section id="echipa" className="py-20 bg-navy">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-cream mb-16 section-title">Echipa Noastră</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.slice(0, showAll ? teamMembers.length : 5).map((member, index) => (
            <div key={member.id} className="team-member bg-cream rounded-xl overflow-hidden shadow-lg text-center">
              <div className="h-48 flex items-center justify-center bg-skyblue">
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-32 h-32 text-navy" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="35" r="20" />
                    <path d="M50,60 C33.4315,60 20,73.4315 20,90 L80,90 C80,73.4315 66.5685,60 50,60 Z" />
                  </svg>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  {member.socialLinks?.facebook && (
                    <a href={member.socialLinks.facebook} className="text-purple hover:text-navy transition">
                      <i className="fab fa-facebook-f w-5 h-5" />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a href={member.socialLinks.twitter} className="text-purple hover:text-navy transition">
                      <i className="fab fa-twitter w-5 h-5" />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} className="text-purple hover:text-navy transition">
                      <i className="fab fa-linkedin-in w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {!showAll && teamMembers.length > 5 && (
          <div className="mt-16 text-center">
            <button onClick={() => setShowAll(true)} className="bg-skyblue text-navy px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition shadow-lg">
              Vezi Întreaga Echipă
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Team;
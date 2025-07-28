import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitionsCollection = collection(db, 'competitions');
        const querySnapshot = await getDocs(competitionsCollection);
        const competitionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCompetitions(competitionsData.sort((a, b) => b.id.localeCompare(a.id)));
      } catch (error) {
        console.error('Eroare la preluarea competițiilor:', error);
      }
    };
    fetchCompetitions();
  }, []);

  const statusClasses = {
    Confirmat: 'bg-green-100 text-green-800',
    'În pregătire': 'bg-yellow-100 text-yellow-800',
    'Înscriere în curs': 'bg-blue-100 text-blue-800',
    Planificat: 'bg-purple-100 text-purple-800',
  };

  const nationalComps = competitions.filter(c => c.type === 'national').slice(0, showAll ? competitions.length : 2);
  const internationalComps = competitions.filter(c => c.type === 'international').slice(0, showAll ? competitions.length : 2);

  return (
    <section id="competitii" className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy mb-16 section-title">Competiții</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-navy mb-6">Competiții Naționale</h3>
            {nationalComps.map(comp => (
              <div key={comp.id} className="competition-item border-l-4 border-purple pl-4 py-2">
                <h4 className="text-lg font-semibold text-navy">{comp.name}</h4>
                <div className="h-32 my-2">
                  {comp.imageUrl ? (
                    <img src={comp.imageUrl} alt={comp.name} className="w-full h-full object-cover rounded" />
                  ) : (
                    <svg className="w-16 h-16 text-navy mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                    </svg>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{comp.description}</p>
                <div className="flex items-center">
                  <span className="bg-lavender text-navy text-xs px-3 py-1 rounded-full mr-2">Participare {comp.date.split('-')[2]}</span>
                  {comp.results && <span className="bg-skyblue text-navy text-xs px-3 py-1 rounded-full">{comp.results}</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-navy mb-6">Competiții Internaționale</h3>
            {internationalComps.map(comp => (
              <div key={comp.id} className="competition-item border-l-4 border-skyblue pl-4 py-2">
                <h4 className="text-lg font-semibold text-navy">{comp.name}</h4>
                <div className="h-32 my-2">
                  {comp.imageUrl ? (
                    <img src={comp.imageUrl} alt={comp.name} className="w-full h-full object-cover rounded" />
                  ) : (
                    <svg className="w-16 h-16 text-navy mx-auto" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                    </svg>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{comp.description}</p>
                <div className="flex items-center">
                  <span className="bg-lavender text-navy text-xs px-3 py-1 rounded-full mr-2">Participare {comp.date.split('-')[2]}</span>
                  {comp.results && <span className="bg-purple text-white text-xs px-3 py-1 rounded-full">{comp.results}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {!showAll && (nationalComps.length > 2 || internationalComps.length > 2) && (
          <div className="mt-16 text-center">
            <button onClick={() => setShowAll(true)} className="bg-skyblue text-navy px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition shadow-lg">
              Vezi Toate Competițiile
            </button>
          </div>
        )}
        {(showAll || competitions.length > 4) && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-navy mb-8 text-center">Calendar Competițional 2024</h3>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg">
                <thead>
                  <tr className="bg-navy text-cream">
                    <th className="py-4 px-6 text-left rounded-tl-xl">Competiție</th>
                    <th className="py-4 px-6 text-left">Data</th>
                    <th className="py-4 px-6 text-left">Locație</th>
                    <th className="py-4 px-6 text-left rounded-tr-xl">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {competitions.map(comp => (
                    <tr key={comp.id} className="border-b border-gray-200 even:bg-gray-50">
                      <td className="py-4 px-6">{comp.name}</td>
                      <td className="py-4 px-6">{comp.date}</td>
                      <td className="py-4 px-6">{comp.location}</td>
                      <td className="py-4 px-6">
                        <span className={`text-xs px-3 py-1 rounded-full ${statusClasses[comp.status]}`}>{comp.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Competitions;
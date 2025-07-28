import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const querySnapshot = await getDocs(projectsCollection);
        const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sortăm după dată sau ID pentru a obține ultimele
        setProjects(projectsData.sort((a, b) => b.id.localeCompare(a.id)));
      } catch (error) {
        console.error('Eroare la preluarea proiectelor:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="proiecte" className="py-20 bg-navy">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-cream mb-16 section-title">Proiectele Noastre</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, showAll ? projects.length : 3).map((project, index) => (
            <div key={project.id} className="project-card bg-cream rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 flex items-center justify-center bg-skyblue">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-24 h-24 text-navy" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                  </svg>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-lavender text-navy text-xs px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <a href={project.detailsUrl || '#'} className="bg-navy text-cream px-4 py-2 rounded-lg hover:bg-opacity-90 transition w-full block text-center">
                  Vezi Detalii
                </a>
              </div>
            </div>
          ))}
        </div>
        {!showAll && projects.length > 3 && (
          <div className="mt-16 text-center">
            <button onClick={() => setShowAll(true)} className="bg-skyblue text-navy px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition shadow-lg">
              Vezi Toate Proiectele
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
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
        
        // Logica de sortare inteligentă
        const sortedProjects = projectsData.sort((a, b) => {
          const orderA = a.order !== undefined ? a.order : 999;
          const orderB = b.order !== undefined ? b.order : 999;

          if (orderA !== orderB) {
            return orderA - orderB;
          }

          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          
          return timeB - timeA;
        });

        setProjects(sortedProjects);
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
            
            // Am adăugat clasa 'group' pentru a activa efectul de hover pe elementele copil
            <div key={project.id} className="project-card bg-cream rounded-xl overflow-hidden shadow-lg flex flex-col group">
              
              {/* Am înlocuit h-48 cu aspect-video și am pus overflow-hidden pentru ca imaginea mărită să nu iasă din card */}
              <div className="w-full aspect-video flex items-center justify-center bg-skyblue shrink-0 overflow-hidden">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <svg className="w-24 h-24 text-navy opacity-50" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                  </svg>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-navy mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{project.description}</p>
                
                {/* Zona de tag-uri cu safe navigator (?.) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags?.map((tag, i) => (
                    <span key={i} className="bg-lavender text-navy text-xs px-3 py-1 rounded-full font-medium shadow-sm">{tag}</span>
                  ))}
                </div>

                {/* Butonul stă perfect aliniat jos datorită lui mt-auto */}
                {project.detailsUrl && (
                  <a 
                    href={project.detailsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-navy text-cream px-4 py-2 rounded-lg hover:bg-opacity-90 transition block text-center mt-auto shadow-md"
                  >
                    Vezi Detalii
                  </a>
                )}
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
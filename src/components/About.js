import React from 'react';

function About() {
  return (
    <section id="despre" className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-navy mb-16 section-title">Despre FIIRBots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-navy text-lg mb-6">
              {/* FIIRBots este echipa de robotică a Facultății de Inginerie Industrială și Robotică din cadrul Universității Politehnica București, dedicată inovației și excelenței în domeniul roboticii. */}
              FIIRBots este una dintre echipele de robotică susținute de Facultatea de Inginerie Industrială și Robotică, parte din departamentul Roboți și Sisteme de Producție., înființată în aprilie 2023 și în prezent este formată, din 39 studenți pasionați de robotică și inovație tehnologică.
            </p>
            <p className="text-navy text-lg mb-6">
              {/* Fondată în anul 2023, echipa noastră reunește studenți pasionați de robotică, automatizări și inteligență artificială, care lucrează împreună pentru a dezvolta soluții inovatoare și pentru a participa la competiții naționale și internaționale. */}
              echipa noastră își propune să dezvolte proiecte de robotică și nu numai, în general proiecte din domeniul STEM, contribuind atât la avansul educational și dezvoltarea competențelor de lucru în echipă al studenților, cât și la promovarea facultății. Acest obiectiv este posibil cu ajutorul îndrumării coordonatorului nostru și cu sprijinul unei echipe interdisciplinare de studenți.
            </p>
            <p className="text-navy text-lg">
              {/* Misiunea noastră este de a promova educația STEM, de a dezvolta proiecte de robotică avansată și de a forma viitori ingineri cu competențe practice în domeniul roboticii și al tehnologiilor emergente. */}
              În echipa noastră pot să aplice și sunt primiți studenți de la toate specializările Facultății de Inginerie Industrială și Robotică, inclusiv studenți de la alte facultăți din Universitatea Politehnica București și nu numai. Fiind o echipă multi disciplinară primim studenți și din exteriorul universității deoarece FIIRBots este o echipă unde creativitatea și tehnologia se întâlnesc.

            </p>
          </div>
          <div className="bg-navy rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-skyblue mb-6">Valorile Noastre</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-skyblue font-semibold text-lg">Inovație</h4>
                  <p className="text-cream">Căutăm constant soluții creative și abordări inovatoare pentru provocările din domeniul roboticii.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-skyblue font-semibold text-lg">Colaborare</h4>
                  <p className="text-cream">Credem în puterea muncii în echipă și a schimbului de idei pentru a atinge excelența.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-skyblue font-semibold text-lg">Educație</h4>
                  <p className="text-cream">Ne dedicăm formării viitorilor ingineri și promovării educației STEM în comunitatea noastră.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 bg-lavender bg-opacity-30 p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-navy mb-6 text-center">Statistici FIIRBots</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-purple text-4xl font-bold block">40+</span>
              <span className="text-navy font-medium">Membri Activi</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-purple text-4xl font-bold block">15+</span>
              <span className="text-navy font-medium">Proiecte Finalizate</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-purple text-4xl font-bold block">17+</span>
              <span className="text-navy font-medium">Competiții</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <span className="text-purple text-4xl font-bold block">14+</span>
              <span className="text-navy font-medium">Premii Câștigate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
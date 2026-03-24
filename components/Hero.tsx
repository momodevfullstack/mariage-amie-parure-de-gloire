import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-20 bg-[#f8f4f0]">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="relative z-10 shadow-sm bg-[#f8f4f0]">
            <img
              src="/assets/1.jpeg"
              alt="Romaric & Leocadie"
              className="w-full h-auto"
              style={{
                maxHeight: '700px',
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center top',
                display: 'block',
              }}
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-full h-full border border-[#e5e0db] -z-10"></div>
        </div>

        <div className="lg:col-span-7 lg:pl-16 order-1 lg:order-2">
          <div className="relative pl-6 md:pl-8 border-l-2 border-[#c4795a] space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-[10px] uppercase tracking-[0.5em] text-[#c4795a] font-medium">
                Parure de gloire
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-[#1e2a4a] leading-[1.1]">
                Capturez des instants
                <span className="block font-cursive text-4xl md:text-5xl lg:text-6xl text-[#c4795a] italic mt-2">
                  qui durent toute une vie
                </span>
              </h1>
            </div>

            <div className="space-y-5 max-w-md">
              <p className="text-[#5c6b7a] text-sm md:text-base leading-relaxed font-sans">
                Bienvenue dans l'univers de Leocadie & Romaric qui s'unissent pour l'éternité.
                Le 16 Mai 2026, nous écrirons un nouveau chapitre de notre histoire.
              </p>
              <a
                href="#rsvp"
                className="inline-block px-8 py-3 bg-[#1e2a4a] text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#2d3a5a] transition-all duration-300"
              >
                Confirmer ma présence
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

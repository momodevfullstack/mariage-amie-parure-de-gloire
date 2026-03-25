import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RSVPForm } from './components/RSVPForm';
import { AdminPanel } from './components/AdminPanel';
import { LoginModal } from './components/LoginModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { authAPI } from './services/supabase';
import { PROGRAM } from './constants';

const DecorativePetals = () => {
  const petals = Array.from({ length: 12 });
  return (
    <>
      <style>
        {`
          @keyframes petal-float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
          .petal-parure {
            position: fixed;
            bottom: -50px;
            background: linear-gradient(135deg, #e85d2c 0%, #c4795a 100%);
            border-radius: 150% 0 150% 0;
            pointer-events: none;
            z-index: 99;
            animation: petal-float linear infinite;
          }
        `}
      </style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[99]">
        {petals.map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 10;
          const duration = 12 + Math.random() * 12;
          const size = 8 + Math.random() * 12;
          return (
            <div
              key={i}
              className="petal-parure"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authAPI.isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(authAPI.isAuthenticated());
  }, []);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8f4f0] font-sans">
        <nav className="bg-white border-b border-[#e5e0db] py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-serif italic text-xl text-[#1e2a4a] font-bold">R&L Admin</span>
          </div>
          <button
            onClick={() => {
              authAPI.logout();
              setIsLoggedIn(false);
            }}
            className="px-6 py-2 bg-[#f0ebe5] hover:bg-red-50 hover:text-red-600 text-[#5c6b7a] rounded-full text-xs font-bold uppercase tracking-widest transition-all"
          >
            Quitter la session ×
          </button>
        </nav>
        <main className="p-4 md:p-8 animate-in fade-in duration-500">
          <AdminPanel isLoggedIn={isLoggedIn} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f4f0] selection:bg-[#e85d2c]/20 selection:text-[#1e2a4a]">
      <DecorativePetals />
      <Navbar onAdminClick={() => setIsModalOpen(true)} />

      <main>
        <Hero />

        <section id="about" className="py-24 md:py-32 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#e85d2c] font-medium">Le Couple</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1e2a4a] mt-2">Leocadie <span className="font-cursive text-3xl text-[#c4795a]">&</span> Romaric</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {/* Carte Leocadie */}
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden mb-5">
                  <img
                    src="/assets/3.jpeg"
                    alt="Leocadie"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: '50% 20%' }}
                  />
                </div>
                <div className="border-t-2 border-[#e5e0db] pt-5">
                  <h3 className="font-cursive text-3xl text-[#c4795a]">Leocadie</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#5c6b7a] font-bold mt-1 mb-3">La Mariée</p>
                  <p className="text-[#5c6b7a] text-sm leading-relaxed">
                    La joie de vivre incarnée. Elle illumine chaque jour de son sourire et de son énergie.
                  </p>
                </div>
              </div>

              {/* Carte Romaric */}
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden mb-5">
                  <img
                    src="/assets/8.jpeg"
                    alt="Romaric"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: '50% 20%' }}
                  />
                </div>
                <div className="border-t-2 border-[#e5e0db] pt-5">
                  <h3 className="font-cursive text-3xl text-[#c4795a]">Romaric</h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#5c6b7a] font-bold mt-1 mb-3">Le Marié</p>
                  <p className="text-[#5c6b7a] text-sm leading-relaxed">
                    L'esprit calme et protecteur. Il est le pilier de cette union, apportant force et sérénité.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="font-serif text-lg md:text-xl text-[#5c6b7a] italic max-w-2xl mx-auto leading-relaxed">
                Ensemble, nous avons construit un univers fait de complicité et de rêves partagés. Ce mariage est la célébration de deux familles qui s'unissent pour l'éternité.
              </p>
            </div>
          </div>
        </section>

        <section id="program" className="py-32 bg-[#f0ebe5]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="font-cursive text-4xl text-[#c4795a] mb-4 italic">Le Programme</h2>
              <h3 className="font-serif text-5xl text-[#1e2a4a] uppercase tracking-tight">Le Dérxoulement</h3>
              <div className="w-24 h-px bg-[#e85d2c]/40 mx-auto mt-8"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {PROGRAM.map((step, idx) => (
                <div key={idx} className={`group flex flex-col items-center ${idx === 1 ? 'md:mt-12' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-6 w-full shadow-lg">
                    <img
                      src={step.time === '09:30' ? 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600' : step.time === '11:00' ? 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600' : 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600'}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold tracking-widest uppercase font-sans">
                        {step.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-center px-4 space-y-4">
                    <h4 className="font-serif text-2xl text-[#1e2a4a] italic">{step.title}</h4>
                    <p className="text-[#5c6b7a] text-sm leading-relaxed font-sans font-light">{step.description}</p>
                    {step.mapUrl && (
                      <a
                        href={step.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#e85d2c] hover:text-[#c4795a] font-sans text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Voir le lieu
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="py-32 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-5xl text-[#1e2a4a] italic uppercase tracking-tighter">Nos Moments Précieux</h2>
              <p className="text-[#5c6b7a] mt-4 tracking-[0.2em] uppercase text-xs font-sans">Capturer l'éternité</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="shadow-md hover:scale-[1.02] transition-all duration-500">
                <img className="rounded-2xl w-full object-cover aspect-[3/4]" src="/assets/4.jpeg" alt="Moment 1" />
              </div>
              <div className="shadow-md hover:scale-[1.02] transition-all duration-500">
                <img className="rounded-2xl w-full object-cover aspect-[3/4]" src="/assets/5.jpeg" alt="Moment 2" />
              </div>
              <div className="shadow-md hover:scale-[1.02] transition-all duration-500">
                <img className="rounded-2xl w-full object-cover aspect-[3/4]" src="/assets/6.jpeg" alt="Moment 3" />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-4 bg-white relative">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <a
              href="https://maps.app.goo.gl/832HSiArf2RC5UY88?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[2.5rem] overflow-hidden h-[450px] shadow-2xl grayscale hover:grayscale-0 transition-all block relative group"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.068537533353!2d-3.9548733!3d5.4065313999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc19326b794a59d%3A0xa28f0fd57b2b9c4c!2sEspace%20le%20Joyau!5e0!3m2!1sfr!2sfr!4v1774194056174!5m2!1sfr!2sfr"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Espace le Joyau - Localisation du mariage"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white px-6 py-3 rounded-full text-[#1e2a4a] font-semibold shadow-lg">
                  Ouvrir dans Google Maps →
                </span>
              </div>
            </a>
            <div className="flex flex-col justify-center space-y-8">
              <h2 className="font-serif text-4xl text-[#1e2a4a] uppercase tracking-tighter">Où Nous Retrouver</h2>
              <div className="space-y-6 font-sans">
                <div className="flex items-center space-x-4">
                  <span className="w-10 h-10 rounded-full bg-[#f0ebe5] flex items-center justify-center text-[#e85d2c]">📍</span>
                  <p className="text-[#5c6b7a] text-sm tracking-wide">
                    Mairie: Annexe Djorogobite 
                  </p>
                  <p className="text-[#5c6b7a] text-sm tracking-wide">
                    Église: Christ Embassy Faya 
                  </p>
                  <p className="text-[#5c6b7a] text-sm tracking-wide">
                    Réception: Espace Le Joyaux, Derrière la pharmacie Ste Clémentine
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-10 h-10 rounded-full bg-[#f0ebe5] flex items-center justify-center text-[#e85d2c]">📞</span>
                  <div>
                    <p className="text-[#5c6b7a] text-sm"><span className="font-semibold text-[#1e2a4a]">Elodie</span> — <a href="tel:+2250701820020" className="hover:text-[#e85d2c] transition-colors">+225 07 01 820 020</a></p>
                    <p className="text-[#5c6b7a] text-sm mt-1"><span className="font-semibold text-[#1e2a4a]">Jaurès</span> — <a href="tel:+2250777930338" className="hover:text-[#e85d2c] transition-colors">07 77 930 338</a></p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/832HSiArf2RC5UY88?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#e85d2c] hover:text-[#c4795a] font-sans text-sm font-medium transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Voir le lieu sur Google Maps
                </a>
              </div>
              <p className="text-sm text-[#5c6b7a] italic font-serif">Une question ? Nous sommes à votre écoute.</p>
            </div>
          </div>
        </section>

        <RSVPForm />
      </main>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLoginSuccess={() => setIsLoggedIn(true)} />

      <footer className="py-12 bg-[#f0ebe5] border-t border-[#e5e0db] text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-serif italic text-3xl text-[#c4795a] mb-2">Romaric & Leocadie</p>
          <p className="text-[#5c6b7a] text-[10px] tracking-[0.5em] uppercase font-bold font-sans">16 Mai 2026 • Parure de gloire</p>
        </div>
      </footer>

      <WhatsAppFloat
        phoneNumber="+33766689696"
        message="Bonjour ! J'ai une question concernant le mariage de Romaric & Leocadie."
      />
    </div>
  );
};

export default App;

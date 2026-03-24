import React, { useState } from 'react';
import { guestAPI } from '../services/supabase';
import { RSVP_DEADLINE } from '../constants';

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'confirmed' as 'confirmed' | 'declined',
    plusOne: false,
    relation: '' as '' | 'Collaborateur' | 'Ami' | 'Connaissance' | 'Famille' | 'Patron' | 'Collègue' | 'Pasteur' | 'Frere/soeur eglise',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [guestData, setGuestData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await guestAPI.create(formData);
      setGuestData(response.data);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-32 bg-[#f0ebe5] px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white p-12 md:p-16 border border-[#e5e0db] shadow-sm space-y-8">
            <span className="text-[#e85d2c] text-6xl">💌</span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#1e2a4a]">
              Merci pour votre réponse !
            </h2>
            <p className="text-[#5c6b7a] text-lg leading-relaxed">
              Romaric & Leocadie ont bien reçu votre confirmation. Ils ont hâte de célébrer ce jour précieux en votre compagnie.
            </p>
            <p className="font-serif text-[#c4795a] italic text-sm">
              À très bientôt pour ce moment de grâce — 16 Mai 2026
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-32 bg-[#f0ebe5] px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif italic text-4xl text-[#1e2a4a]">Réponse souhaitée</h2>
          <p className="text-[#5c6b7a] uppercase tracking-[0.3em] text-[10px] font-bold">Avant le {RSVP_DEADLINE}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 border border-[#e5e0db] space-y-10 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-[#5c6b7a] font-bold">Nom Complet</label>
              <input
                required
                type="text"
                placeholder="Ex: Mr & Mme Sylla"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b border-[#e5e0db] py-2 outline-none focus:border-[#1e2a4a] transition-colors bg-transparent font-serif text-lg text-[#1e2a4a]"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-[#5c6b7a] font-bold">Email</label>
              <input
                required
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b border-[#e5e0db] py-2 outline-none focus:border-[#1e2a4a] transition-colors bg-transparent font-serif text-lg text-[#1e2a4a]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-[#5c6b7a] font-bold">Votre relation avec les mariés</label>
            <select
              required
              value={formData.relation}
              onChange={(e) => setFormData({ ...formData, relation: e.target.value as any })}
              className="w-full border-b border-[#e5e0db] py-2 outline-none focus:border-[#1e2a4a] transition-colors bg-transparent font-serif text-lg text-[#1e2a4a]"
            >
              <option value="">Sélectionnez votre relation</option>
              <option value="Famille">Famille</option>
              <option value="Ami">Ami</option>
              <option value="Collègue">Collègue</option>
              <option value="Collaborateur">Collaborateur</option>
              <option value="Connaissance">Connaissance</option>
              <option value="Patron">Patron</option>
              <option value="Pasteur">Pasteur</option>
              <option value="Frere/soeur eglise">Frère/sœur église</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex gap-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === 'confirmed'}
                  onChange={() => setFormData({ ...formData, status: 'confirmed' })}
                  className="w-4 h-4 accent-[#1e2a4a]"
                />
                <span className="text-[11px] uppercase tracking-widest text-[#5c6b7a]">Présent(e)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === 'declined'}
                  onChange={() => setFormData({ ...formData, status: 'declined' })}
                  className="w-4 h-4 accent-[#1e2a4a]"
                />
                <span className="text-[11px] uppercase tracking-widest text-[#5c6b7a]">Absent(e)</span>
              </label>
            </div>
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.plusOne}
                onChange={(e) => setFormData({ ...formData, plusOne: e.target.checked })}
                className="w-4 h-4 accent-[#1e2a4a]"
              />
              <span className="text-[11px] uppercase tracking-widest text-[#5c6b7a]">Accompagné(e) (+1)</span>
            </label>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-[#5c6b7a] font-bold">Petit mot pour les mariés</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border border-[#e5e0db] p-4 outline-none focus:border-[#1e2a4a] transition-colors bg-[#f8f4f0] font-serif"
            ></textarea>
          </div>

          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-16 py-5 bg-[#1e2a4a] text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#2d3a5a] transition-all disabled:opacity-30"
            >
              {isSubmitting ? 'Traitement en cours...' : 'Envoyer ma réponse'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await authAPI.login({ email, password });
      onLoginSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-10 rounded-[40px] shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#5c6b7a] hover:text-[#1e2a4a] text-2xl">✕</button>
        <h2 className="font-serif text-3xl mb-8 text-center text-[#1e2a4a]">Accès Admin</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#5c6b7a] font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-[#e5e0db] py-2 outline-none focus:border-[#1e2a4a] transition-colors bg-transparent font-sans"
              placeholder="admin@wedding.com"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#5c6b7a] font-bold mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-[#e5e0db] py-2 outline-none focus:border-[#1e2a4a] transition-colors bg-transparent font-sans"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-xs font-bold uppercase text-center">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1e2a4a] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#2d3a5a] transition-all disabled:opacity-50"
          >
            {isLoading ? 'Connexion...' : 'Accéder à la gestion'}
          </button>
        </form>
      </div>
    </div>
  );
};

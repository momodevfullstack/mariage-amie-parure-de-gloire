import { WeddingInfo } from './types';

export const WEDDING_DATA: WeddingInfo = {
  groom: 'Romaric',
  bride: 'Leocadie',
  date: '2026-05-16T09:30:00',
  location: 'Mairie (Annexe Djorogobite), Église Christ Embassy Faya, Réception Espace Le Joyaux',
  story: 'Leur histoire s\'écrit dans la lumière. Un regard, une promesse, et une union pour l\'éternité.',
};

export const NAVIGATION = [
  { name: 'Accueil', href: '#home' },
  { name: 'Le Couple', href: '#about' },
  { name: 'Programme', href: '#program' },
  { name: 'Lieux', href: '#contact' },
  { name: 'RSVP', href: '#rsvp' },
  { name: 'Admin', href: '#admin' },
];

export const PROGRAM: { time: string; title: string; description: string; location: string; mapUrl?: string }[] = [
  {
    time: '09:30',
    title: 'Église',
    description: 'Premier temps à Christ Embassy Faya.',
    location: 'Christ Embassy Faya',
  },
  {
    time: '11:00',
    title: 'Église',
    description: 'Suite de la célébration à Christ Embassy Faya.',
    location: 'Christ Embassy Faya',
  },
  {
    time: '13:00',
    title: 'Réception',
    description: 'Célébration festive à Espace Le Joyaux.',
    location: 'Espace Le Joyaux, Derrière la pharmacie Ste Clémentine',
  },
];

export const RSVP_DEADLINE = '8 Mai 2026';

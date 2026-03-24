# Mariage Amie - Parure de gloire

Site de mariage pour **Romaric & Leocadie** — 16 Mai 2026.

**Thème :** Parure de gloire — Chic & Épuré, Joyeux et chaleureux  
**Backend :** Supabase (PostgreSQL + Auth)

## Palette de couleurs (Parure de gloire)

| Couleur       | Hex       | Usage                    |
|---------------|-----------|---------------------------|
| Navy          | `#1e2a4a` | Texte, boutons, headers   |
| Steel Blue    | `#5c6b7a` | Texte secondaire          |
| Burnt Orange  | `#e85d2c` | Accents, CTA              |
| Terracotta    | `#c4795a` | Accents doux              |
| Cream         | `#f8f4f0` | Fond principal            |

## Installation

```bash
cd mariage_amie
npm install
```

## Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com)
2. Copiez `.env.example` vers `.env`
3. Renseignez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
4. Exécutez le schéma SQL : `supabase/schema.sql` dans l’éditeur SQL du dashboard Supabase
5. Exécutez `supabase/fix_rls_insert_guest.sql` pour activer les RSVP publics
6. **Créer un utilisateur admin** (connexion au dashboard) :
   - Supabase Dashboard → **Authentication** → **Users** → **Add user** → **Create new user**
   - Email + mot de passe → **Create user**
   - Sur le site : menu **Admin** → connectez-vous avec ces identifiants

## Assets à ajouter

Placez dans `public/assets/` :

- `principale.jpg` — Photo principale du couple
- `perso_leocadie.jpeg` — Photo de Leocadie
- `perso_romaric.jpeg` — Photo de Romaric
- `CARTE INVITATION DE MARIAGE.png` — Carte d’invitation personnalisable

## Lancement

```bash
npm run dev
```

Le site est disponible sur `http://localhost:3001`.

## Lieux du mariage

- **Mairie :** Annexe Djorogobite — 9h30
- **Église :** Christ Embassy Faya — 11h
- **Réception :** Espace Le Joyaux, Derrière la pharmacie Ste Clémentine

## WhatsApp

Mettez à jour le numéro dans `App.tsx` (composant `WhatsAppFloat`).

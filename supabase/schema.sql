-- Schéma Supabase pour mariage_amie (Romaric & Leocadie)
-- Exécuter dans l'éditeur SQL de Supabase Dashboard

-- Table des invités
CREATE TABLE IF NOT EXISTS guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'declined')),
  plus_one BOOLEAN NOT NULL DEFAULT false,
  relation TEXT,
  "table" INTEGER,
  message TEXT,
  invited_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_guests_status ON guests(status);
CREATE INDEX IF NOT EXISTS idx_guests_invited_at ON guests(invited_at DESC);

-- RLS (Row Level Security)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut insérer (RSVP public)
CREATE POLICY "Allow public insert for RSVP"
  ON guests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Politique : seuls les utilisateurs authentifiés peuvent lire/modifier/supprimer
CREATE POLICY "Allow authenticated read"
  ON guests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update"
  ON guests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
  ON guests FOR DELETE
  TO authenticated
  USING (true);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS guests_updated_at ON guests;
CREATE TRIGGER guests_updated_at
  BEFORE UPDATE ON guests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Pour l'admin : créer un utilisateur via Supabase Auth (Dashboard > Authentication > Users)
-- Ajouter manuellement un utilisateur avec email + mot de passe pour l'accès admin

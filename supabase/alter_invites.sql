-- Ajouter les colonnes manquantes à la table invités (si elles n'existent pas)
-- Exécuter dans SQL Editor de Supabase

ALTER TABLE "invités" ADD COLUMN IF NOT EXISTS relation TEXT;
ALTER TABLE "invités" ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE "invités" ADD COLUMN IF NOT EXISTS numéro_table INTEGER;
ALTER TABLE "invités" ADD COLUMN IF NOT EXISTS date_invitation TIMESTAMPTZ DEFAULT now();
ALTER TABLE "invités" ADD COLUMN IF NOT EXISTS plus_un BOOLEAN DEFAULT false;

-- Si ta colonne "plus" s'appelle autrement (ex: plus_un déjà existe), vérifie le nom exact dans Table Editor.

-- Contournement RLS : fonction insert_guest avec SECURITY DEFINER
-- Exécuter dans Supabase Dashboard > SQL Editor
-- Cette fonction insère un invité en contournant les politiques RLS

CREATE OR REPLACE FUNCTION public.insert_guest(
  p_name TEXT,
  p_email TEXT,
  p_status TEXT DEFAULT 'pending',
  p_plus_one BOOLEAN DEFAULT false,
  p_relation TEXT DEFAULT NULL,
  p_message TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_row guests%ROWTYPE;
BEGIN
  INSERT INTO guests (name, email, status, plus_one, relation, message)
  VALUES (p_name, p_email, p_status, p_plus_one, p_relation, p_message)
  RETURNING * INTO new_row;
  RETURN to_jsonb(new_row);
END;
$$;

-- Autoriser anon et authenticated à appeler cette fonction
GRANT EXECUTE ON FUNCTION public.insert_guest(TEXT, TEXT, TEXT, BOOLEAN, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.insert_guest(TEXT, TEXT, TEXT, BOOLEAN, TEXT, TEXT) TO authenticated;

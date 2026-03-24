-- Fix RLS: allow public RSVP inserts on guests
-- Run in Supabase Dashboard > SQL Editor

-- Drop and recreate the insert policy (in case it was missing or misconfigured)
DROP POLICY IF EXISTS "Allow public insert for RSVP" ON guests;

CREATE POLICY "Allow public insert for RSVP"
  ON guests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

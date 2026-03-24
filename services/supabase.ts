import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Guest } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    // Placeholder pour permettre à l'app de s'afficher sans config Supabase
    supabase = createClient(
      'https://placeholder.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDAwMDAwMDB9.placeholder'
    );
  }
} catch (e) {
  console.error('Supabase init error:', e);
  supabase = createClient(
    'https://placeholder.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDAwMDAwMDB9.placeholder'
  );
}

export { supabase };

// --- Guest API (table guests, colonnes en anglais) ---
export const guestAPI = {
  create: async (guestData: Omit<Guest, 'id' | 'invitedAt'>): Promise<{ success: boolean; data: Guest }> => {
    // Utilise la fonction RPC insert_guest (SECURITY DEFINER) pour contourner le RLS
    const { data, error } = await supabase.rpc('insert_guest', {
      p_name: guestData.name,
      p_email: guestData.email,
      p_status: guestData.status ?? 'pending',
      p_plus_one: guestData.plusOne ?? false,
      p_relation: guestData.relation || null,
      p_message: guestData.message || null,
    });

    if (error) throw new Error(error.message);
    return {
      success: true,
      data: mapGuestFromDb(data as Record<string, unknown>),
    };
  },

  getAll: async (): Promise<{ success: boolean; count: number; data: Guest[] }> => {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw new Error(error.message);
    return {
      success: true,
      count: data?.length ?? 0,
      data: (data ?? []).map(mapGuestFromDb),
    };
  },

  getStats: async (): Promise<{
    success: boolean;
    data: { total: number; confirmed: number; declined: number; pending: number; withPlusOne: number };
  }> => {
    const { data, error } = await supabase.from('guests').select('status, plus_one');

    if (error) throw new Error(error.message);
    const list = data ?? [];
    const stats = {
      total: list.length,
      confirmed: list.filter((g: any) => g.status === 'confirmed').length,
      declined: list.filter((g: any) => g.status === 'declined').length,
      pending: list.filter((g: any) => g.status === 'pending').length,
      withPlusOne: list.filter((g: any) => g.plus_one).length,
    };
    return { success: true, data: stats };
  },

  getById: async (id: string): Promise<{ success: boolean; data: Guest }> => {
    const { data, error } = await supabase.from('guests').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return { success: true, data: mapGuestFromDb(data) };
  },

  update: async (
    id: string,
    guestData: Partial<Guest & { table?: number | null }>
  ): Promise<{ success: boolean; data: Guest }> => {
    const payload: Record<string, unknown> = {};
    if (guestData.name !== undefined) payload.name = guestData.name;
    if (guestData.email !== undefined) payload.email = guestData.email;
    if (guestData.status !== undefined) payload.status = guestData.status;
    if (guestData.plusOne !== undefined) payload.plus_one = guestData.plusOne;
    if (guestData.relation !== undefined) payload.relation = guestData.relation || null;
    if (guestData.table !== undefined) payload.table = guestData.table;
    if (guestData.message !== undefined) payload.message = guestData.message || null;

    const { data, error } = await supabase.from('guests').update(payload).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return { success: true, data: mapGuestFromDb(data) };
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const { error } = await supabase.from('guests').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true, message: 'Invité supprimé' };
  },
};

function mapGuestFromDb(row: Record<string, unknown>): Guest {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    status: row.status as 'pending' | 'confirmed' | 'declined',
    plusOne: !!row.plus_one,
    relation: (row.relation ?? row.relationship) as Guest['relation'] ?? undefined,
    table: row.table != null ? (row.table as number) : null,
    message: (row.message as string) ?? undefined,
    invitedAt: (row.invited_at as string) ?? new Date().toISOString(),
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

// --- Auth API (Supabase Auth) ---
export const authAPI = {
  login: async (credentials: { email: string; password: string }): Promise<{ success: boolean; email: string; token: string; role: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw new Error(error.message);
    const token = data.session?.access_token ?? '';
    const email = data.user?.email ?? credentials.email;
    if (token) {
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_email', email);
    }
    return { success: true, email, token, role: 'admin' };
  },

  logout: (): void => {
    supabase.auth.signOut();
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
  },

  isAuthenticated: (): boolean => !!localStorage.getItem('admin_token'),

  getToken: (): string | null => localStorage.getItem('admin_token'),

  getMe: async (): Promise<{ success: boolean; data: { email: string; role: string } }> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');
    return { success: true, data: { email: user.email ?? '', role: 'admin' } };
  },
};

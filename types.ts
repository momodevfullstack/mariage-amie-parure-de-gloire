export type GuestRelation =
  | 'Collaborateur'
  | 'Ami'
  | 'Connaissance'
  | 'Famille'
  | 'Patron'
  | 'Collègue'
  | 'Pasteur'
  | 'Frere/soeur eglise';

export interface Guest {
  id?: string;
  name: string;
  email: string;
  status: 'pending' | 'confirmed' | 'declined';
  plusOne: boolean;
  relation?: GuestRelation;
  table?: number | null;
  message?: string;
  invitedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WeddingInfo {
  groom: string;
  bride: string;
  date: string;
  location: string;
  story: string;
}

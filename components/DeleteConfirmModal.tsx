import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  guestName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  guestName,
  onConfirm,
  onCancel,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-[30px] shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h2 className="font-serif text-2xl text-[#1e2a4a] text-center mb-3">Confirmer la suppression</h2>
        <p className="text-[#5c6b7a] text-center mb-2">Êtes-vous sûr de vouloir supprimer l'invité</p>
        <p className="text-[#1e2a4a] font-bold text-center mb-6 font-serif text-lg capitalize">"{guestName}" ?</p>
        <p className="text-red-500 text-sm text-center mb-8 font-sans font-medium">⚠️ Cette action est irréversible</p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-3 px-6 border-2 border-[#e5e0db] text-[#5c6b7a] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#f8f4f0] transition-all disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 px-6 bg-red-500 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Suppression...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

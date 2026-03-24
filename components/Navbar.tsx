import React, { useState } from 'react';
import { NAVIGATION } from '../constants';

interface NavbarProps {
  onAdminClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-[#ebe5df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <span className="font-serif italic text-2xl text-[#1e2a4a] tracking-tighter uppercase font-bold text-[#e85d2c]">
              R & L
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {NAVIGATION.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.name === 'Admin') onAdminClick();
                    else window.location.href = item.href;
                  }}
                  className="text-[#5c6b7a] hover:text-[#e85d2c] px-3 py-2 text-sm font-medium transition-colors uppercase tracking-widest"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#5c6b7a]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-[#ebe5df] p-4">
          <div className="space-y-2">
            {NAVIGATION.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setIsOpen(false);
                  if (item.name === 'Admin') onAdminClick();
                  else window.location.href = item.href;
                }}
                className="text-[#5c6b7a] hover:text-[#e85d2c] block w-full text-left px-3 py-2 rounded-md text-base font-medium uppercase tracking-wider"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

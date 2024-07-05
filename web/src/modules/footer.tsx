import React from 'react';
import { Logout } from 'tabler-icons-react';
import { FooterProps } from '../types/commonTypes';

export const Footer = ({
  onLogout
}: FooterProps) => {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 py-4 text-center text-xs text-white">
        <p className="inline-block">WevyTask - Made with love 💙</p>
      </div>
      <div
        onClick={onLogout}
        className="fixed bottom-4 right-4"
      >
        <Logout
          size={18}
          strokeWidth={2}
          className="cursor-pointer hover:text-gray-500"
        />
      </div>
    </>
  );
};

// components/FullScreenMenu.js

import { useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { X } from 'lucide-react';
import Link from 'next/link';

interface FullScreenMenuProps {
  closeMenu: () => void;
}

const FullScreenMenu = ({ closeMenu }: FullScreenMenuProps) => {
  const menuItems = [
    {
      name: 'Home',
    },
    {
      name: 'Clothing',
    },
    {
      name: 'Facepack',
    },
  ];

  return (
    <div className='w-full h-screen bg-black opacity-80 fixed top-0  overflow-hidden p-3'>
      <div className='absolute z-20 right-2'>
        <X className='w-8 h-8 mt-4 mr-4 cursor-pointer' onClick={closeMenu} />
      </div>
      <div className='flex justify-center items-center w-full h-full flex-col'>
        {menuItems.map((item, index) => (
          <p
            className='text-3xl font-thin my-1 cursor-pointer  '
            key={item.name}
            onClick={closeMenu}
            onKeyDown={closeMenu}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FullScreenMenu;

import { Copyright } from 'lucide-react';
import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';

const Footer = () => {
  return (
    <div className='bg-gray-900 text-neutral-700 p-3 min-h-[100px]'>
      <MaxWidthWrapper>
        <div className='flex text-gray-300 flex-col font-thin justify-center '>
          <p className='text-center text-sm'>
            This is a demo e-com website by Mahesh Choudhury made using Next.js
            and Tailwind CSS
          </p>
          <p className='text-center cursor-pointer my-2 text-sm'>
            ABOUT | OUR STORES | BLOG | CONTACT | FAQ
          </p>

          <p className='text-center text-sm'>
            Whatsapp: 8638686294 | Email: maheshchoudhury522@gmail.com
          </p>
          <p className='text-center text-sm'>
            Copyright 2023 © Mahesh Choudhury
          </p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;

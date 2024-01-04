import React from 'react';

const PageSubHeader = ({ pageTitle }: any) => {
  return (
    <div className='w-full h-[190px] relative'>
      <img
        src='https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=12600&h=7500&dpr=10'
        className='w-full h-full object-cover opacity-100'
      />

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-full'>
        <p className='text-white font-medium text-2xl text-center uppercase'>
          {pageTitle}
        </p>
      </div>
    </div>
  );
};

export default PageSubHeader;

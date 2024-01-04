import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';

type Props = {};

const ShopInfoArea = (props: Props) => {
  return (
    <MaxWidthWrapper className='py-5'>
      <div className='w-full '>
        <p className='uppercase antialiased text-center font-bold  text-3xl text-neutral-600	 '>
          welcome to our shop
        </p>
        <p className='text-center text-gray-600	 text-[12px] mt-5 antialiased '>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
          perferendis illo, quae tenetur incidunt quos quam, aspernatur
          doloribus et explicabo cum a magni suscipit? Quia harum eos modi
          minima similique!
        </p>
        <div className='my-5 w-full flex  justify-center gap-10'>
          <span className='uppercase text-[12px]  text-neutral-500 cursor-pointer hover:bg-neutral-500 hover:text-neutral-100 ring-2 ring-neutral-500 px-3 py-1 rounded-[40px] hover:ring-0'>
            {' '}
            about us
          </span>
          <span className='bg-neutral-500 antialiased px-3 py-1 uppercase rounded-[40px] text-[12px] text-white cursor-pointer hover:bg-neutral-700'>
            shop now{' '}
          </span>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ShopInfoArea;

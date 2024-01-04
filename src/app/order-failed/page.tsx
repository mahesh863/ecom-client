'use client';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const OrderFailed = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className='w-full h-screen'>
      <div className='w-full h-[150px] bg-red-600 flex items-center justify-center'>
        <p className='text-2xl mt-10 font-semibold text-white'>Order Failed</p>
      </div>

      <div className='w-full h-full flex-col flex items-center justify-center -mt-[130px]'>
        <XCircle size={200} className='text-red-600 mb-10' />
        <p className='text-2xl'>Failed To Place Order</p>
        <p className='text-sm'>
          In case money was deducted from your bank account, it will be refunded
          within 7 working days
        </p>
        <span
          className='px-10 py-3 rounded-lg text-white mt-5 select-none bg-red-700 cursor-pointer'
          onClick={handleGoHome}
        >
          Home
        </span>
      </div>
    </div>
  );
};

export default OrderFailed;

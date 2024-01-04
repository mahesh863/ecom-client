'use client';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../GlobalRedux/cart/cartSlice';
import { useSearchParams } from 'next/navigation';

const OrderSuccess = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');

  const handleGoHome = () => {
    router.push('/');
  };

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <div className='w-full h-screen'>
      <div className='w-full h-[150px] bg-green-600 flex items-center justify-center'>
        <p className='text-2xl mt-10 font-semibold text-white'>
          Order Placed Successfully
        </p>
      </div>

      <div className='w-full h-full flex-col flex items-center justify-center -mt-[130px]'>
        <CheckCircle size={200} className='text-green-600 mb-10' />
        <p className='text-2xl'>Order Placed Successfully</p>
        <p className='text-2xl'>Transaction ID: {paymentId}</p>
        <span
          className='px-10 py-3 rounded-lg text-white mt-5 select-none bg-green-700 cursor-pointer'
          onClick={handleGoHome}
        >
          Home
        </span>
      </div>
    </div>
  );
};

export default OrderSuccess;

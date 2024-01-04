'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PageSubHeader from '@/components/PageSubHeader';
import { LogOut } from 'lucide-react';
import React from 'react';
import OrderCard from './OrderCard';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

const Profile = () => {
  const handleLogout = async () => {
    const res = await apiRequest('signout');

    if (res.error) {
      toast.error(res.error?.message);

      return;
    }

    toast.success('Logged out successfully');
    window.location.href = '/';
  };
  return (
    <div className='min-h-screen w-full'>
      <PageSubHeader pageTitle='Profile' />

      <MaxWidthWrapper>
        <p className='text-center mt-3 text-3xl font-medium'>
          Mahesh Choudhury
        </p>
        <p className='text-center font-light'>Joined: June 2023</p>
        <span
          className='float-right px-5 py-2 bg-red-500 text-white text-lg rounded-lg cursor-pointer select-none font-medium flex gap-2 items-center'
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </span>
        <div className='mt-[50px]'>
          {/* <div>
            <p className='text-2xl font-medium text-center'>Your Orders</p>
          </div>
          <div>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </div> */}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Profile;

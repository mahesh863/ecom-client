'use client';
import PageSubHeader from '@/components/PageSubHeader';
import apiRequest from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface SignUpDetails {
  name: string;
  email: string;
  password: string;
  phone: string;
}
const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState<SignUpDetails>(
    {} as SignUpDetails
  );
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signUpDetails.email || !signUpDetails.password) {
      toast.error('Please fill all the fields');
      return;
    }

    const res = await apiRequest('signup', signUpDetails);

    if (res.error) {
      toast.error(res.error?.message);
      return;
    }

    toast.success(res.data?.message);
    router.push('/signin');
  };

  return (
    <>
      <PageSubHeader pageTitle='Sign In' />
      <div className='flex  items-center justify-center min-h-[calc(100vh-290px)]'>
        <form
          className='bg-white p-8 rounded shadow-md w-96'
          onSubmit={(e) => handleSubmit(e)}
        >
          <h1 className='text-2xl font-bold mb-6'>Sign In</h1>
          <div className='mb-4'>
            <label
              className='block text-gray-800 text-sm font-semibold mb-2'
              htmlFor='name'
            >
              Name:
            </label>
            <input
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500'
              type='name'
              id='name'
              name='name'
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-800 text-sm font-semibold mb-2'
              htmlFor='phone'
            >
              Phone:
            </label>
            <input
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500'
              type='phone'
              id='phone'
              name='phone'
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-800 text-sm font-semibold mb-2'
              htmlFor='email'
            >
              Email:
            </label>
            <input
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500'
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-800 text-sm font-semibold mb-2'
              htmlFor='password'
            >
              Password:
            </label>
            <input
              className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500'
              type='password'
              id='password'
              onChange={handleChange}
              name='password'
            />
          </div>
          <button className='bg-gray-800 text-white py-2 px-4 rounded focus:outline-none hover:bg-gray-700 w-full'>
            Sign In
          </button>
          <p
            className='text-center mt-5 hover:underline cursor-pointer'
            onClick={() => router.push('/signin')}
          >
            Already have an account? SignIn
          </p>{' '}
        </form>

        <div></div>
      </div>
    </>
  );
};

export default SignUp;

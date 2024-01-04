'use client';
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Heart, Menu, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import useScroll from '@/hooks/useScroll';
import FullScreenMenu from './FullScreenMenu';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { useRouter } from 'next/navigation';

const Header = () => {
  const scrolled = useScroll(200);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartState = useSelector((state: RootState) => state.cart.cart);
  const router = useRouter();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className={cn(
        'z-10 w-full text-white bg-opacity-90 transition-all duration-500 h-[60px] ',
        {
          'bg-gray-800 fixed top-0': scrolled,
          'bg-green absolute': !scrolled,
        }
      )}
    >
      {isMenuOpen && <FullScreenMenu closeMenu={closeMenu} />}

      <MaxWidthWrapper>
        <div className='grid grid-cols-8 py-4'>
          <div className='col-span-2'>
            <span>
              <Menu
                className='cursor-pointer'
                onClick={() => setIsMenuOpen(true)}
              />
            </span>
          </div>

          <div className=' ml-auto mr-auto flex items-center col-span-4 '>
            <Link
              className='text-center text-2xl font-bold select-none cursor-pointer'
              href='/'
            >
              FLATSOME
            </Link>
          </div>
          <div className='ml-auto mr-0  flex items-center col-span-2 py-2'>
            <Link href='/wishlist'>
              <Heart className='mr-1 cursor-pointer' />
            </Link>
            <Link href='/profile'>
              <User className='mx-1 cursor-pointer' />
            </Link>
            <ShoppingBag
              className='ml-1 cursor-pointer'
              onClick={() => router.push('/cart')}
            />{' '}
            <Badge variant='destructive' className='-mt-6 -ml-3'>
              {cartState.length}
            </Badge>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Header;

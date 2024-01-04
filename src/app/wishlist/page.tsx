'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import apiRequest from '@/lib/apiRequest';
import { RootState } from '../GlobalRedux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WishlistItems } from '../GlobalRedux/wishlist/wishlistSlice';

interface ProductDetailInterface {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  id: number;
}

const Wishlist = () => {
  const [wishListDetails, setWishListDetails] = useState<
    (ProductDetailInterface | null)[]
  >([]);

  const router = useRouter();

  const wishList = useSelector((state: RootState) => state.wishlist.wishlist);

  const getProductDetails = async (
    productId: number
  ): Promise<ProductDetailInterface | null> => {
    const params = new URLSearchParams();
    params.append('id', productId.toString());

    const res = await apiRequest('getProductDetails', null, params);

    if (res.error) {
      return null;
    }

    return res.data?.data;
  };

  const getCartDetails = async () => {
    const productInfo = await Promise.all(
      wishList.map(async (item: WishlistItems) => {
        const productDetails = await getProductDetails(item.id);

        if (productDetails) {
          productDetails.quantity = item.quantity;
        }
        return productDetails;
      })
    );

    setWishListDetails(productInfo);
  };

  const handleNavigateToProduct = (id: number | undefined) => {
    if (id) {
      router.push(`/product?id=${id}`);
    }
  };

  useEffect(() => {
    if (wishList.length > 0) {
      getCartDetails();
    }
  }, [wishList]);

  return (
    <div className='min-h-[calc(100vh-100px)]'>
      <div className='w-full h-[150px] bg-gray-700 flex items-center justify-center'>
        <span className='mt-[80px] text-neutral-200 text-2xl font-thin'>
          WISHLIST
        </span>
      </div>

      <MaxWidthWrapper>
        <div>
          <Table>
            <TableCaption>Your wishlist ♥ at FLATSOME.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[200px]'>Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>UNIT PRICE </TableHead>
                <TableHead>STOCK STATUS </TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wishListDetails?.map((val) => {
                return (
                  <TableRow>
                    <TableCell className='font-medium'>
                      <img src={val?.images[0]} />
                    </TableCell>
                    <TableCell>
                      <p>{val?.name}</p>
                    </TableCell>
                    <TableCell>Rs. {val?.price}</TableCell>
                    <TableCell>In stock</TableCell>
                    <TableCell className='text-right'>Add to cart</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Wishlist;

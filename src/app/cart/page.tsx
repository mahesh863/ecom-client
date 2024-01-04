'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import apiRequest from '@/lib/apiRequest';
import { CartItems } from '../GlobalRedux/cart/cartSlice';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { formatCurrency } from '@/lib/fotmatCurrency';
import PageSubHeader from '@/components/PageSubHeader';
interface ProductDetailInterface {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  id: number;
}

const Wishlist = () => {
  const [cartDetails, setCartDetails] = useState<
    (ProductDetailInterface | null)[]
  >([]);
  const [totalAmount, setTotalAmount] = useState(1000);

  const router = useRouter();
  const cartList = useSelector((state: RootState) => state.cart.cart);

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
      cartList.map(async (item: CartItems) => {
        const productDetails = await getProductDetails(item.id);

        if (productDetails) {
          productDetails.quantity = item.quantity;
        }
        return productDetails;
      })
    );

    setCartDetails(productInfo);
  };

  const handleNavigateToProduct = (id: number | undefined) => {
    if (id) {
      router.push(`/product?id=${id}`);
    }
  };

  useEffect(() => {
    if (cartList.length > 0) {
      getCartDetails();
    }
  }, [cartList]);

  useEffect(() => {
    if (cartDetails.length > 0) {
      let total = 0;
      cartDetails.forEach((item) => {
        if (item) {
          total += item.price * item.quantity;
        }
      });

      setTotalAmount(total);
    }
  }, [cartDetails]);

  return (
    <div className='min-h-[calc(100vh-100px)]'>
      <PageSubHeader pageTitle='Cart' />

      <MaxWidthWrapper>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[200px]'>Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Price </TableHead>
                <TableHead>Quantity </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartDetails.map((item) => {
                return (
                  <TableRow onClick={() => handleNavigateToProduct(item?.id)}>
                    <TableCell className='font-medium'>
                      <div className='flex'>
                        <img
                          src={item?.images[0]}
                          className='w-[60px] h-[60px] object-cover mr-1 rounded-2xl'
                        />{' '}
                      </div>
                    </TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>Rs. {item?.price}</TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className='float-right mt-10'>
          <span className=''>
            <span className='text-lg text-right	'>
              Total: Rs. {formatCurrency(totalAmount)}{' '}
            </span>
          </span>
          <button
            className='flex gap-2  items-center justify-center px-5 py-2 rounded-full bg-gray-900 hover:bg-gray-700 text-white cursor-pointer select-none mt-2'
            onClick={() => router.push('/checkout')}
          >
            <Lock /> Checkout
          </button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Wishlist;

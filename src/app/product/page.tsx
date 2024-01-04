'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductCarousel from '@/components/home/ProductCarousel';
import apiRequest from '@/lib/apiRequest';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ProductDetailInterface {
  name: string;
  description: string;
  price: number;
}
const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productDetails, setProductDetails] =
    useState<ProductDetailInterface>();
  const [mainImage, setMainImage] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getProductDetails = async () => {
    if (!productId) {
      router.back();
      return;
    }

    const params = new URLSearchParams();
    params.append('id', productId?.toString());

    const res = await apiRequest('getProductDetails', null, params);

    if (res.error) {
      toast.error('Failed to get product details');
      return;
    }

    setProductImages(res.data?.data?.images);
    setMainImage(res.data?.data?.images[0]);
    delete res.data?.data?.images;
    setProductDetails(res.data?.data);
  };

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  return (
    <div>
      <div className='w-full h-[190px] relative'>
        <img
          src='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=8000'
          className='w-full h-full object-cover opacity-100'
        />

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-full'>
          <p className='text-white font-bold text-xl text-center '>
            Fluro Big Pullover Designers Remix
          </p>
        </div>
      </div>
      <MaxWidthWrapper className='block'>
        <div className='w-full my-10 '>
          <div className='grid grid-cols-1 lg:grid-cols-6 gap-2 mh-[400px]'>
            <div className='col-span-3 flex flex-row h-full'>
              <div>
                {productImages?.map((image) => (
                  <div
                    className='w-[80px] h-[80px] border mb-1 cursor-pointer'
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image}
                      className='w-full h-full object-cover opacity-100'
                    />
                  </div>
                ))}
              </div>
              <div className='w-full h-full '>
                <img src={mainImage} className='h-full w-full object-cover' />
              </div>
            </div>
            <div className='col-span-3 h-full '>
              <div className='flex flex-col items-center'>
                <div>
                  <p className='text-center font-semibold text-2xl'>
                    Rs. {productDetails?.price}
                  </p>
                  <p className='text-center text-neutral-500 mt-5'>
                    {productDetails?.description}
                  </p>
                </div>

                <div className='mt-10'>
                  <div className='flex items-center space-x-2 my'>
                    <div className='border'>
                      <button
                        className='bg-neutral-400 hover:bg-neutral-500 text-white px-3 py-2 '
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <span className='px-3 py-2'>{quantity}</span>
                      <button
                        className='bg-neutral-400 hover:bg-neutral-500 text-white px-3 py-2 '
                        onClick={handleIncrement}
                      >
                        +
                      </button>
                    </div>

                    <span className=' bg-neutral-400 px-3 py-2 ml-10 cursor-pointer uppercase text-white select-none	hover:bg-neutral-600'>
                      Add to cart
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr />
          <div className='my-2  w-full'>
            <div className='  w-full p-2 text-justify'>
              {productDetails?.description}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Product;

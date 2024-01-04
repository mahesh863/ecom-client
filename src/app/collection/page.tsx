'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

interface CollectionProductInterface {
  id: number;
}
interface CollectionDetailInterface {
  bannerImage: string;
  name: string;
}

const Collection = () => {
  const [collectionProducts, setCollectionProducts] = useState<
    (CollectionProductInterface | null)[]
  >([]);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionDetailInterface>();

  const searchParams = useSearchParams();
  const collectionId = searchParams.get('id');

  const getCollectionDetails = async () => {
    if (!collectionId) return;

    const params = new URLSearchParams();
    params.append('collectionId', collectionId?.toString());

    const res = await apiRequest('getCollectionDetails', null, params);

    if (res.error) {
      toast.error('Failed to get collection details');
      return;
    }

    console.log('collection res', res.data);

    setCollectionProducts(res.data?.data?.Products);
    setCollectionDetails({
      bannerImage: res.data?.data?.bannerImage,
      name: res.data?.data?.name,
    });
  };

  useEffect(() => {
    getCollectionDetails();
  }, [collectionId]);

  return (
    <>
      <div className='w-full h-[190px] relative'>
        <img
          src={collectionDetails?.bannerImage}
          className='w-full h-full object-cover opacity-100'
        />

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-full'>
          <p className='text-white font-bold text-xl text-center '>
            {collectionDetails?.name}
          </p>
        </div>
      </div>

      <MaxWidthWrapper>
        <div className='flex flex-wrap'>
          {collectionProducts?.map((product) => (
            <ProductCard
              productId={product?.id}
              key={product?.id}
              type='grid'
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Collection;

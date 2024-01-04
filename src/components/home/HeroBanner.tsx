'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';
import MaxWidthWrapper from '../MaxWidthWrapper';
import getWidgetDetails from '@/lib/getWidgetDetails';
import apiRequest from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';
import ShopInfoArea from './ShopInfoArea';

interface BannerProps {
  widgetId: number;
}
interface BannerDetails {
  id: number;
  imageUrl: string;
  headline: string;
  cta: string;
  redirectType: string;
  redirectDataId: string;
}

interface CarouselContainerProps {
  text?: string;
  image?: string;
  cta?: string;
  redirectType?: string;
  redirectDataId?: string;
}
const CarouselContainer = ({
  text,
  image,
  cta,
  redirectDataId,
  redirectType,
}: CarouselContainerProps) => {
  const router = useRouter();

  const handleRedirect = () => {
    if (redirectType === 'product') {
      router.push(`/product?id=${redirectDataId}`);
    } else if (redirectType === 'collection') {
      router.push(`/collection?id=${redirectDataId}`);
    }
  };

  return (
    <div className='h-screen w-screen relative text-white'>
      <img
        src={image}
        alt='hero-banner'
        className='h-full w-full object-cover'
      />
      <MaxWidthWrapper>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center md:items-start'>
          <p className=' text-center md:text-left text-2xl md:text-4xl font-bold'>
            {text}
          </p>
          <button
            className='bg-white text-black px-4 py-2 rounded-full mt-2 '
            onClick={handleRedirect}
          >
            {cta}
          </button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

const HeroBanner = ({ widgetId }: BannerProps) => {
  const [bannerDetails, setBannerDetails] = useState<(BannerDetails | null)[]>(
    []
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const getHomeData = async () => {
    const data = await getWidgetDetails(widgetId);

    if (data) {
      const bannerData: (BannerDetails | null)[] = await Promise.all(
        data.map(async (bannerIds): Promise<BannerDetails | null> => {
          const params = new URLSearchParams();
          params.append('id', bannerIds?.id.toString());

          const res = await apiRequest('getBannerDetailsById', null, params);

          if (res.error) {
            return null;
          }

          return res.data?.data;
        })
      );
      setBannerDetails(bannerData);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div className='h-screen w-screen overflow-hidden relative'>
      <Slider {...settings}>
        {bannerDetails.map((image, index) => (
          <CarouselContainer
            key={image?.id}
            text={image?.headline}
            image={image?.imageUrl}
            cta={image?.cta}
            redirectDataId={image?.redirectDataId}
            redirectType={image?.redirectType}
          />
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;

'use client';
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import ProductCard from '../ProductCard';
import getWidgetDetails from '@/lib/getWidgetDetails';
import apiRequest from '@/lib/apiRequest';

interface Props {
  widgetId: number;
}

interface ProductInterface {
  id: number;
}

const ProductCarousel = ({ widgetId }: Props) => {
  const [productData, setProductData] = useState<(ProductInterface | null)[]>(
    []
  );
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: (
      <div>
        <div className='next-slick-arrow'>
          <ChevronRight />
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className='prev-slick-arrow'>
          <ChevronLeft />{' '}
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const getProductData = async () => {
    const data = await getWidgetDetails(widgetId);

    console.log('Product data :', data);

    if (data) {
      setProductData(data);
    }
  };

  useEffect(() => {
    getProductData();
  }, [widgetId]);

  return (
    <MaxWidthWrapper className='my-10'>
      <div className='m-3 flex items-center'>
        <hr className='w-full' />
        <p className='whitespace-nowrap	mx-5 text-xl font-bold uppercase text-neutral-600 antialiased'>
          Title is required
        </p>
        <hr className='w-full ' />
      </div>

      <div>
        <div>
          <Slider {...settings}>
            {productData?.map((data) => {
              return <ProductCard productId={data?.id} key={data?.id} />;
            })}
          </Slider>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductCarousel;

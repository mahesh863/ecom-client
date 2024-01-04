import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import getWidgetDetails from '@/lib/getWidgetDetails';
import apiRequest from '@/lib/apiRequest';
import { cn } from '@/lib/utils';
import ShopInfoArea from './ShopInfoArea';

interface Props {
  widgetId: number;
}

interface CategoryInterface {
  id: number;
  name: string;
  header: string;
  subHeader: string;
  cta: string;
  image: string;
  type: string;
  redirect: number;
}

const GridSection = ({ widgetId }: Props) => {
  const [categoryData, setCategoryData] = useState<
    (CategoryInterface | null)[]
  >([]);

  const getCategoryData = async () => {
    const data = await getWidgetDetails(widgetId);

    if (data) {
      let bannerData: (CategoryInterface | null)[] = await Promise.all(
        data.map(async (bannerIds): Promise<CategoryInterface | null> => {
          const params = new URLSearchParams();
          params.append('id', bannerIds?.id.toString());

          const res = await apiRequest(
            'getCategoryWidgetDetails',
            null,
            params
          );

          if (res.error) {
            return null;
          }

          return res.data?.data;
        })
      );

      bannerData = bannerData.filter((item, index) => index < 4);

      setCategoryData(bannerData);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, [widgetId]);

  return (
    <>
      <MaxWidthWrapper className='my-10'>
        <div className='m-3 flex items-center'>
          <hr className='w-full' />
          {/* <p className='whitespace-nowrap	mx-5 text-xl font-bold uppercase text-neutral-600 antialiased'>
          Title is required
        </p> */}
          <hr className='w-full ' />
        </div>

        <div className='grid md:grid-rows-2 md:grid-cols-6  gap-2 h-[250px]'>
          {categoryData.map((widgetData, index) => (
            <div
              key={widgetData?.id}
              className={cn({
                'col-span-3 row-span-2 overflow-hidden cursor-pointer relative':
                  index === 0,
                'col-span-2 row-span-2 overflow-hidden relative': index === 1,
                'col-span-1 row-span-1 overflow-hidden relative': index >= 2,
              })}
            >
              <img
                className='w-full h-full object-cover hover:scale-[1.1] hover:opacity-50 duration-500'
                src={widgetData?.image}
              />
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  '>
                <p className='uppercase text-white text-2xl font-bold antialiased'>
                  {widgetData?.header}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>

      <ShopInfoArea />
    </>
  );
};

export default GridSection;

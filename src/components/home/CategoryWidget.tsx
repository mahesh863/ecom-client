import apiRequest from '@/lib/apiRequest';
import getWidgetDetails from '@/lib/getWidgetDetails';
import React, { useEffect, useState } from 'react';

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

const CategoryWidget = ({ widgetId }: Props) => {
  const [categoryData, setCategoryData] = useState<
    (CategoryInterface | null)[]
  >([]);

  const getCategoryData = async () => {
    const data = await getWidgetDetails(widgetId);

    if (data) {
      const bannerData: (CategoryInterface | null)[] = await Promise.all(
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
      setCategoryData(bannerData);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, [widgetId]);

  return (
    <div className='w-full  flex flex-wrap'>
      {categoryData.map((widgetData, index) => (
        <div
          className='w-full md:w-1/3 h-[200px] overflow-hidden relative '
          key={widgetData?.id}
        >
          <img
            src={widgetData?.image}
            className='h-full w-full object-cover hover:scale-[1.1] hover:opacity-50 transition-all duration-500'
          />

          <div className='absolute top-1/2 -translate-y-1/2 left-10'>
            <p className='text-xs text-white'>{widgetData?.header}</p>
            <p className='text-lg uppercase text-white'>
              {widgetData?.subHeader}
            </p>
            <span className='px-2 py-1 text-[10px] rounded-[100px] border-[2px] cursor-pointer hover:bg-white transition duration-300 hover:text-[#000] font-bold '>
              {widgetData?.cta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryWidget;

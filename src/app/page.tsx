'use client';
import CategoryWidget from '@/components/home/CategoryWidget';
import FeatureSection from '@/components/home/FeatureSection';
import GridSection from '@/components/home/GridSection';
import HeroBanner from '@/components/home/HeroBanner';
import ProductCarousel from '@/components/home/ProductCarousel';
import ShopInfoArea from '@/components/home/ShopInfoArea';
import apiRequest from '@/lib/apiRequest';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home() {
  const [homeWidget, setHomeWidget] = useState([]);

  const getHomeData = async () => {
    const res = await apiRequest('getHome');

    if (res.error) {
      toast.error(res.error?.message);
      setHomeWidget([]);
      return;
    }

    setHomeWidget(res.data?.data);
  };

  const renderWidget = (name: string, widgetId: number) => {
    switch (name) {
      case 'banner':
        return <HeroBanner widgetId={widgetId} />;
      case 'category':
        return <CategoryWidget widgetId={widgetId} />;
      case 'categoryGrid':
        return <GridSection widgetId={widgetId} />;
      case 'productSlider':
        return <ProductCarousel widgetId={widgetId} />;

      default:
        console.log('No widget found', name);
        return <ShopInfoArea />;
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div className='overflow-x-hidden'>
      {homeWidget?.map((item: any) => (
        <div key={item.id}>
          {renderWidget(item?.widgetName, item?.widgetId)}
        </div>
      ))}

      <FeatureSection />
    </div>
  );
}

import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Clock, History, Star } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

const FeatureCard = ({ icon, title, body }: FeatureCardProps) => {
  return (
    <div>
      <div className='mh-[200px]  flex items-center flex-col p-2 '>
        <div className='border  p-3 rounded-full border-neutral-700 my-1'>
          {icon}
        </div>
        <p className='text-s text-neutral-700 '>{title}</p>
        <p className='text-xs text-center mt-3 text-neutral-600'>{body}</p>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <Star className='text-neutral-700' />,
      title: 'Top Quality',
      body: 'Top quality every time guaranteed',
    },

    {
      icon: <History className='text-neutral-700' />,
      title: '30 days return',
      body: "We have a 30 days return policy, if you don't like the product, we will refund you. No questions asked.",
    },

    {
      icon: <Clock className='text-neutral-700' />,
      title: 'On-Time Delivery Guarantee',
      body: 'We give on time delivery guarantee, else we will give you 100 Rs. gift card.',
    },
  ];

  return (
    <MaxWidthWrapper className='grid md:grid-cols-3 gap-3 my-2'>
      {features.map((data, i) => (
        <FeatureCard
          key={data.title}
          icon={data.icon}
          title={data.title}
          body={data.body}
        />
      ))}
    </MaxWidthWrapper>
  );
};

export default FeatureSection;

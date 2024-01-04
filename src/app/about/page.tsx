import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <div className='w-full h-[190px] relative'>
        <img
          src='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=8000'
          className='w-full h-full object-cover opacity-100'
        />

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 w-full'>
          <p className='text-white font-bold text-xl text-center '>About us</p>
        </div>
      </div>

      <MaxWidthWrapper className='text-neutral-500 font-light text-sm text-justify '>
        <p className='my-10'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa dolore
          et aspernatur, inventore dolor dolorum, minus veniam fuga, vitae vero
          perferendis impedit ad. Nulla aliquid blanditiis, praesentium
          architecto quod numquam? Quas, voluptatem aliquam. Rerum, excepturi
          vero necessitatibus assumenda magnam aliquam adipisci. Cumque quaerat
          ipsum architecto porro cum repudiandae accusantium beatae, molestiae,
          saepe maxime a mollitia quibusdam est optio odit rem. Commodi pariatur
          consequatur quo, quas amet quisquam at id dolor quidem. Dolores error
          aut quibusdam, explicabo eveniet ex eius recusandae possimus, ducimus
          ab dicta! Quam praesentium quo iure maiores ea.
        </p>
        <p className='my-10'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa dolore
          et aspernatur, inventore dolor dolorum, minus veniam fuga, vitae vero
          perferendis impedit ad. Nulla aliquid blanditiis, praesentium
          architecto quod numquam? Quas, voluptatem aliquam. Rerum, excepturi
          vero necessitatibus assumenda magnam aliquam adipisci. Cumque quaerat
          ipsum architecto porro cum repudiandae accusantium beatae, molestiae,
          saepe maxime a mollitia quibusdam est optio odit rem. Commodi pariatur
          consequatur quo, quas amet quisquam at id dolor quidem. Dolores error
          aut quibusdam, explicabo eveniet ex eius recusandae possimus, ducimus
          ab dicta! Quam praesentium quo iure maiores ea.
        </p>
        <p className='my-10'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa dolore
          et aspernatur, inventore dolor dolorum, minus veniam fuga, vitae vero
          perferendis impedit ad. Nulla aliquid blanditiis, praesentium
          architecto quod numquam? Quas, voluptatem aliquam. Rerum, excepturi
          vero necessitatibus assumenda magnam aliquam adipisci. Cumque quaerat
          ipsum architecto porro cum repudiandae accusantium beatae, molestiae,
          saepe maxime a mollitia quibusdam est optio odit rem. Commodi pariatur
          consequatur quo, quas amet quisquam at id dolor quidem. Dolores error
          aut quibusdam, explicabo eveniet ex eius recusandae possimus, ducimus
          ab dicta! Quam praesentium quo iure maiores ea.
        </p>
      </MaxWidthWrapper>
    </div>
  );
};

export default AboutUs;

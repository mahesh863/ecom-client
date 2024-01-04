import {
  CheckCheck,
  CheckCircle,
  CircleDashed,
  Package,
  Truck,
} from 'lucide-react';
import React from 'react';

const OrderCard = () => {
  return (
    <div className='border p-3 m-2 rounded-md  flex cursor-pointer hover:bg-slate-100'>
      <div className='flex-1'>
        <p className='text-xl font-medium'>Order #1234</p>
        <span className='text-lg font-medium flex gap-2'>
          {' '}
          Status:
          {/* <span className='flex gap-1 text-yellow-500'>
            <CircleDashed /> Pending
          </span> */}
          {/* <span className='flex gap-1 text-green-500'>
            <CheckCheck /> Ordered
          </span> */}
          {/* <span className='flex gap-1 text-blue-500'>
            <Truck /> Shipped
          </span> */}
          {/* <span className='flex gap-1 text-gray-500'>
            <Package /> Packed
          </span> */}
          <span className='flex gap-1 text-green-700'>
            <CheckCircle /> Delivered
          </span>
        </span>
      </div>
      <div className='flex-1'>
        <p className='text-lg font-medium'>Items: 3</p>
        <p className='text-lg font-medium'>Total: $300</p>
      </div>
    </div>
  );
};

export default OrderCard;

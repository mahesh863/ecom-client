'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import apiRequest from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { CartItems } from '../GlobalRedux/cart/cartSlice';
import { convertionFactor } from '@/constants/payment';
import { formatCurrency } from '@/lib/fotmatCurrency';
import PageSubHeader from '@/components/PageSubHeader';

interface CheckOutInformationInterface {
  name: string;
  address1: string;
  address2: string;
  pinCode: string;
  city: string;
  state: string;
  email: string;
  phoneNumber: string;
}

interface ProductDetailInterface {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  id: number;
}

const Checkout = () => {
  const [checkOutInformation, setCheckOutInformation] =
    useState<CheckOutInformationInterface>({} as CheckOutInformationInterface);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [productData, setProductData] = useState<
    (ProductDetailInterface | null)[]
  >([]);

  const cartDetails = useSelector((state: RootState) => state.cart.cart);

  const router = useRouter();

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOutInformation((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createOrder = async (): Promise<number | undefined> => {
    const products = cartDetails.map((item) => ({
      productId: item.id,
      productQuantity: item.quantity,
    }));

    const reqBody = {
      products,
      address: checkOutInformation,
    };
    const res = await apiRequest('createOrder', reqBody);

    if (res.error) {
      toast.error(res.error?.message);
      return;
    }
    return res.data?.data;
  };

  const confirmOrder = async (createdOrderId: number, paymentId: number) => {
    const reqBody = {
      orderId: createdOrderId,
      transactionId: paymentId,
    };
    const res = await apiRequest('confirmOrder', reqBody);

    if (res.error) {
      toast.error(
        "Something went wrong, if money was deducted it'll be refunded within 7 days"
      );
      return;
    }

    router.push(`/order-success?paymentId=${paymentId}`);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      !checkOutInformation?.name ||
      !checkOutInformation?.address1 ||
      !checkOutInformation?.address2 ||
      !checkOutInformation?.pinCode ||
      !checkOutInformation?.city ||
      !checkOutInformation?.state ||
      !checkOutInformation?.email ||
      !checkOutInformation?.phoneNumber
    ) {
      toast.error('Please fill all the fields');
      return;
    }
    const createdOrderId = await createOrder();
    if (!createdOrderId) {
      toast.error('Something went wrong, please try again');
      return;
    }
    await handleMakePayment(createdOrderId);
  };

  const verifyPayment = async (
    razorpayPaymentId: string,
    razorpayOrderId: string,
    signature: string
  ): Promise<boolean> => {
    const res = await apiRequest('razorpayVerifyPayment', {
      razorpayPaymentId,
      orderId: razorpayOrderId,
      razorpaySignature: signature,
    });

    if (res.error) {
      return false;
    }

    return true;
  };

  const handleMakePayment = async (createdOrderId: number) => {
    if (totalAmount) {
      const res = await apiRequest('razorpayCreateOrder', {
        amount: totalAmount * convertionFactor,
      });

      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      const orderId = res.data?.data;

      const options = {
        key: process.env.RAZORPAY_KEY,
        amount: totalAmount * convertionFactor,
        currency: 'INR',
        name: 'Flatsome',
        description: 'Test Transaction',
        image:
          'https://flatsome3.uxthemes.com/wp-content/themes/flatsome/assets/img/logo.png',
        order_id: orderId,
        handler: async (response: any) => {
          const isVerified = await verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );

          if (isVerified) {
            await confirmOrder(createdOrderId, response.razorpay_payment_id);
          }
        },
        prefill: {
          name: checkOutInformation.name,
          email: checkOutInformation.email,
          contact: checkOutInformation.phoneNumber,
        },
        theme: {
          color: '#111827',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on('payment.failed', function () {
        toast.error('Payment failed, please try again');
      });
    }
  };

  const getProductDetails = async (
    productId: number
  ): Promise<ProductDetailInterface | null> => {
    const params = new URLSearchParams();
    params.append('id', productId.toString());

    const res = await apiRequest('getProductDetails', null, params);

    if (res.error) {
      return null;
    }

    return res.data?.data;
  };

  const getCartDetails = async () => {
    const productInfo = await Promise.all(
      cartDetails.map(async (item: CartItems) => {
        const productDetails = await getProductDetails(item.id);

        if (productDetails) {
          productDetails.quantity = item.quantity;
        }
        return productDetails;
      })
    );

    setProductData(productInfo);
  };

  const getAmountTotal = () => {
    if (productData.length > 0) {
      let total = 0;
      productData.forEach((item) => {
        if (item) {
          total += item.price * item.quantity;
        }
      });

      setTotalAmount(total);
    }
  };

  useEffect(() => {
    getCartDetails();
  }, [cartDetails]);

  useEffect(() => {
    getAmountTotal();
  }, [productData]);

  return (
    <>
      <Script
        id='razorpay-checkout-js'
        src='https://checkout.razorpay.com/v1/checkout.js'
      />
      <div>
        <PageSubHeader pageTitle='Checkout' />
        <MaxWidthWrapper className='min-h-screen'>
          {totalAmount && (
            <div className='text-center text-2xl my-10 font-medium'>
              Total: {formatCurrency(totalAmount)}
            </div>
          )}
          <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-[40%]'>
              <h2 className='text-2xl font-light mb-6 text-center'>
                Shipping Details
              </h2>
              <form>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='John Doe'
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>
                    Address Line 1
                  </label>
                  <input
                    type='text'
                    name='address1'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='1st cross, 2nd main, 3rd stage, 4th block'
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>
                    Address Line 2
                  </label>
                  <input
                    type='text'
                    name='address2'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Apt 4B'
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>
                    Pin code
                  </label>
                  <input
                    type='text'
                    name='pinCode'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='123456'
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='New York'
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>
                    State
                  </label>
                  <input
                    type='text'
                    name='state'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Bangalore'
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='john@example.com'
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-600'>
                    Phone number
                  </label>
                  <input
                    type='tel'
                    name='phoneNumber'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='8638698612'
                    onChange={handleFormInputChange}
                  />
                </div>
              </form>
              <button
                type='submit'
                className='bg-gray-800 text-white p-2 rounded-md hover:bg-gray-900 transition-all w-full'
                onClick={handleSubmit}
              >
                Make Payment
              </button>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Checkout;

import { addToCart, removeFromCart } from '@/app/GlobalRedux/cart/cartSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '@/app/GlobalRedux/wishlist/wishlistSlice';
import apiRequest from '@/lib/apiRequest';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ProductDetails {
  images: string[];
  name: string;
  id: number;
  price: number;
}

const ProductCard = ({ productId, type = 'scroll' }: any) => {
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(true);
  const [productData, setProductData] = useState<ProductDetails>();
  const [isInCart, setIsInCart] = useState(false);

  const cart = useSelector((state: any) => state.cart.cart);
  const wishlist = useSelector((state: any) => state.wishlist.wishlist);

  const dispatch = useDispatch();
  const router = useRouter();

  const addProductToCart = () => {
    const productDetails = {
      id: productId,
      quantity: 1,
    };

    dispatch(addToCart(productDetails));
  };
  const removeProductFromCart = () => {
    const productDetails = {
      id: productId,
    };
    dispatch(removeFromCart(productDetails));
  };
  const addProductToWishlist = () => {
    const productDetails = {
      id: productId,
      quantity: 1,
    };

    dispatch(addToWishlist(productDetails));
  };
  const removeProductFromWishlist = () => {
    const productDetails = {
      id: productId,
    };
    dispatch(removeFromWishlist(productDetails));
  };

  const navigateToProduct = () => {
    router.push(`/product?id=${productId}`);
  };

  const getProductData = async () => {
    const params = new URLSearchParams();
    params.append('id', productId?.toString());

    const res = await apiRequest('getProductDetails', null, params);

    if (res.error) {
      return;
    }

    setProductData(res.data?.data);
  };

  useEffect(() => {
    getProductData();
  }, [productId]);

  useEffect(() => {
    const isInCart = cart.find((item: any) => item.id === productId);
    if (isInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cart]);

  useEffect(() => {
    const isInWishlist = wishlist.find((item: any) => item.id === productId);
    if (isInWishlist) {
      setIsAddedToWishlist(true);
    } else {
      setIsAddedToWishlist(false);
    }
  }, [wishlist]);

  return (
    <div
      className={cn('relative h-[420px] p-2 group cursor-pointer', {
        'w-1/2 md:w-1/3': type === 'grid',
      })}
    >
      <img
        src={productData?.images[0]}
        className='h-[300px] object-cover'
        onClick={navigateToProduct}
      />
      <div className='absolute top-4 right-4 group-hover:opacity-100 opacity-0 duration-500 transition-opacity'>
        {isAddedToWishlist ? (
          <Heart
            className='text-neutral-100 w-7 h-7 p-1 bg-red-500 rounded-full duration-500 cursor-pointer hover:bg-red-600 z-9'
            onClick={(e) => {
              e.stopPropagation();
              removeProductFromWishlist();
            }}
          />
        ) : (
          <Heart
            className='text-neutral-500 w-7 h-7 p-1 bg-neutral-200 rounded-full duration-500 hover:bg-neutral-400 cursor-pointer z-9'
            onClick={(e) => {
              e.stopPropagation();
              addProductToWishlist();
            }}
          />
        )}
      </div>
      <div>
        <p className='text-[10px] my-1 text-neutral-500 uppercase antialiased'>
          category
        </p>
        <p
          className='text-[12px] my-1 text-neutral-800 capitalize antialiased line-clamp-1 font-semibold'
          onClick={navigateToProduct}
        >
          {productData?.name}
        </p>
        <p className='text-[12px] my-1 text-grey-900 capitalize antialiased line-clamp-1 font-bold'>
          &#8377; {productData?.price}
        </p>
        <div>
          {isInCart ? (
            <span
              className='uppercase text-[12px]  text-neutral-500 cursor-pointer hover:bg-neutral-500 hover:text-neutral-100 ring-2 ring-neutral-500 px-3 py-1 rounded-[40px] hover:ring-0 duration-500 z-9'
              onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                e.stopPropagation();
                removeProductFromCart();
              }}
            >
              {' '}
              remove from cart
            </span>
          ) : (
            <span
              className='uppercase text-[12px]  text-neutral-500 cursor-pointer hover:bg-neutral-500 hover:text-neutral-100 ring-2 ring-neutral-500 px-3 py-1 rounded-[40px] hover:ring-0 duration-500 z-9'
              onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                e.stopPropagation();
                addProductToCart();
              }}
            >
              {' '}
              add to cart
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const apis = {
  signin: {
    path: 'signin',
    method: 'POST',
  },
  signup: {
    path: 'signup',
    method: 'POST',
  },
  getHome: {
    path: 'home',
    method: 'GET',
  },
  getWidgetDetails: {
    path: 'widget/data',
    method: 'GET',
  },
  getBannerDetailsById: {
    path: 'banner/details',
    method: 'GET',
  },
  getCategoryWidgetDetails: {
    path: 'category/widget',
    method: 'GET',
  },
  getProductDetails: {
    path: 'products/data',
    method: 'GET',
  },
  getCollectionDetails: {
    path: 'collection/details',
    method: 'GET',
  },
  razorpayCreateOrder: {
    path: 'razorpay/create-order',
    method: 'POST',
  },
  razorpayVerifyPayment: {
    path: 'razorpay/verify-payment',
    method: 'POST',
  },
  createOrder: {
    path: 'order/create',
    method: 'POST',
  },
  confirmOrder: {
    path: 'order/create',
    method: 'PUT',
  },
  signout: {
    path: 'signout',
    method: 'GET',
  },
};

export default apis;

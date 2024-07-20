import React, { Suspense } from 'react';
import Checkout from './Checkout';
const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Checkout />
  </Suspense>
);

export default Page;

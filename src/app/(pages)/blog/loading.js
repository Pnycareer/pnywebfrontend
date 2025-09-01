// app/[slug]/loading.jsx

import React from 'react';
import Loader from '@/components/loader/Loader'; // You already have this component.

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader />
    </div>
  );
};

export default Loading;

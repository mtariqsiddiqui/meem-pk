import React from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Product Detail</h1>
      <p className="text-gray-600">Product detail for ID: {id}</p>
    </div>
  );
};
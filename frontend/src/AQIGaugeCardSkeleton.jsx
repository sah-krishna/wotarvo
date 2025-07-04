import React from 'react';

export default function AQIGaugeCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-xl w-full relative animate-pulse">
      <div className="absolute left-6 top-6 h-7 w-32 bg-gray-200 rounded-full" />
      <div className="absolute right-6 top-6 flex flex-col items-center">
        <div className="bg-gray-200 rounded-full" style={{ width: 80, height: 48 }} />
        <div className="h-7 w-12 bg-gray-200 rounded mt-2" />
      </div>
      <div className="flex flex-col items-center mt-8 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-7 w-7 bg-gray-200 rounded-full" />
          <div className="h-6 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-20 bg-gray-200 rounded mt-1" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-3 text-center shadow-sm">
            <div className="h-6 w-10 bg-gray-200 rounded mx-auto mb-1" />
            <div className="h-3 w-12 bg-gray-100 rounded mx-auto" />
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="h-16 w-full bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
} 
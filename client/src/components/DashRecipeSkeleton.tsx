import React from 'react';

const DashRecipeSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border animate-pulse">

      <div className="h-5 w-3/4 bg-slate-300 rounded mb-3"></div>

      <div className="h-4 w-full bg-slate-300 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-slate-300 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-slate-300 rounded"></div>
    </div>
  );
};

export default DashRecipeSkeleton;

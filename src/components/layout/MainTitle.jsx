"use client"
import React, { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
const MainTitle = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className='bg-black justify-center w-full text-[#FFCE00] text-xs h-11 md:text-sm p-2 flex items-center justify-center relative'>
        <span className='truncate'>
        Are you a Tradesperson looking for job? <Link className='text-white' href={'/login/tradesperson/as-tradeperson'}> <span> <u> Join for free</u></span></Link>
        </span>
        {/* <button onClick={() => setIsVisible(false)} className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
          <X className="h-5 w-5" />
        </button> */}
      </div>
    )
  );
};

export default MainTitle;

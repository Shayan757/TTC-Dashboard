import React from 'react';
import { Mail } from 'lucide-react';

const Step1 = ({ data, handleChange }) => {
  return (
    <div>
      <label htmlFor="email" className="block text-xl font-semibold text-gray-700 py-0 text-center">
      Please enter your email address so we can identify you.
      </label>
      <span className="text-xs text-gray-500">Email Address</span>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className="text-gray-400 h-4 w-4" />
        </div>
        <input
          id="email"
          name="email"
          type="text"
          required
          placeholder="Enter your Email Address"
          value={data.email}
          onChange={handleChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm md:text-md"
        />
      </div>
    </div>
  );
};

export default Step1;

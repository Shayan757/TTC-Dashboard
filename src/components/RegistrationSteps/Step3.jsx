import React from 'react';
import { Phone } from 'lucide-react';

const Step3 = ({ data, handleChange }) => {
  return (
    <div>
      <label htmlFor="phone" className="block text-xl font-semibold text-gray-700 py-0 text-center">
      Your number is safe with us.
      <br />
      <span className='text-xs text-center text-gray-500 font-normal'>Some matches prefer to provide quotes over the phone to get more details.</span>
      </label>
      <span className="text-xs text-gray-500">Phone Number</span>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Phone className="text-gray-400" />
        </div>
        <input
          id="phone"
          name="phone"
          type="number"
          required
          placeholder="Enter your Phone Number"
          value={data.phone}
          onChange={handleChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default Step3;

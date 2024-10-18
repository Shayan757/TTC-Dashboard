import React from 'react'
const Progress = ({ currentStep, totalSteps }) => {
    return (
      <div className="w-full bg-gray-200 h-1.5 rounded-full">
        <div
          className="bg-yellow-500 h-1.5 rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    );
  };
  
  export default Progress;
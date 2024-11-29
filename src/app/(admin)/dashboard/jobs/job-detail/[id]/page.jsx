"use client";

import { useRouter } from "next/navigation";
// import Image from "next/image";
// import userImage from "../../../../../assets/userImage.png"

const JobDetails = ({ job }) => {
    const router = useRouter();

    if (!job) {
        return <div className="text-red-500">Job details not provided.</div>;
      }
    
      
      return (
        <div className="container mx-auto p-4">
          <button onClick={() => router.back()} className="text-gray-500 mb-3">
            &larr; Back
          </button>
          <div className="flex items-center bg-white shadow-md rounded-lg p-6">
            
            {/* <div>
              <h2 className="text-xl px-6 font-bold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div> */}
          </div>
          <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">
            <p><strong>Job Type:</strong> {job?.service.type || 'N/A'}</p>
            {/* <p><strong>City:</strong> {user?.city || 'N/A'}</p> */}
            <p><strong>Post Code:</strong> {job?.postcode || 'N/A'}</p>
            <p><strong>Date Posted:</strong>{new Date(job?.createdAt).toLocaleString()} </p>
            {/* <p><strong>Subscription Expiry Date:</strong> {user?.subscription.type || 'N/A'}</p> */}
            {/* <p><strong>No. of Jobs Posted:</strong> {user?.jobCount || '0'}</p> */}
          </div>
          <div className="mt-6">
            {job?.jobs?.map((job, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded-lg shadow mb-4"
              >
                <p className="font-bold">{job.title}</p>
                <p className="text-sm text-gray-500">Posted on {job.postedDate}</p>
              </div>
    
    
            ))}
    
              {/* Job Posts */}
      <div className="space-y-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <p className="font-medium">Leaking pipe in kitchen under sink</p>
          <span className="text-sm text-gray-500">Job Completed on 27 May 2024</span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <p className="font-medium">Leaking pipe in kitchen under sink</p>
          <span className="text-sm text-gray-500">Job Completed on 27 May 2024</span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <p className="font-medium">Leaking pipe in kitchen under sink</p>
          <p className="text-sm text-gray-500">Job Completed on 27 May 2024</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <p className="font-medium">Leaking pipe in kitchen under sink</p>
          <span className="text-sm text-gray-500 ">Job Completed on 27 May 2024</span>
        </div>
      </div>
    </div>
    
          </div>
      );
    };
    
    export default JobDetails;
    
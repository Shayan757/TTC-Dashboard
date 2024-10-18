"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Line_Chart from '../../../components/Dashboard/LineChart'
import TradeChart from '../../../components/Dashboard/TradeChart'
import JobChart from '../../../components/Dashboard/JobChart'
import { getUserDetails } from "../../../actions/auth";
import Image from "next/image";
import userImage from "../../assets/userImage.png";
import Spinner from "../../../components/Spinner";
const page = () => {
  const [data, setData] = useState([]);
  const [job_data, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const user = await getUserDetails();
    const effectiveUserId = user?.id;
    if (!effectiveUserId) {
      throw new Error("No valid user ID");
    }


    try {
      const response = await fetch("/api/get-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.data.success) {
        setJobData(data.data);
      }
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    }

    try {
      const response = await fetch("/api/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.data.success) {
        setData(data.data);
      }
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className='overflow-y-scroll'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Stat Boxes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div style={{ marginLeft: '-10px' }} className="flex">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="6" fill="#F1C34D" fill-opacity="0.08" />
              <path d="M10 30.25V26.75C10 26.0625 10.1771 25.4167 10.5313 24.8125C10.8854 24.2084 11.375 23.75 12 23.4375C13.0625 22.8959 14.2604 22.4375 15.5938 22.0625C16.9271 21.6875 18.3958 21.5 20 21.5C21.6042 21.5 23.0729 21.6875 24.4063 22.0625C25.7396 22.4375 26.9375 22.8959 28 23.4375C28.625 23.75 29.1146 24.2084 29.4688 24.8125C29.8229 25.4167 30 26.0625 30 26.75V30.25H10ZM20 20.25C18.625 20.25 17.4479 19.7604 16.4688 18.7813C15.4896 17.8021 15 16.625 15 15.25H14.0625V14H15C15 13.0625 15.2292 12.2188 15.6875 11.4688C16.1458 10.7188 16.75 10.125 17.5 9.68753V11.5H18.75V9.18753C18.9375 9.12503 19.1354 9.07836 19.3438 9.04753C19.5521 9.0167 19.7708 9.00086 20 9.00003C20.2292 8.9992 20.4479 9.01503 20.6563 9.04753C20.8646 9.08003 21.0625 9.1267 21.25 9.18753V11.5H22.5V9.68753C23.25 10.125 23.8542 10.7188 24.3125 11.4688C24.7708 12.2188 25 13.0625 25 14H25.9375V15.25H25C25 16.625 24.5104 17.8021 23.5313 18.7813C22.5521 19.7604 21.375 20.25 20 20.25ZM20 17.75C20.6875 17.75 21.2763 17.5054 21.7663 17.0163C22.2563 16.5271 22.5008 15.9384 22.5 15.25H17.5C17.5 15.9375 17.745 16.5263 18.235 17.0163C18.725 17.5063 19.3133 17.7509 20 17.75Z" fill="#FFCE00" />
            </svg>

            <h2 style={{ margin: 'auto 0' }} className="text-gray-700 text-lg px-2">{data?.usersWithRole2?.length || 0}</h2>
          </div>
          <p className="text-gray-500 mt-1">No of tradespersons</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div style={{ marginLeft: '-10px' }} className="flex">
            <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.666626" width="40" height="40" rx="6" fill="#F1C34D" fill-opacity="0.08" />
              <path d="M20.6666 10C18.0466 10 15.9166 12.13 15.9166 14.75C15.9166 17.32 17.9266 19.4 20.5466 19.49C20.6266 19.48 20.7066 19.48 20.7666 19.49C20.7866 19.49 20.7966 19.49 20.8166 19.49C20.8266 19.49 20.8266 19.49 20.8366 19.49C23.3966 19.4 25.4066 17.32 25.4166 14.75C25.4166 12.13 23.2866 10 20.6666 10Z" fill="#FFCE00" />
              <path d="M25.7466 22.15C22.9566 20.29 18.4066 20.29 15.5966 22.15C14.3266 23 13.6266 24.15 13.6266 25.38C13.6266 26.61 14.3266 27.75 15.5866 28.59C16.9866 29.53 18.8266 30 20.6666 30C22.5066 30 24.3466 29.53 25.7466 28.59C27.0066 27.74 27.7066 26.6 27.7066 25.36C27.6966 24.13 27.0066 22.99 25.7466 22.15Z" fill="#FFCE00" />
            </svg>
            <h2 style={{ margin: 'auto 0' }} className="text-gray-700 text-lg px-2">{data?.usersWithRole1?.length || 0}</h2>
          </div>
          <p className="text-gray-500 mt-1">No of clients</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div style={{ marginLeft: '-10px' }} className="flex">
            <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.333374" width="40" height="40" rx="6" fill="#F1C34D" fill-opacity="0.08" />
              <path d="M19.3434 28.02C24.3195 28.02 28.3534 23.9861 28.3534 19.01C28.3534 14.0339 24.3195 10 19.3434 10C14.3673 10 10.3334 14.0339 10.3334 19.01C10.3334 23.9861 14.3673 28.02 19.3434 28.02Z" fill="#FFCE00" />
              <path d="M30.3234 26.95C29.9934 26.34 29.2934 26 28.3534 26C27.6434 26 27.0334 26.29 26.6734 26.79C26.3134 27.29 26.2334 27.96 26.4534 28.63C26.8834 29.93 27.6334 30.22 28.0434 30.27C28.1034 30.28 28.1634 30.28 28.2334 30.28C28.6734 30.28 29.3534 30.09 30.0134 29.1C30.5434 28.33 30.6434 27.56 30.3234 26.95Z" fill="#FFCE00" />
            </svg>

            <h2 style={{ margin: 'auto 0' }} className="text-gray-700 text-lg px-2">{job_data?.totalJobsCount || 0}</h2>
          </div>
          <p className="text-gray-500 mt-1">No of jobs posted</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriptions Chart */}
        <div className="bg-white rounded-lg shadow-md">

          <Line_Chart data={data?.usersWithRole1} />
        </div>

        {/* Top Trades Widget */}

        <TradeChart data={data?.usersWithRole2} />

      </div>

      {/* Job Posted Chart */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <JobChart data={job_data} />
      </div>
    </div>
  )
}

export default page
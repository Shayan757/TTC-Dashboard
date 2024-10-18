'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname hook
import { getUserDetails } from '../../actions/auth';
import Link from 'next/link'; // Ensure Link is imported

const Progress = () => {
  const pathname = usePathname(); // Get current pathname
  const [userData, setUserData] = useState(null);
  const [aboutCompleted, setAboutCompleted] = useState(false);
  const [leadsCompleted, setLeadsCompleted] = useState(false);
  const [accountDetailsCompleted, setAccountDetailsCompleted] = useState(false);

  const completeness = (aboutCompleted ? 33 : 0) + (leadsCompleted ? 33 : 0) + (accountDetailsCompleted ? 34 : 0);

  const fetchUserData = async (effectiveUserId) => {
    const jwtuser = await getUserDetails();
    try {
      const response = await fetch('/api/get-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtuser?.token}`,
         },
        body: JSON.stringify({ id: effectiveUserId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      if (data.success) {
        if (data.user.profileUrl && data.user.firstName && data.user.lastName) {
          setAboutCompleted(true);
        }

        const servicesResponse = await fetch(`/api/save-trade-service?userId=${effectiveUserId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtuser?.token}`,
           },
        });

        if (!servicesResponse.ok) {
          throw new Error('Failed to fetch services');
        }

        const servicesData = await servicesResponse.json();
        if (servicesData.success && servicesData.services.length > 0) {
          const locationsResponse = await fetch(`/api/save-trade-location?userId=${effectiveUserId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtuser?.token}`,
             },
          });

          if (!locationsResponse.ok) {
            throw new Error('Failed to fetch locations');
          }

          const locationsData = await locationsResponse.json();
          if (locationsData.success && locationsData.tradeLocations.length > 0) {
            setLeadsCompleted(true);
          }
        } else {
          setLeadsCompleted(false);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getUser = async () => {
    try {
      const user = await getUserDetails();
      setUserData(user);

      if (user.id) {
        setAccountDetailsCompleted(!user.fresh);
        await fetchUserData(user.id);
      }
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
    {completeness !== 100 ? (
        <div className='bg-white pb-3 rounded-2xl'>
        <div className="bg-white p-4 rounded-2xl">
          <div className="text-xl font-semibold mb-2">Your profile is incomplete</div>
          <div className="relative pt-1 w-full">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${completeness}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"
              >
                <span
                  className="text-black text-xs px-2"
                  style={{ transform: `translateX(-20%)`, position: 'absolute', left: `${completeness}%` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-check-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08 0L7 8.939 5.781 7.72a.75.75 0 0 0-1.06 1.06L6.44 10.56a.75.75 0 0 0 1.08 0l4.47-4.47a.75.75 0 0 0 0-1.06z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs mt-4">
            Take two minutes to improve your profile. This increases the chance to get leads.
          </div>
        </div>
        {pathname !== '/tradesperson/profile' && (
          <Link href={'/tradesperson/profile'}>
            <button
              type='button'
              className="py-2 px-8 bg-yellow-500 text-black hover:text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 mt-0 ml-4"
            >
              Complete
            </button>
          </Link>
        )}
      </div>
      ) : null}
    </>
  );
};

export default Progress;

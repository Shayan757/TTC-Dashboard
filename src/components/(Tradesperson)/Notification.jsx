'use client';
import { useState, useEffect, useRef } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { Spinner } from '../Spinner';
import { getUserDetails } from '../../actions/auth';
import { useRouter } from 'next/navigation';
const Notification = () => {
  const router = useRouter();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ringOff, setRingOff] = useState(true);
  const notificationRef = useRef(null);

  // Fetch the last 10 notAccepted quotes for the tradesperson
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);

      try {
        const user = await getUserDetails();
        if (!user?.id) return;

        const response = await fetch(`/api/get-quote-request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`,
          },
          cache: "no-cache",
          body: JSON.stringify({tradepersonId:user?.id}),
        });

        const data = await response.json();

        if (response.ok && Array.isArray(data?.quotes)) {
          const notAcceptedQuotes = data?.quotes?.filter((quote) => quote?.isViewed === false);

          const updatedQuotes = await Promise.all(
            notAcceptedQuotes?.map(async (quote) => {
              try {
                const response = await fetch(`/api/get-service?serviceId=${quote.job.job.services}`, {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                  },
                });

                if (!response.ok) throw new Error('Failed to fetch service data');

                const serviceData = await response.json();
                if (serviceData.success) {
                  return { ...quote, servicedata: serviceData?.service?.type };
                }
              } catch (error) {
                console.error('Error fetching service data:', error);
              }

              return quote;
            })
          );

          setNotifications(updatedQuotes);
        } else {
          console.error('Error fetching notifications:', data?.message);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Close notifications when clicking outside the notification box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
        
      }
    };
   
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-20" ref={notificationRef}>
      <button
        className="rounded-full bg-white text-gold-500 p-2 border border-gray-300 focus:outline-none"
        onClick={() =>{ setShowNotifications(!showNotifications) ,setRingOff(false)}}
      >
        {/* Change icon and add animation when there are notifications */}
        {notifications.length > 0 ? (
          <>
          {ringOff ? (
            <BellRing
            color='#FFCE00'
            className={`h-5 w-5 ${notifications.length > 0 ? 'animate-ring' : ''}`} // Add animation class
            />
          ):(<Bell color='#000000' className="h-5 w-5" />)}
          </>
        ) : (
          <Bell color='#000000' className="h-5 w-5" />
        )}
      </button>

      {showNotifications && (
        <>
          {/* Notification Box */}
          <div className="absolute hidden md:block right-0 mt-2 w-80 max-w-full bg-white border border-gold-500 rounded-lg shadow-lg sm:max-w-xs">
            <div className="p-4">
              <h3 className="text-lg font-bold text-gold-500">Notifications</h3>
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className={`animate-spin h-5 w-5 `}
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.414 1.414C8.204 18.047 10.042 18 12 18v-4c-1.506 0-2.933.432-4.14 1.172L6 17.291z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <ul className="mt-2 space-y-2">
                  {notifications?.length > 0 ? (
                    notifications.map((notification) => (
                      <li
                        key={notification?.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        onClick={() => { 
                          router.push('/tradesperson/leads'), 
                          setShowNotifications(false) }}
                      >
                        <p className="text-sm font-medium">{notification?.servicedata}</p>
                        <p className="text-xs text-gray-500">Postcode: {notification?.job?.job?.postcode || 'No Postcode'}</p>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No new notifications</p>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Mobile Notification Box */}
          <div className="absolute block md:hidden right-0 mt-2 bg-white border border-gold-500 rounded-lg shadow-lg sm:max-w-xs">
            <div className="p-4">
              <h3 className="text-lg font-bold text-gold-500">Notifications</h3>
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className={`animate-spin h-5 w-5`}
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.414 1.414C8.204 18.047 10.042 18 12 18v-4c-1.506 0-2.933.432-4.14 1.172L6 17.291z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <ul className="mt-2 space-y-2">
                  {notifications?.length > 0 ? (
                    notifications?.map((notification) => (
                      <li
                        key={notification?.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        onClick={() => { router.push('/tradesperson/request-quotes'), setShowNotifications(false) }}
                      >
                        <p className="text-sm font-medium truncate">{notification?.servicedata || 'No Service Type'}</p>
                        <p className="text-xs text-gray-500">Postcode: {notification?.job?.job?.postcode || 'No Postcode'}</p>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No new notifications</p>
                  )}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;

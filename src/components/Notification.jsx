"use client";
import { useState, useEffect, useRef } from "react";
import { BellIcon } from "lucide-react";
import { toast } from "react-toastify";

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const notifications = [
    // { id: 1, title: "Notification 1", details: "Details of notification 1" },
    // { id: 2, title: "Notification 2", details: "Details of notification 2" },
    // { id: 3, title: "Notification 3", details: "Details of notification 3" },
    // { id: 4, title: "Notification 4", details: "Details of notification 4" },
    // { id: 5, title: "Notification 5", details: "Details of notification 5" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-20" ref={notificationRef}>
      <button
        className="rounded-full bg-white text-gold-500 p-2 border border-gray-300 focus:outline-none"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <BellIcon className="h-5 w-5" />
      </button>

      {showNotifications && (
        <>
          <div className="absolute hidden md:block right-0 mt-2 w-80 max-w-full bg-white border border-gold-500 rounded-lg shadow-lg sm:max-w-xs">
            <div className="p-4">
              <h3 className="text-lg font-bold text-gold-500">Notifications</h3>
              <ul className="mt-2 space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={
                      () =>
                        toast.info(notification.details, {
                          position: "top-right",
                        })
                      // alert(notification.details)
                    }
                  >
                    <p className="text-sm font-medium">{notification.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="absolute block md:hidden right-0 mt-2 bg-white border border-gold-500 rounded-lg shadow-lg sm:max-w-xs">
            <div className="p-4">
              <h3 className="text-lg font-bold text-gold-500">Notifications</h3>
              <ul className="mt-2 space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={
                      () =>
                        toast.info(notification.details, {
                          position: "top-right",
                        })
                      //alert(notification.details)
                    }
                  >
                    <p className="text-sm font-medium">{notification.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;

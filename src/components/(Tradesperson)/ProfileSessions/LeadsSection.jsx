'use client'
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MapPin, ChevronRight, Edit3 , DeleteIcon } from 'lucide-react';
import { getUserDetails } from '../../../actions/auth';
import Spinner from '../../Spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

import "../barstyle.css";
import { toast } from "react-toastify";

const LeadsSettingsSection = ({ setCompleted }) => {
  const inputRef = useRef(null);
  const [userData, setUserData] = useState();
  const [userDetails, setUserDetails] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [services, setServices] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [distance, setDistance] = useState("5");
  const [background, setBackground] = useState("");
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const openServiceDialog = () => setShowServiceDialog(true);
  const closeServiceDialog = async () => {
    setLoading(true);
    const jwt = await getUserDetails();
    try {
      const response = await fetch("/api/save-trade-service", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          'Authorization': `Bearer ${jwt?.token}`,
        },
        body: JSON.stringify({
          serviceId: selectedService,
          userId: userData.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message, {
          position: "top-right",
        });
        //alert(data.message)
      }

      const data = await response.json();
      if (data.success) {
        
        setLoading(false);
        getUser();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
    setShowServiceDialog(false);
  };
  const openLocationDialog = () => setShowLocationDialog(true);
  const closeLocationDialog = async () => {
    const jwt = await getUserDetails();
    
    try {
      const response = await fetch("/api/save-trade-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
          'Authorization': `Bearer ${jwt?.token}`,
        },
        body: JSON.stringify({
          postcode: selectedLocation,
          distance: distance,
          userId: userData.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message, {
          position: "top-right",
        });
        //alert(data.message);
      }

      const data = await response.json();
      if (data.success) {
        
        setLoading(false);
        getUser();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
    setShowLocationDialog(false);
  };

  useEffect(() => {
    setBackground(
      `linear-gradient(to right, #FFD700 0%, #FFD700 ${
        distance * 10
      }%, #F0F0F0 ${distance * 10}%, #F0F0F0 100%)`
    );
  }, [distance]);

  useEffect(() => {
    const getServices = async () => {
      const jwt = await getUserDetails();
      try {
        const response = await fetch("/api/services");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setServices(result.services);
        setFilteredServices(result.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    getServices();
  }, []);

  useEffect(() => {
    const filtered = searchTerm
      ? services.filter((service) =>
          service.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredServices(filtered);
    setHighlightedIndex(-1);
  }, [searchTerm, services]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(!!e.target.value);
  };

  const handleSelectService = (service) => {
    setSelectedService(service.id);
    setSearchTerm(service.type);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (showDropdown) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredServices.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        e.preventDefault();
        handleSelectService(filteredServices[highlightedIndex]);
      }
    }
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [showDropdown, highlightedIndex, filteredServices]);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowDropdown(false);
    }
  };

  const getUser = async () => {
    const user = await getUserDetails();
    setUserData(user);
    //   console.log(user)
    const effectiveUserId = user?.id;
    if (!effectiveUserId) return;

    try {
      const response = await fetch(`/api/get-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ id: effectiveUserId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.success) {
        //    console.log(data.user)
        setUserDetails(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    try {
      const response = await fetch(
        `/api/save-trade-service?userId=${effectiveUserId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" ,
            'Authorization': `Bearer ${user?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.success) {
        //    console.log(data.services)
        setServicesList(data.services);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    try {
      const response = await fetch(
        `/api/save-trade-location?userId=${effectiveUserId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" ,
            'Authorization': `Bearer ${user?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.success) {
        
        setLocationList(data.tradeLocations);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const deleteTradeService = async (id) => {
    const jwt = await getUserDetails();
    try {
      const response = await fetch(`/api/save-trade-service?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",
          'Authorization': `Bearer ${jwt?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.success) {
        
        getUser();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const deleteTradeLocation = async (id) => {
    const jwt = await getUserDetails();
    try {
      const response = await fetch(`/api/save-trade-location?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" ,
          'Authorization': `Bearer ${jwt?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      if (data.success) {
  
        getUser();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      {/* Service Dialog */}
      <Dialog
        open={showServiceDialog}
        onOpenChange={closeServiceDialog}
        className="relative z-60"
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col">
              <DialogTitle>Add a Service</DialogTitle>
              <DialogDescription className="text-xs mt-2">
                Please provide details for the new service you want to add.
              </DialogDescription>
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <label
                    htmlFor="service-type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service
                  </label>
                  <div className="relative">
                    <input
                      id="service-search"
                      name="service-search"
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="What services are you looking for?"
                      className="w-full px-4 py-2 text-xs border-none focus:ring-0 middle"
                      onFocus={() => setShowDropdown(true)}
                      onBlur={handleBlur}
                      ref={inputRef}
                      autoComplete="off"
                    />
                    {showDropdown && (
                      <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full max-w-md z-10">
                        {filteredServices.length > 0 ? (
                          filteredServices.map((service, index) => (
                            <div
                              key={service.id}
                              onMouseDown={() => handleSelectService(service)}
                              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                                selectedService === service.id
                                  ? "bg-gray-200"
                                  : ""
                              } ${
                                highlightedIndex === index ? "bg-gray-300" : ""
                              }`}
                            >
                              {service.type}
                            </div>
                          ))
                        ) : (
                          <></>
                          // <div className="p-2 text-gray-500">No services found</div>
                        )}
                      </div>
                    )}
                    <ChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 bg-[#FFCE00] w-full text-black px-4 py-2 rounded-md flex justify-center items-center"
                  onClick={closeServiceDialog}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : " Add Service"}
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Location Dialog */}
      <Dialog
        open={showLocationDialog}
        onOpenChange={closeLocationDialog}
        className="relative z-60"
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col">
              <DialogTitle>Add a Location</DialogTitle>
              <div className="mt-4 space-y-4">
                <div className="relative ">
                  <label
                    htmlFor="service-type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="flex items-center">
                    <MapPin className="absolute left-3 mt-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      id="location-name"
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      placeholder="Post Code"
                      className="w-full pl-10 p-2 border border-gray-300 bg-gray-100 rounded-md mt-1"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="distance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Distance
                  </label>
                  <div className="relative w-full h-10">
                    <input
                      type="range"
                      id="distance"
                      min="0"
                      max="10"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className={`slider w-full`}
                      style={{ background }}
                    />
                    <div
                      className={`marker`}
                      style={{ left: `${(distance / 10) * 100}%` }}
                    >
                      <div className={`tooltip`}>{distance} miles</div>
                    </div>
                  </div>
                </div>
                <button
                  className="mt-4 bg-[#FFCE00] w-full text-black px-4 py-2 rounded-md flex justify-center items-center"
                  onClick={closeLocationDialog}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Add Location"}
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold">Your Services</h3>
          <span className="text-xs mb-4 block">
            Customize the leads you want to be notified about.
          </span>
          <section className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-2 ">
              <div className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-white hover:bg-gray-100 transition-colors duration-150 ease-in-out">
                <div>
                  <h3 className="text-lg font-semibold">
                    {userDetails?.trade}
                  </h3>
                  <p className="text-sm text-gray-500"> Main Trade</p>
                </div>
              </div>
              {servicesList.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-white hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {service.Service.type}
                    </h3>
                    <p className="text-sm text-gray-500">{index + 1} Service</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      deleteTradeService(service.id);
                    }}
                  >
                    <DeleteIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </section>
          <div>
            <button
              onClick={openServiceDialog}
              className="text-md font-semibold hover:bg-gray-200 px-4 py-2 rounded-lg mt-2"
              type="button"
            >
              + Add a Service
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold">Your Location</h3>
          <span className="text-xs mb-4 block">
            Choose where you want to find new customers.
          </span>
          <section className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-white hover:bg-gray-100 transition-colors duration-150 ease-in-out">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                  <div>
                    <h3 className="text-md font-semibold">
                      Postcode {userDetails?.postcode}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {userDetails?.distance} Miles
                    </p>
                  </div>
                </div>
              </div>
              {locationList.map((location, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-white hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                >
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <h3 className="text-md font-semibold">
                        Postcode {location.postcode}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {location.distance} Miles
                      </p>
                    </div>

                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      deleteTradeLocation(location.id);
                    }}
                  >
                    <DeleteIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              ))}

            </div>
          </section>
          <div>
            <button
              onClick={openLocationDialog}
              className="text-md font-semibold hover:bg-gray-200 px-4 py-2 rounded-lg mt-2"
              type="button"
            >
              + Add a Location
            </button>
          </div>
        </section>

        <section className="flex justify-between w-full">
          <Link
            href={"/tradesperson/leads"}
            className="bg-yellow-500 text-black px-3 py-2 rounded-md text-md font-bold"
          >
            View Leads
          </Link>
          <button
            onClick={() => {
              setCompleted(true);
            }}
            className="bg-gray-200 text-black px-3 py-2 rounded-md text-md font-bold ml-2"
            type="button"
          >
            Save
          </button>
        </section>
      </div>
    </>
  );
};

export default LeadsSettingsSection;

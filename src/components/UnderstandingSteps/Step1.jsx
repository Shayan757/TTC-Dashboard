'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import serviceIcon from '../../app/assets/step1.svg';
import { MapPin } from 'lucide-react';
import {getUserDetails} from '../../actions/auth'
import Spinner from '../Spinner';
const Step1 = ({ data, handleChange , loading}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(data.services || '');
  const [services, setServices] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

    // Fetch services from the API and set them
    useEffect(() => {
      const getServices = async () => {
        const jwt = await getUserDetails();
        try {
          const response = await fetch('/api/services');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();

          setServices(result.services);
          setFilteredServices(result.services); // Initialize with all services
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      };

      getServices();
    }, []);

    // Filter services based on search term
    useEffect(() => {
      const filtered = searchTerm
        ? services.filter((service) =>
            service.type.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];
        
      setFilteredServices(filtered);
      // Show dropdown if searchTerm is not empty
      setHighlightedIndex(-1); // Reset highlighted index when search term changes
    }, [searchTerm, services]);

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setShowDropdown(!!searchTerm);
    };

    const handleSelectService = (service) => {
      setSelectedService(service.id);
      setSearchTerm(service.type); // Set the selected service name in the input
      handleChange({ target: { name: 'services', value: service.id } });
      setShowDropdown(false); // Hide the dropdown after selection
    };


    const handlePostcodeChange = (e) => {
      const { name, value } = e.target;
      handleChange({ target: { name, value } });
    };

    const handleKeyDown = (e) => {
      if (showDropdown) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlightedIndex((prevIndex) =>
            Math.min(prevIndex + 1, filteredServices.length - 1)
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
          e.preventDefault();
          handleSelectService(filteredServices[highlightedIndex]);
          setShowDropdown(false); // Hide the dropdown after selection
        }
      }
    };

    useEffect(() => {
      const inputElement = inputRef.current;
      if (inputElement) {
        inputElement.addEventListener('keydown', handleKeyDown);
      }
      return () => {
        if (inputElement) {
          inputElement.removeEventListener('keydown', handleKeyDown);
        }
      };
    }, [showDropdown, highlightedIndex, filteredServices]);

    const handleBlur = (e) => {
      // Only hide the dropdown if the related target is not inside the component
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setShowDropdown(false);
      }
    };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 relative">
      <Image src={serviceIcon} alt="Service Icon" width={100} height={100} />
      <div className="text-left w-full">
        <label htmlFor="service-search" className="text-md font-semibold text-gray-700">
          What type of services do you require?
        </label>
      </div>
      <div className="flex flex-col items-stretch w-full max-w-md relative">
        {loading ? 
      <div style={{margin:'0 auto'}} >
      <Spinner />
      </div>
      :  
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-1">
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
            autoComplete="off" // Added to hide input suggestion
          />
          <div className="flex items-center border-l border-gray-300 pl-4">
            <MapPin className="text-gray-400 h-4 w-4 mr-2" />
            <input
              id="postcode"
              name="postcode"
              type="text"
              placeholder="Postal Code"
              onChange={handlePostcodeChange}
              className="w-24 text-xs border-none focus:ring-0 middle"
              autoComplete="off" // Added to hide input suggestion
            />
          </div>
        </div>
      }
        {showDropdown && (
          <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full max-w-md z-10">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  onMouseDown={() => handleSelectService(service)}
                  className={`cursor-pointer p-2 hover:bg-gray-100 ${
                    selectedService === service.id ? 'bg-gray-200' : ''
                  } ${highlightedIndex === index ? 'bg-gray-300' : ''}`}
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
      </div>
      <div className="text-left w-full">
        <p className="text-gray-500 text-xs">e.g. Plumber, Carpenter, Electrician</p>
      </div>
    </div>
  );
};

export default Step1;

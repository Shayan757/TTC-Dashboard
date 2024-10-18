'use client'
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../../components/Spinner';
import {getUserDetails} from '../../actions/auth'
import userimg from '../../app/assets/userImage.png'
const ProfileForm = ({ userData }) => {
  const [image, setImage] = useState(userimg);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userData) {
      setImage(userData.profileUrl || userimg);
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setEmail(userData.email || '');
      setPhone(userData.phone || '');
    }
  }, [userData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setIsChanged(true);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setIsChanged(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage('');
    const jwt = await getUserDetails();
    try {
      const response = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt?.token}`,
         },
        body: JSON.stringify({ id: userData.id, firstName, lastName, profileUrl: image }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatusMessage('Profile updated successfully.');
        setIsChanged(false);
      } else {
        setStatusMessage(`Failed to update profile: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setStatusMessage('Error updating profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button type="button" onClick={handleImageClick} className="focus:outline-none">
          <Image
            src={image}
            alt="Profile Picture"
            className="rounded-full h-20 w-20 border-2 border-yellow-500"
            width={80}
            height={80}
          />
        </button>
        <div className="ml-4">
          <h1 className="text-xl font-semibold">{firstName} {lastName}</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              className="mt-1 block w-full bg-gray-100 py-4 px-3 text-xs border border-gray-50 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              className="mt-1 block w-full bg-gray-100 py-4 px-3 text-xs border border-gray-50 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block font-semibold text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              className="mt-1 block w-full py-4 px-3 text-xs bg-gray-100 text-gray-400 border border-gray-300 rounded-lg ring-gray-400  order-gray-400 focus:ring-gray-300 focus:border-gray-300"
              placeholder='Email'
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold text-sm font-medium text-gray-400">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={phone ? phone : ''}
              className="mt-1 block w-full py-4 px-3 text-xs bg-gray-100 text-gray-400 border border-gray-300 rounded-lg ring-gray-400  order-gray-400 focus:ring-gray-300 focus:border-gray-300"
              placeholder='Phone Number'
              readOnly
            />
          </div>
        </div>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
        {/* {isChanged && ( */}
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-500"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Save Changes'}
            </button>
          </div>
        {/* )} */}
      </form>
      {statusMessage && (
        <div className="mt-4 text-sm text-yellow-500">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default ProfileForm;

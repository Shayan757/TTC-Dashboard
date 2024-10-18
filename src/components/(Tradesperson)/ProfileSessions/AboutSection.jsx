'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../../Spinner';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { getUserDetails } from '../../../actions/auth';
import editImage from '../../../app/assets/editImage.jpg'

import Select from 'react-select';

const ProfileForm = ({ setCompleted }) => {
  const [userData, setUserData] = useState();
  const [profileImage, setProfileImage] = useState();
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [companyLogo, setCompanyLogo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [businessYears, setBusinessYears] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [isCompanyOwner, setIsCompanyOwner] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusMessageSuccess, setStatusMessageSuccess] = useState('');

  const profileImageRef = useRef(null);
  const portfolioImageRef = useRef(null);
  const companyLogoRef = useRef(null);

  const companySizeOptions = [
    { value: '', label: 'Select your company size' },
    { value: '1-10', label: '1-10' },
    { value: '11-50', label: '11-50' },
    { value: '51-200', label: '51-200' },
    { value: '201-500', label: '201-500' },
    { value: '500+', label: '500+' },
  ];
  

useEffect(() => {
  const getUser = async () => {
    const user = await getUserDetails();
    setUserData(user)
    const effectiveUserId = user?.id;
    if (!effectiveUserId) return;

    try {
      const response = await fetch('/api/get-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ id: effectiveUserId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
        setProfileImage(data.user.profileUrl);
        setFirstName(data.user.firstName || '');
        setLastName(data.user.lastName || '');
        setEmail(data.user.email || '');
        setPhone(data.user.phone || '');
        setDescription(data.user.introduction || '')
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    
    try {
      const response = await fetch(`/api/update-tradeperson?id=${effectiveUserId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      if (data.success) {
      //  console.log(data.data.info)
       setPortfolioImages(data.data.info.portfolioUrls || '');
       setCompanyLogo(data.data.info.companyLogoUrl || '');
       setBusinessYears(data.data.info.businessYears || '');
       setCompanyDescription(data.data.info.companyDescription || '');
       setCompanyEmail(data.data.info.companyEmail || '');
       setCompanyLocation(data.data.info.companyLocation || '');
       setCompanyName(data.data.info.companyName || '');
       setCompanyPhone(data.data.info.companyPhone || '');
       setCompanySize(data.data.info.companySize || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }


  };

  getUser();
}, []);


  


  const handleImageChange = (event, setImage) => {
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

  const handlePortfolioImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setPortfolioImages((prevImages) => [...prevImages, ...newImages].slice(0, 4)); // Limit to 4 images
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageClick = (ref) => {
    ref.current.click();
  };

  const handleRemovePortfolioImage = (index) => {
    setPortfolioImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setIsChanged(true);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   setStatusMessage('');

  //   const formData = {
  //     id: userData?.id,
  //     firstName,
  //     lastName,
  //     description,
  //     email,
  //     phone,
  //     profileUrl: profileImage,
  //     portfolioUrls: portfolioImages,
  //     companyLogoUrl: companyLogo,
  //     companyName,
  //     companyEmail,
  //     companyPhone,
  //     companyLocation,
  //     companySize,
  //     businessYears,
  //     companyDescription,
  //   };
  //   try {
  //     const response = await fetch('/api/update-profile', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ id: userData.id, firstName, lastName, profileUrl: profileImage  , introduction: description}),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       // setStatusMessage('Profile updated successfully.');
  //       setIsChanged(false);
  //     } else {
  //       setStatusMessage(`Failed to update profile: ${data.message}`);
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     setStatusMessage('Error updating profile. Please try again.');
  //   }
  //   try {

  //     const response = await fetch('/api/update-tradeperson', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userId: userData.id, info:formData  }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch user data');
  //     }

  //     const data = await response.json();
  //     if (data.success) {
  //       console.log(data)
  //       setStatusMessage('Updating About Info.');
  //       // setUserData(data.user);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   } finally {
  //     setIsLoading(false);
  //     setCompleted(true);
  //   }


  // };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    const formData = {
      id: userData?.id,
      firstName,
      lastName,
      description,
      email,
      phone,
      profileUrl: profileImage,
      portfolioUrls: portfolioImages,
      companyLogoUrl: companyLogo,
      companyName,
      companyEmail,
      companyPhone,
      companyLocation,
      companySize,
      businessYears,
      companyDescription,
    };
  
    // Validation
    const errors = {};
    if (!firstName || !lastName || !email ) {
      setStatusMessage('First name, last name, and email are required.');
      setStatusMessageSuccess('')
      setIsLoading(false);
      return;
    }
    
    if (isCompanyOwner) {
      if (!companyName || !companyEmail || !companyPhone || !companyLocation || !companySize || !businessYears || !companyDescription) {
        setStatusMessage('All company details are required.');
        setStatusMessageSuccess('')
        setIsLoading(false);
        return;
      }
    }
  
    // if (Object.keys(errors).length > 0) {
    //   setStatusMessage('Please fill out all required fields.');
    //   setIsLoading(false);
    //   return;
    // }
  
    try {
      // Update user profile
      const jwt = await getUserDetails();
      const userProfileResponse = await fetch('/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt?.token}`,
        },
        body: JSON.stringify({
          id: userData.id,
          firstName,
          lastName,
          profileUrl: profileImage,
          introduction: description,
        }),
      });
  
      const userProfileData = await userProfileResponse.json();
      if (!userProfileResponse.ok) {
        setStatusMessage(`Failed to update profile: ${userProfileData.message}`);
        setStatusMessageSuccess('')
        setIsLoading(false);
        return;
      }
  
      // Update tradeperson info
      const tradepersonResponse = await fetch('/api/update-tradeperson', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt?.token}`,
        },
        body: JSON.stringify({ userId: userData.id, info: formData }),
      });
  
      const tradepersonData = await tradepersonResponse.json();
      if (tradepersonData.success) {
        setStatusMessageSuccess('Information updated successfully.');
        setCompleted(true);
        setStatusMessage('');
        setIsLoading(false);
      } else {
        setStatusMessage('Failed to update tradeperson information.');
        statusMessageSuccess('')
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error updating profile or tradeperson info:', error);
      setStatusMessage('Error updating profile. Please try again.');
      statusMessageSuccess('')
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setCompleted(true);
    }
  };
  
  return (
    <div className="space-y-8">
      <section className=''>
        <h3 className="text-xl font-semibold">Name & Profile Picture</h3>
        <span className="text-xs mb-4 block">This is the person who will be communicating with customers on The Trade Core. The photo will appear alongside your messages with customers.</span>
        <label className="block font-semibold text-sm font-medium text-gray-700 my-2">Profile Picture</label>
        <div className="flex items-left justify-left mb-6">
          <button type="button" onClick={() => handleImageClick(profileImageRef)} className="focus:outline-none">
            <Image
              src={profileImage || editImage}
              alt="Profile Picture"
              className="rounded-full h-24 w-24 md:w-20 md:h-20 border-2 border-yellow-500"
              width={96}
              height={96}
            />
          </button>
        </div>
     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
              placeholder="Enter Your First Name"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
              placeholder="Enter Your Last Name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-6">
          <div>
            <label className="block font-semibold text-sm font-medium text-black-400">Your Introduction</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
              placeholder="Describe yourself here..."
            />
          </div>
        </div>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={(e) => handleImageChange(e, setProfileImage)}
          className="hidden"
          ref={profileImageRef}
        />
      </section>
   
      <section>
        <h3 className="text-xl font-semibold mt-4">Add Portfolio</h3>
        <span className="text-xs mb-4 block">Add your previous work to build trust for your customers. You can add up to 4 images.</span>
        <div className="flex flex-wrap gap-4 mb-6">
          {portfolioImages.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt={`Portfolio Image ${index + 1}`}
                className="rounded-md h-24 w-24 md:w-20 md:h-20 border-2 border-yellow-500"
                width={96}
                height={96}
              />
              <button
                type="button"
                onClick={() => handleRemovePortfolioImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                &times;
              </button>
            </div>
          ))}
          {portfolioImages.length < 4 && (
            <button
              type="button"
              onClick={() => handleImageClick(portfolioImageRef)}
              className="flex items-center justify-center w-24 h-24 md:w-20 md:h-20 border-2 border-yellow-500 rounded-md text-gray-600 bg-gray-100"
            >
              +
            </button>
          )}
        </div>
        <input
          type="file"
          name="portfolioImages"
          accept="image/*"
          onChange={handlePortfolioImageChange}
          multiple
          className="hidden"
          ref={portfolioImageRef}
        />
      </section>
   
      <div className="flex items-center mb-6">
        <Label htmlFor="company_owner" className="font-semibold">Are you a company owner?&nbsp;&nbsp;</Label>
        <Switch id="company_owner" checked={isCompanyOwner} onCheckedChange={setIsCompanyOwner} />
      </div>
   
      {isCompanyOwner && (
        <section>
          <section>
            <h3 className="text-xl font-semibold mt-4">Company Name & Logo</h3>
            <span className="text-xs mb-4 block">This is the first thing customers will see when searching for professionals. As a sole-trader, you can just enter your name.</span>
            <label className="block font-semibold text-sm font-medium text-gray-700 my-2">Company Logo</label>
            <div className="flex items-left justify-left mb-6">
              <button type="button" onClick={() => handleImageClick(companyLogoRef)} className="focus:outline-none">
                <Image
                  src={companyLogo || editImage}
                  alt="Company Logo"
                  className="rounded-full h-24 w-24 md:w-20 md:h-20 border-2 border-yellow-500"
                  width={96}
                  height={96}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
                  placeholder="Enter your company name"
                />
              </div>
            </div>
            <input
              type="file"
              name="companyLogo"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setCompanyLogo)}
              className="hidden"
              ref={companyLogoRef}
            />
          </section>

          <section>
            <h3 className="text-xl font-semibold mt-4">Company Contact Details</h3>
            <span className="text-xs mb-4 block">This information will be seen by customers on the Trade Core.</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">Company Email</label>
                <input
                  type="email"
                  name="companyEmail"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
                  placeholder="Enter your company email address"
                />
              </div>
              <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="number"
                  name="companyPhone"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">Company Location</label>
                <input
                  type="text"
                  name="companyLocation"
                  value={companyLocation}
                  onChange={(e) => setCompanyLocation(e.target.value)}
                  className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
                  placeholder="Enter your company location"
                />
                <span className="block text-xs text-gray-700">ⓘ This will not affect the areas where you offer or provide services.</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mt-4">About Company</h3>
            <span className="text-xs mb-4 block">Introduce the company to your customers.</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">Company Size</label>
                {/* <select
                  name="companySize"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
                >
                  <option value="">Select your company size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select> */}
                <Select
                value={companySizeOptions.find(option => option.value === companySize)}
                onChange={(selectedOption) => setCompanySize(selectedOption ? selectedOption.value : '')}
                options={companySizeOptions}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: '#F0F0F0',
                    borderColor: '#F0F0F0',
                    borderRadius: '0.5rem',
                    marginTop: '5px',
                    padding: '0.25rem',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: 'gray-300',
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#FFD700' : '#FFF',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#FFD700',
                      color: '#FFF',
                    },
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: '#000',
                  }),
                }}
                placeholder="Select your company size"
              />
              </div>
              <div>
                <label className="block font-semibold text-sm font-medium text-gray-700">Years in Business</label>
                <input
                  type="number"
                  name="businessYears"
                  value={businessYears}
                  onChange={(e) => setBusinessYears(e.target.value)}
                  className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
                  placeholder="Enter number of years"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div>
                <label className="block font-semibold text-sm font-medium text-black-400">About Your Company</label>
                <textarea
                  name="companyDescription"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  rows={8}
                  className="mt-1 block w-full py-3 px-3 text-sm bg-gray-100 text-gray-900 border border-gray-100 rounded-lg focus:ring-gray-300 focus:border-gray-300"
                  placeholder="Describe your company here..."
                />
              </div>
            </div>
          </section>
        </section>
      )}
      <div className="flex justify-between">
      
      <>
      {statusMessage && (
        <div className="mt-4 text-sm w-full text-red-500">
          {statusMessage}
        </div>
      )}
       {statusMessageSuccess && (
        <div className="mt-4 text-sm w-full text-green-500">
          {statusMessageSuccess}
        </div>
      )}
      </>
      <section className="flex w-full justify-end">
        
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-200"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Save'}
        </button>
      </section>

      </div>
    </div>
  );
};

export default ProfileForm;

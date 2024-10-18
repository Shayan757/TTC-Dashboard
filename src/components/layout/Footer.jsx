'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { generateToken } from '../../utils/functions';
import Copyright from './Copyright';
import Spinner from '../Spinner';
import fullLogo from '../../app/assets/full-logo-bleck.webp';
import facebook from '../../app/assets/facebook.webp';
import Pin from '../../app/assets/Pinterest.webp';
import insta from '../../app/assets/Instagram.webp';
import linkedin from '../../app/assets/LinkedIn.webp';
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const token = await generateToken();

    try {
      const response = await fetch(`/api/email-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Successfully subscribed!', {
          position: "top-right",
        });
        setEmail('');
      } else if (response.status === 409) {
        toast.info(result.message || 'Email is already subscribed.', {
          position: "top-right",
        });
      } else {
        toast.warning(result.message || 'Something went wrong. Please try again.', {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again later.', {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-6">
      <div className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0 md:w-[30%]">
              <Link href="https://thetradecore.com/">
                <Image src={fullLogo} alt="logo" />
              </Link>
              <p className="mt-2 text-left text-sm w-60 md:w-full">
                The Trade Core is a go-to platform for connecting with top-rated tradespeople in your area.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.facebook.com/thetradecore/" className="text-[#FFCE00] hover:text-gray-400">
                  <Image src={facebook} className="w-10" alt="facebook" />
                </a>
                <a href="https://www.pinterest.co.uk/thetradecore/" className="text-[#FFCE00] hover:text-gray-400">
                  <Image src={Pin} alt="Pinterest" className="w-10" />
                </a>
                <a href="https://www.instagram.com/thetradecore.official/" className="text-[#FFCE00] hover:text-gray-400">
                  <Image src={insta} alt="Instagram" className="w-10" />
                </a>
                <a href="https://www.linkedin.com/company/thetradecore" className="text-[#FFCE00] hover:text-gray-400">
                  <Image src={linkedin} alt="LinkedIn" className="w-10" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col md:w-72 justify-between md:flex-row md:space-x-8 mb-6 md:mb-0 text-left">
              <div>
                <ul>
                  <li className="mb-2">
                    <a href="https://thetradecore.com/how-it-works/" className="hover:text-gray-400 text-sm">How it works</a>
                  </li>
                  <li className="mb-2">
                    <a href="https://thetradecore.com/about/" className="hover:text-gray-400 text-sm">About Us</a>
                  </li>
                  <li className="mb-2">
                    <a href="https://thetradecore.com/help-center/" className="hover:text-gray-400 text-sm">Help Center</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li className="mb-2">
                    <a href="https://thetradecore.com/blogs/" className="hover:text-gray-400 text-sm">Blog</a>
                  </li>
                  <li className="mb-2">
                    <a href="https://thetradecore.com/quality-standard/" className="hover:text-gray-400 text-sm">Quality Standards</a>
                  </li>
                  <li className="mb-2">
                    <a href={`${process.env.NEXT_PUBLIC_URL}/login/tradesperson/signup`} className="hover:text-gray-400 text-sm">
                      Tradesperson
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-left md:w-[30%]">
              <h3 className="text-lg md:text-2xl mb-6">Get daily updates, subscribe now!</h3>
              <form className="flex flex-col md:flex-row gap-1" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="p-2 rounded-sm h-12 bg-black border-[#9EA9AA] text-medium border focus:outline-none w-full md:w-60 mb-1 md:mb-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="bg-[#FFCE00] text-black px-4 py-2 rounded-sm font-bold hover:bg-yellow-600" disabled={loading}>
                  {loading ? <Spinner /> : 'Subscribe'}
                </button>
              </form>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 bg-[#f2f5f6] block md:hidden">
        <div className="flex flex-col md:flex-row justify-between text-black text-sm">
          <div className="p-10">
            <ul className="mb-4">
              <li>
                <a href="https://thetradecore.com/privacy-policy/" className="mx-2">Privacy Policy</a>
              </li>
              <li>
                <a href="https://thetradecore.com/cookies-policy/" className="mx-2">Cookies Policy</a>
              </li>
              <li>
                <a href="https://thetradecore.com/terms-and-conditions/" className="mx-2">Terms & Conditions</a>
              </li>
            </ul>
            <p>© Copyright 2024, The Trade Core. All Rights Reserved</p>
          </div>
        </div>
      </div>
      <div className="bg-transparent py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Copyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

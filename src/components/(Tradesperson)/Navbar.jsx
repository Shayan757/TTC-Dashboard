"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import Notification from "../../components/(Tradesperson)/Notification";
import Image from 'next/image';
import fullLogo from '../../app/assets/TTC - Logo Wide.webp';
import Logo from '../../app/assets/logo.png';
import { getUserDetails, logout } from '../../actions/auth';
import { useRouter } from 'next/navigation';
const Navbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState();
    const [user, setUser] = useState();
    const [userProfile, setUserProfile] = useState();
    const [userSubscription, setUserSubscription] = useState('...');

    const [SubscriptionType, SetSubscriptionType] = useState("Free");


    const getUserUsingId = async (id) => {
        const jwtuser = await getUserDetails();
        try{
            const response = await fetch('/api/get-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                     'Authorization': `Bearer ${jwtuser?.token}`,
                },
                body: JSON.stringify({ id: id }),
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch user data');
              }
      
              const data = await response.json();
              if (data.success) {
                if(data.user.SubscriptionType.type == "Deactivate"){
                    router.push('/tradesperson/subscription')
                  }
                  SetSubscriptionType(data.user.SubscriptionType.type)
                setUserProfile(data.user.profileUrl)
                setUserSubscription(data.user.type)
              }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        // Check if the user is logged in when the component mounts
        const fetchUserDetails = async () => {
            const userDetails = await getUserDetails();
            if (userDetails) {
                // console.log("Userdetails",userDetails)
                setIsLoggedIn(true);
                setUserId(userDetails.id);
                if(userDetails.id){
                    getUserUsingId(userDetails.id);
                }
                setUser(userDetails);
                setUserName(userDetails.name || 'User');
            } else {
                setIsLoggedIn(false);
            }
        };
        fetchUserDetails();
       
    }, []); // Dependency array ensures this runs only once when the component mounts

    const handleLogout = async () => {
        localStorage.clear();
        sessionStorage.clear();
        await logout();
        setIsLoggedIn(false);
    };

    return (
        
        <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
            <div className="flex items-center">
               <Link href={'https://thetradecore.com/'}>
                <Image className='hidden md:block w-64' src={fullLogo} alt='logo' />
                <Image style={{width:'185px'}} className='block md:hidden' src={fullLogo} alt='logo' />
               </Link>
            </div>
            <div className="hidden md:flex space-x-4">
            <div className="hidden md:flex space-x-4">
                
                {/* <Link href="/tradesperson/leads" className="text-gray-700 hover:text-black">
                    Leads
                </Link> */}
                {/* <Link href="/tradesperson/subscription" className="text-gray-700 hover:text-black">
                    Subscription
                </Link> */}
                
            </div>
            </div>
            <div className="hidden md:flex space-x-3 ">
                   {SubscriptionType == "Deactivate" ? '' :
                    <div style={{margin:'auto 0'}}  className="bg-[#F2F5F6] text-black px-4 py-2 rounded-md text-sm cursor-default">
                    Current Plan: <span className='font-bold'>{userSubscription}</span>
                    </div>
                   }
                    <Link href="/tradesperson/subscription" className="bg-[#FFCE00] font-bold text-black px-8 py-2 rounded-md text-md font-medium">
                   {SubscriptionType == "Deactivate" ? 'Get Plan' : 'Change Plan'} 
                    </Link>
                    <Notification />
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={userProfile || 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg'} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            {SubscriptionType == "Deactivate" ? 
                            <DropdownMenuContent>
                           
                             <DropdownMenuSeparator />
                             <a onClick={handleLogout} >
                            <DropdownMenuItem className="text-red-900 text-sm font-medium cursor-pointer hover:bg-gray-200  rounded-lg">
                                    Log Out
                            </DropdownMenuItem>
                             </a>
                        </DropdownMenuContent>
                            :
                            <DropdownMenuContent>
                                <Link href={`/tradesperson/profile`}>
                                    <DropdownMenuLabel className="hover:bg-gray-200  rounded-lg">
                                    My Profile
                                    </DropdownMenuLabel>
                                </Link>
                                <DropdownMenuSeparator />
                                <Link href="/tradesperson/leads" >
                                <DropdownMenuItem className="text-black text-sm font-medium cursor-pointer hover:bg-gray-200  rounded-lg">
                                    Leads
                                </DropdownMenuItem>
                                </Link>
                                {/* <DropdownMenuSeparator />
                                <Link href="/tradesperson/request-quotes" >
                                <DropdownMenuItem className="text-black text-sm font-medium cursor-pointer hover:bg-gray-200  rounded-lg">
                                    Request's
                                </DropdownMenuItem>
                                </Link> */}
                                 <DropdownMenuSeparator />
                                 <a onClick={handleLogout} >
                                <DropdownMenuItem className="text-red-900 text-sm font-medium cursor-pointer hover:bg-gray-200  rounded-lg">
                                        Log Out
                                </DropdownMenuItem>
                                 </a>
                            </DropdownMenuContent>}
                        </DropdownMenu>
                    ) : (
                        <></>
                    )}
                </div>
            <div className="md:hidden flex items-center">
        <div className='p-2'>
        <Notification />
        </div>
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-black focus:outline-none">
                   <Menu />
                    {/* <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                    </svg> */}
                    
                </button>
            </div>
        </div>
        <div className={`fixed z-20 top-0 right-0 h-full w-full bg-[#F2F5F6] shadow-2xl rounded-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
           <div className='flex justify-between'>
            <div className='p-4 text-lg font-semibold'>
                <Link href={'https://thetradecore.com/'}>
                <Image className='hidden md:block max-w-full' src={fullLogo} alt='logo' />
                <Image style={{width:'185px'}} className='block md:hidden max-w-full' src={fullLogo} alt='logo' />
               </Link> 
            </div>
           <button onClick={() => setIsOpen(false)} className="text-black font-semibold flex  hover:text-black focus:outline-none absolute top-4 right-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg> 
                {isOpen ? 'Close'  : ''}
            </button>
           </div>
           {/* border-t  */}
           {SubscriptionType == "Deactivate" ? 
              <div style={{lineHeight:'12px'}} className="mt-10 text-bold space-y-4 ">
                  <Link href="/tradesperson/subscription"  onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px]  text-black ">
                  Get Plan
                  </Link>
                  <Link href={``}  onClick={handleLogout}  className="block px-4 py-2  font-bold text-[17px]  text-black ">
                    Log Out
                    </Link>
              </div>
           :
            <div style={{lineHeight:'12px'}} className="mt-10 text-bold space-y-4 ">
            
            <Link href="/tradesperson/leads" onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px] text-black ">
                    Leads
                </Link>
                <Link href="/tradesperson/subscription"  onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px]  text-black ">
                Change Plan
                </Link>
                <Link href={`/tradesperson/profile`} onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px]  text-black ">
                       Profile Settings
                    </Link>
                    <Link href={``}  onClick={handleLogout}  className="block px-4 py-2  font-bold text-[17px]  text-black ">
                    Log Out
                    </Link>
                <div className='justify-center'>
                <div style={{margin:'auto 0'}}  className="bg-white text-black px-6 py-4 w-full rounded-md text-md text-center cursor-default">

                    Current Plan: <span className='font-bold'>{userSubscription}</span>

                    </div>
                {/* {isLoggedIn ? (
                    <button onClick={handleLogout} className="block bg-[#FFCE00] font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
                        Log Out
                    </button>
                ) : (
                    <Link href="/login" className="block bg-[#FFCE00] font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
                        Log In
                    </Link>
                )} */}
                </div>
            </div>
            }
        </div>
    </nav>
    );
};

export default Navbar;

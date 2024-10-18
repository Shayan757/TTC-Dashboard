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
import Notification from "../../components/Notification";
import Image from 'next/image';
import fullLogo from '../../app/assets/TTC - Logo Wide.webp';
import Logo from '../../app/assets/logo.png';
import { getUserDetails, logout } from '../../actions/auth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState();
    const [user, setUser] = useState();
    const [userProfile, setUserProfile] = useState();

    const getUserUsingId = async (id) => {
        const jwt = await getUserDetails();
        try{
            const response = await fetch('/api/get-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt?.token}`,
                 },
                body: JSON.stringify({ id: id }),
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch user data');
              }
      
              const data = await response.json();
      
              if (data.success) {
                setUserProfile(data.user.profileUrl)
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
        // <nav className="border-b border-gray-200 bg-white">
        //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        //         <div className="flex items-center">
        //             <Image className='hidden md:block' src={fullLogo} alt='logo' />
        //             <Image className='block md:hidden' src={Logo} alt='logo' />
        //         </div>
        //         <div className="hidden md:flex space-x-4">
        //             <Link href="/user/myjobs" className="text-gray-700 hover:text-black">
        //                 My Jobs
        //             </Link>
        //             <Link href="/user/hireTradesperson" className="text-gray-700 hover:text-black">
        //                 Hire Tradesperson
        //             </Link>
        //         </div>
        //         <div className="hidden md:flex space-x-4">
        //             <Notification />
        //             {isLoggedIn ? (
        //                 <DropdownMenu>
        //                     <DropdownMenuTrigger>
        //                         <Avatar>
        //                             <AvatarImage src={userProfile || 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg'} />
        //                             <AvatarFallback>CN</AvatarFallback>
        //                         </Avatar>
        //                     </DropdownMenuTrigger>
        //                     <DropdownMenuContent>
        //                         <DropdownMenuLabel>
        //                             <Link href={`/user/profile?id=${userId}`}>Profile Setting</Link>
        //                         </DropdownMenuLabel>
        //                         <DropdownMenuSeparator />
        //                         <DropdownMenuItem>
        //                             <button onClick={handleLogout} className="text-red-900 text-sm font-medium">
        //                                 Log Out
        //                             </button>
        //                         </DropdownMenuItem>
        //                     </DropdownMenuContent>
        //                 </DropdownMenu>
        //             ) : (
        //                 <></>
        //             )}
        //         </div>
        //         <div className="md:hidden flex items-center">
        //             <div>
        //                 <Notification />
        //             </div>
        //             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-black focus:outline-none">
        //                 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
        //                 </svg>
        //             </button>
        //         </div>
        //     </div>
        //     <div className={`fixed z-10 top-0 right-0 h-full w-64 bg-[#F2F5F6] shadow-2xl rounded-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        //         <div className='flex justify-between'>
        //             <h2 className='p-4 text-lg font-semibold'>{userName}</h2>
        //             <button onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-black focus:outline-none absolute top-4 right-4">
        //                 <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        //                 </svg>
        //             </button>
        //         </div>
        //         <div className="mt-1 space-y-4 border-t border-gray-300">
        //             <Link href="/user/myjobs" className="mt-4 block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFCE00]">
        //                 My Jobs
        //             </Link>
        //             <Link href="/user/hireTradesperson" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFCE00]">
        //                 Hire Tradesperson
        //             </Link>
        //             <div className='p-4 justify-center'>
        //                 {isLoggedIn ? (
        //                     <button onClick={handleLogout} className="block bg-[#FFCE00] font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
        //                         Log Out
        //                     </button>
        //                 ) : (
        //                     <Link href="/login" className="block bg-[#FFCE00] font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
        //                         Log In
        //                     </Link>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </nav>
        <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
            <div className="flex items-center">
               <Link href={'https://thetradecore.com/'}>
                <Image className='hidden md:block w-64' src={fullLogo} alt='logo' />
                <Image style={{ width: "185px" }}className='block md:hidden' src={fullLogo} alt='logo' />
               </Link>
            </div>
            <div className="hidden md:flex space-x-4">
            <div className="hidden md:flex space-x-4">
                    {/* <Link href="/user/myjobs" className="text-gray-700 hover:text-black">
                        My Jobs
                    </Link> */}
                    {/* <Link href="/user/hireTradesperson" className="text-gray-700 hover:text-black">
                        Hire Tradesperson
                    </Link> */}
                </div>
            </div>
            <div className="hidden md:flex space-x-4">
                    <Notification />
                    {isLoggedIn ? (
                        <DropdownMenu >
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={userProfile || 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg'} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    <Link href={`/user/profile`}>Profile Setting</Link>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href="/user/myjobs" onClick={() => setIsOpen(false)} >
                                <DropdownMenuItem>
                                My Jobs
                                </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <button onClick={handleLogout} className="text-red-900 text-sm font-medium">
                                        Log Out
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
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
            <div style={{lineHeight:'12px'}} className="mt-10 text-bold space-y-4 ">

                {/* <Link href="https://thetradecore.com/how-it-works/" className="mt-4 block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFCE00]">
                    How It Works
                </Link>
                <Link href="https://thetradecore.com/about/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFCE00]">
                    About
                </Link>
                <Link href="https://thetradecore.com/help-center/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFCE00]">

                    Help Center
                </Link> */}
                  <Link href="/user/myjobs" onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px] text-black ">
                    My Jobs
                </Link>
                

                <Link href={`/user/profile`} onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px]  text-black ">

                       Profile Settings
                    </Link>
                    <Link href={``} onClick={handleLogout}  className="block px-4 py-2  font-bold text-[17px]  text-black ">

                    Log Out
                    </Link>
                <div className='justify-center'>
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
        </div>
    </nav>
    );
};

export default Navbar;



// "use client";
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Menu } from 'lucide-react';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//   } from "../../components/ui/dropdown-menu"  
// import Image from 'next/image';
// import fullLogo from '../../app/assets/full-logo.png';
// import Logo from '../../app/assets/logo.png';
// import { getUserDetails, logout } from '../../actions/auth'; 

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userName, setUserName] = useState('');

//     useEffect(() => {
//         // Check if the user is logged in when the component mounts
//         const fetchUserDetails = async () => {
//             const user = await getUserDetails();
//             if (user) {
//                 setIsLoggedIn(true);
//                 setUserName(user.name || 'User');
//             } else {
//                 setIsLoggedIn(false);
//             }
//         };

//         fetchUserDetails();
//     });

//     const handleLogout = async () => {
//         await logout();
//         setIsLoggedIn(false);
//     };

//     return (
        // <nav className="border-b border-gray-200 bg-white">
        //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        //         <div className="flex items-center">
        //            <Link href={'https://thetradecore.com/'}>
        //             <Image className='hidden md:block' src={fullLogo} alt='logo' />
        //             <Image style={{width:'185px'}} className='block md:hidden' src={fullLogo} alt='logo' />
        //            </Link>
        //         </div>
        //         <div className="hidden md:flex space-x-4">

        //             {/* <Link href="https://thetradecore.com/how-it-works/" className="text-gray-700 hover:text-black">
        //                 How It Works
        //             </Link>
        //             <Link href="https://thetradecore.com/about/" className="text-gray-700 hover:text-black">
        //                 About
        //             </Link>
        //             <Link href="https://thetradecore.com/help-center/" className="text-gray-700 hover:text-black">

        //                 Help Center
        //             </Link>
        //              */}
        //         </div>
        //         <div className="hidden md:flex space-x-4">
        //             <Link href="/login/tradesperson/as-tradeperson" className="font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
        //                 Join as a Tradesperson
                        
        //             </Link>
        //             <Link href="/login/understand" className="bg-[#FFCE00] font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
        //                 Hire Tradesperson
        //             </Link>
        //             <Link href="/login" className="font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
        //                     Log In
        //                 </Link>
        //             {/* {isLoggedIn ? (
        //                 // <div style={{lineHeight:'1px'}} className='flex flex-col px-3 py-2 rounded-md'>
        //                 //     <span className=" text-black text-xs  font-medium">
        //                 //         {userName}
        //                 //     </span>
        //                 //     <button onClick={handleLogout} className="font-semibold text-black text-sm font-medium">
        //                 //         Log Out
        //                 //     </button>
        //                 // </div>
        //                 <DropdownMenu>
        //                     <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
        //                     <DropdownMenuContent>
        //                         <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        //                         <DropdownMenuSeparator />
        //                         <DropdownMenuItem>
        //                         <button onClick={()=>handleLogout()} className="text-red-900 text-sm font-medium">
        //                         Log Out
        //                         </button>
        //                         </DropdownMenuItem>
        //                     </DropdownMenuContent>
        //                     </DropdownMenu>

        //             ) : (
        //                 <Link href="/login" className="font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
        //                     Log In
        //                 </Link>
        //             )} */}
        //         </div>
        //         <div className="md:hidden flex items-center">
        //             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-black focus:outline-none">
        //                <Menu />
        //                 {/* <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
        //                 </svg> */}
                        
        //             </button>
        //         </div>
        //     </div>
        //     <div className={`fixed z-20 top-10 right-0 h-full w-full bg-[#F2F5F6] shadow-2xl rounded-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        //        <div className='flex justify-between'>
        //         <div className='p-4 text-lg font-semibold'>
        //             <Link href={'https://thetradecore.com/'}>
        //             <Image className='hidden md:block max-w-full' src={fullLogo} alt='logo' />
        //             <Image style={{width:'185px'}} className='block md:hidden max-w-full' src={fullLogo} alt='logo' />
        //            </Link> 
        //         </div>
        //        <button onClick={() => setIsOpen(false)} className="text-black font-semibold flex  hover:text-black focus:outline-none absolute top-4 right-4">
        //             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        //             </svg> 
        //             {isOpen ? 'Close'  : ''}
        //         </button>
        //        </div>
        //        {/* border-t  */}
        //         <div style={{lineHeight:'12px'}} className="mt-10 text-bold space-y-4 ">

        //             {/* <Link href="https://thetradecore.com/how-it-works/" className="mt-4 block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFCE00]">
        //                 How It Works
        //             </Link>
        //             <Link href="https://thetradecore.com/about/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFCE00]">
        //                 About
        //             </Link>
        //             <Link href="https://thetradecore.com/help-center/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFCE00]">

        //                 Help Center
        //             </Link> */}
        //             <Link href="/login/understand" onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px] text-black ">
        //                 Post a Job for Free
        //             </Link>
        //             <Link href="/login/tradesperson/signup" onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px]  text-black ">
        //                 Tradesperson Sign up
        //             </Link>
        //             <Link href="/login" onClick={() => setIsOpen(false)}  className="block px-4 py-2  font-bold text-[17px]  text-black ">
        //                     Log In
        //                 </Link>
        //             <div className='justify-center'>
        //             {/* {isLoggedIn ? (
        //                 <button onClick={handleLogout} className="block bg-[#FFCE00] font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
        //                     Log Out
        //                 </button>
        //             ) : (
        //                 <Link href="/login" className="block bg-[#FFCE00] font-semibold text-black px-3 py-2 rounded-md text-sm font-medium">
        //                     Log In
        //                 </Link>
        //             )} */}
        //             </div>
        //         </div>
        //     </div>
        // </nav>
//     );
// };

// export default Navbar;

"use client"
import { useState } from 'react';
import { Timer, LayoutDashboard, Drill, NotebookPen, UserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../../app/assets/TTC - Logo Wide.webp'
import Link from 'next/link';
export default function Sidebar({ isOpen, toggleSidebar }) {
  const path = usePathname();
  return (
    <aside
      className={`fixed lg:static h-screen border-r inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white text-black h-full py-6 z-40`}
    >
      {/* Close button for mobile */}
      <div className="flex items-center justify-between px-4 lg:hidden">
        <Image src={logo} alt="The Trade Core" className="h-10" />
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {/* <Timer /> */}
        </button>
      </div>

      {/* Logo for large screens */}
      <div className="hidden lg:flex items-center justify-center mb-8  ">
        <Image src={logo} alt="The Trade Core" className="h-10 w-full px-3" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 px-4 text-sm mt-6 justify-center text-center">
        {path == '/dashboard' ?
          <Link href={'/dashboard'} className="bg-yellow-400 text-black  hover:bg-black hover:text-white p-3 rounded-lg font-semibold flex "><LayoutDashboard size={20} /><span className='px-2' style={{ margin: 'auto 0' }}>Dashboard</span></Link>
          :
          <Link href={'/dashboard'} className="hover:bg-black hover:text-white p-3 rounded-lg font-semibold flex "><LayoutDashboard size={20} /><span style={{ margin: 'auto 0' }} className='px-2'>Dashboard</span></Link>
        }
        {path == '/dashboard/tradespersons' ?
          <Link href={'/dashboard/tradespersons'} className="bg-yellow-400 text-black  hover:bg-black hover:text-white p-3 rounded-lg font-semibold flex "><Drill size={20} /><span className='px-2' style={{ margin: 'auto 0' }}>Tradespersons</span></Link>
          :
          <Link href={'/dashboard/tradespersons'} className="hover:bg-black hover:text-white p-3 rounded-lg font-semibold flex "><Drill size={20} /><span style={{ margin: 'auto 0' }} className='px-2'>Tradespersons</span></Link>
        }

        {path == '/dashboard/jobs' ?
          <Link href={'/dashboard/jobs'} className="bg-yellow-400 text-black  hover:bg-black hover:text-white p-3 rounded-lg font-semibold flex "><NotebookPen size={20} /><span className='px-2' style={{ margin: 'auto 0' }}>Jobs</span></Link>
          :
          <Link href={'/dashboard/jobs'} className="hover:bg-black hover:text-white p-3 rounded-lg font-semibold flex "><NotebookPen size={20} /><span style={{ margin: 'auto 0' }} className='px-2'>Jobs</span></Link>
        }

        {path == '/dashboard/clients' ?
          <Link href={'/dashboard/clients'} className="bg-yellow-400 text-black  hover:bg-black hover:text-white p-3 rounded-lg font-semibold flex "><UserRound size={20} /><span className='px-2' style={{ margin: 'auto 0' }}>Clients</span></Link>
          :
          <Link href={'/dashboard/clients'} className="hover:bg-black hover:text-white p-3 rounded-lg font-semibold flex "><UserRound size={20} /><span style={{ margin: 'auto 0' }} className='px-2'>Clients</span></Link>
        }

      </nav>
    </aside>
  );
}

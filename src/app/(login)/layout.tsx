import Image from "next/image";
import fg from '../assets/sideImage.png';

export default function AdminLayout({ children }) {
  return (
    <div className="main-container h-screen">
      <div className="relative z-10 flex w-full max-w-screen bg-gray-100 h-full">
        {/* Left side image covering 50% width and adjusting to screen height */}
        <div className="hidden md:flex flex-1 relative h-full">
          <div className="overflow-y-scroll bg-white px-4">
          <Image
            src={fg}
            alt="side-image"
            // fill
            // height={500}
            className="object-cover mt-4"
          />
          </div>
        </div>

        {/* Right side content taking up the remaining 50% */}
        <div className="flex-1 flex justify-center items-center p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}

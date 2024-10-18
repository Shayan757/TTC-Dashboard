import { Menu , LogOut} from "lucide-react";
import { logout } from "../../actions/auth";
import { usePathname } from "next/navigation";
export default function Navbar({ toggleSidebar }) {
  const path = usePathname();
  return (
    <nav className="bg-white shadow-md w-full px-6 py-6 flex justify-between items-center border-b">
      {/* Hamburger button for mobile */}
      <button
        className="lg:hidden p-2 rounded-md focus:outline-none focus:ring"
        onClick={toggleSidebar}
      >
       <Menu />
      </button>

      {/* Dashboard Heading */}
      <h1 className="text-2xl font-semibold text-gray-900 pt-1">{path == '/dashboard' ? 'Dashboard' : path == '/dashboard/tradespersons' ? "Tradesperson" : path == '/dashboard/jobs' ? "Job" : path == '/dashboard/clients' ? "Client"  : 'Dashboard'}</h1>

      {/* Placeholder for additional icons or actions */}
      <div className="flex items-center space-x-4">
        <button onClick={()=> {logout()}} className="text-gray-500 hover:text-gray-600"><LogOut /></button>
      </div>
    </nav>
  );
}

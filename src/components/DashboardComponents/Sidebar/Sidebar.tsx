"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUsers,
  FiFolder,
  FiMessageSquare,
  FiBriefcase,
  FiMail,
  FiTag,
  FiLogOut,
  FiUserCheck,
  FiBook,
  FiShoppingCart,
  FiSettings,
  FiFileText,
  FiHelpCircle,
  FiImage,
  FiList,
  FiShield
} from "react-icons/fi";

const navItems = [
  { 
    name: "Menu Item", 
    href: "/admin/dashboard/menuItems",
    icon: <FiList /> 
  },
  {
    name: "Order Details",
    href: "/admin/dashboard/orderDetails",
    icon: <FiShoppingCart />,
  },
  { 
    name: "Admin Details", 
    href: "/admin/dashboard/adminDetails",
    icon: <FiSettings /> 
  },
  { 
    name: "Contact Details", 
    href: "/admin/dashboard/contactDetails", 
    icon: <FiMail /> 
  },
  { 
    name: "Blogs", 
    href: "/admin/dashboard/blogs",
    icon: <FiBook /> 
  },
  { 
    name: "Term and Conditon", 
    href: "/admin/dashboard/termandcondition",
    icon: <FiFileText /> 
  },
  { 
    name: "Private Policy", 
    href: "/admin/dashboard/privatePolicy",
    icon: <FiShield /> 
  },
  { 
    name: "FAQ", 
    href: "/admin/dashboard/faq",
    icon: <FiHelpCircle /> 
  },
  { 
    name: "sliderDetails", 
    href: "/admin/dashboard/sliderDetails",
    icon: <FiImage />
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URI || 'http://localhost:3001';
  };

  return (
    <aside className="sticky top-0 left-0 w-55 h-screen bg-gray-900 text-white flex flex-col z-50 shadow-lg">
      <div className="p-6 text-2xl font-bold">Admin Pannel</div>

      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition ${
              pathname === item.href ? "bg-gray-700" : ""
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="m-6 px-4 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 text-white font-semibold shadow-md"
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
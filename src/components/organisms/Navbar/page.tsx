// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { FiPhone, FiGlobe, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white shadow-xl sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo - Left */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="flex items-center hover-lift">
//               <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
//                 <span className="text-[#EF5350] font-bold text-lg">S</span>
//               </div>
//               <span className="ml-3 text-xl font-bold hidden sm:block">
//                 SushiMaster
//               </span>
//             </Link>
//           </div>

//           {/* Center Menu Items - Desktop */}
//           <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl">
//             <div className="flex space-x-8">
//               <Link
//                 href="/menu"
//                 className="hover:text-[#FFEBEE] px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-[#FFEBEE] hover:scale-105 transform transition-transform duration-200"
//               >
//                 Menu
//               </Link>
//               <Link
//                 href="/mission"
//                 className="hover:text-[#FFEBEE] px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-[#FFEBEE] hover:scale-105 transform transition-transform duration-200"
//               >
//                 Mission
//               </Link>
//               <Link
//                 href="/sushiboat"
//                 className="hover:text-[#FFEBEE] px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-[#FFEBEE] hover:scale-105 transform transition-transform duration-200"
//               >
//                 SushiBoat
//               </Link>
//             </div>
//           </div>

//           {/* Right Side Icons - Desktop */}
//           <div className="hidden md:flex items-center space-x-6">
//             {/* Phone Number */}
//             <div className="flex items-center space-x-2 bg-black bg-opacity-20 rounded-full px-4 py-2 hover:scale-105 transform transition-transform duration-200">
//               <FiPhone className="w-4 h-4" />
//               <span className="text-sm font-medium">+1 (555) 123-4567</span>
//             </div>

//             {/* Gap */}
//             <div className="w-px h-6 bg-white bg-opacity-30"></div>

//             {/* Icons */}
//             <div className="flex items-center space-x-3">
//               <button className="p-2 hover:text-[#FFEBEE] transition-colors duration-200 hover:scale-110 transform transition-transform duration-200">
//                 <FiGlobe className="w-5 h-5" />
//               </button>
//               <button className="p-2 hover:text-[#FFEBEE] transition-colors duration-200 hover:scale-110 transform transition-transform duration-200 relative">
//                 <FiShoppingCart className="w-5 h-5" />
//                 <span className="absolute -top-1 -right-1 bg-[#EF5350] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#E57373]">
//                   3
//                 </span>
//               </button>
//               <button className="p-2 hover:text-[#FFEBEE] transition-colors duration-200 hover:scale-110 transform transition-transform duration-200">
//                 <FiUser className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center space-x-3">
//             <button className="p-2 hover:text-[#FFEBEE] hover:scale-110 transform transition-transform duration-200 relative">
//               <FiShoppingCart className="w-5 h-5" />
//               <span className="absolute -top-1 -right-1 bg-[#EF5350] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#E57373]">
//                 3
//               </span>
//             </button>
            
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 hover:text-[#FFEBEE] transition-colors duration-200 hover:scale-110 transform transition-transform duration-200"
//             >
//               {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-[#E57373] border-t border-[#EF5350]">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link
//                 href="/menu"
//                 className="block px-3 py-2 hover:text-[#FFEBEE] hover:bg-[#EF5350] rounded-md text-base font-medium transform transition-transform duration-200 hover:scale-105"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Menu
//               </Link>
//               <Link
//                 href="/mission"
//                 className="block px-3 py-2 hover:text-[#FFEBEE] hover:bg-[#EF5350] rounded-md text-base font-medium transform transition-transform duration-200 hover:scale-105"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Mission
//               </Link>
//               <Link
//                 href="/sushiboat"
//                 className="block px-3 py-2 hover:text-[#FFEBEE] hover:bg-[#EF5350] rounded-md text-base font-medium transform transition-transform duration-200 hover:scale-105"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 SushiBoat
//               </Link>
              
//               {/* Mobile Phone Number */}
//               <div className="px-3 py-2 flex items-center space-x-2 bg-black bg-opacity-20 rounded-md hover:scale-105 transform transition-transform duration-200">
//                 <FiPhone className="w-4 h-4" />
//                 <span className="text-base font-medium">+1 (555) 123-4567</span>
//               </div>
              
//               {/* Mobile Additional Icons */}
//               <div className="px-3 py-2 flex items-center space-x-4">
//                 <button className="p-2 hover:text-[#FFEBEE] hover:scale-110 transform transition-transform duration-200">
//                   <FiGlobe className="w-5 h-5" />
//                 </button>
//                 <button className="p-2 hover:text-[#FFEBEE] hover:scale-110 transform transition-transform duration-200">
//                   <FiUser className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPhone, FiGlobe, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#EF5350] to-[#E57373] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-transform duration-300 border border-[#EF5350]/30">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-white to-[#FFEBEE] bg-clip-text text-transparent">
                SushiMaster
              </span>
            </Link>
          </div>

          {/* Center Menu Items - Desktop */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl">
            <div className="flex space-x-12">
              <Link
                href="/menu"
                className="relative text-gray-300 hover:text-white px-4 py-2 text-base font-medium transition-all duration-300 group"
              >
                Menu
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF5350] group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
              <Link
                href="/mission"
                className="relative text-gray-300 hover:text-white px-4 py-2 text-base font-medium transition-all duration-300 group"
              >
                Mission
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF5350] group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
              <Link
                href="/sushiboat"
                className="relative text-gray-300 hover:text-white px-4 py-2 text-base font-medium transition-all duration-300 group"
              >
                SushiBoat
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF5350] group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
            </div>
          </div>

          {/* Right Side Icons - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Phone Number */}
            <div className="flex items-center space-x-3 bg-gray-800/70 backdrop-blur-md rounded-2xl px-5 py-3 border border-gray-700 hover:border-[#EF5350]/50 transition-all duration-300 group">
              <FiPhone className="w-4 h-4 text-[#FFEBEE] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                +1 (555) 123-4567
              </span>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              <button className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group">
                <FiGlobe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </button>
              <button className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group relative">
                <FiShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900 shadow-lg">
                  3
                </span>
              </button>
              <button className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group">
                <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group relative">
              <FiShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900 shadow-lg">
                3
              </span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 backdrop-blur-2xl">
            <div className="px-4 pt-6 pb-8 space-y-4">
              {/* Menu Links */}
              <div className="space-y-2">
                <Link
                  href="/menu"
                  className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-[#EF5350]/30 transform transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                    <span className="w-2 h-2 bg-[#EF5350] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Menu
                  </span>
                </Link>
                <Link
                  href="/mission"
                  className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-[#EF5350]/30 transform transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                    <span className="w-2 h-2 bg-[#EF5350] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Mission
                  </span>
                </Link>
                <Link
                  href="/sushiboat"
                  className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-[#EF5350]/30 transform transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                    <span className="w-2 h-2 bg-[#EF5350] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    SushiBoat
                  </span>
                </Link>
              </div>
              
              {/* Mobile Phone Number */}
              <div className="px-4 py-4 flex items-center space-x-3 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 mt-4">
                <FiPhone className="w-5 h-5 text-[#FFEBEE]" />
                <span className="text-white font-semibold">+1 (555) 123-4567</span>
              </div>
              
              {/* Mobile Additional Icons */}
              <div className="flex space-x-3 px-4 pt-4">
                <button className="flex-1 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:bg-[#EF5350] transform transition-all duration-300 group p-4 flex items-center justify-center space-x-2">
                  <FiGlobe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-white font-medium text-sm">Language</span>
                </button>
                <button className="flex-1 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:bg-[#EF5350] transform transition-all duration-300 group p-4 flex items-center justify-center space-x-2">
                  <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-white font-medium text-sm">Account</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
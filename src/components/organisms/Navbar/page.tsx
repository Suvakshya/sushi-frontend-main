"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useLanguage } from "../../../context/LanguageContext";
import {
  FiPhone,
  FiGlobe,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
  FiRefreshCw,
  FiSettings,
  FiHeart,
} from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t, isTranslating, translatePage } = useLanguage();
  const router = useRouter();
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserClick = () => {
    if (isAuthenticated) {
      setIsUserDropdownOpen(!isUserDropdownOpen);
    } else {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
    router.push("/");
  };

  const handleLanguageChange = async (newLanguage: 'en' | 'pt') => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(false);
    
    if (newLanguage !== 'en') {
      setTimeout(() => translatePage(), 500);
    }
  };

  const handleForceTranslate = async () => {
    await translatePage();
    setIsLanguageDropdownOpen(false);
  };

  const handleProfileNavigation = () => {
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
    router.push("/profile");
  };

  const handleSettingsNavigation = () => {
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
    router.push("/settings");
  };

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
                {t('Menu')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF5350] group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
              <Link
                href="/mission"
                className="relative text-gray-300 hover:text-white px-4 py-2 text-base font-medium transition-all duration-300 group"
              >
                {t('Mission')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF5350] group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
              <Link
                href="/sushiboat"
                className="relative text-gray-300 hover:text-white px-4 py-2 text-base font-medium transition-all duration-300 group"
              >
                {t('SushiBoat')}
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
              {/* Language Switcher */}
              <div className="relative" ref={languageDropdownRef}>
                <button 
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group flex items-center space-x-2 relative"
                  disabled={isTranslating}
                >
                  <FiGlobe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <FiChevronDown className={`w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-300 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                  {isTranslating && (
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                    </div>
                  )}
                </button>

                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl backdrop-blur-md z-50">
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {t('Select Language')}
                      </div>
                      
                      <button
                        onClick={() => handleLanguageChange('en')}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          language === 'en' 
                            ? 'bg-[#EF5350] text-white' 
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <span className="text-lg">🇺🇸</span>
                        <span className="font-medium flex-1 text-left">English</span>
                        {language === 'en' && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleLanguageChange('pt')}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          language === 'pt' 
                            ? 'bg-[#EF5350] text-white' 
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <span className="text-lg">🇧🇷</span>
                        <span className="font-medium flex-1 text-left">Português</span>
                        {language === 'pt' && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </button>

                      {language !== 'en' && (
                        <button
                          onClick={handleForceTranslate}
                          disabled={isTranslating}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-700 hover:text-white text-sm mt-2"
                        >
                          <FiRefreshCw className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
                          <span>{isTranslating ? t('Translating...') : t('Refresh Translation')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/cart" className="relative">
                <div className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group relative">
                  <FiShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900 shadow-lg">
                    {cartCount}
                  </span>
                </div>
              </Link>

              {/* User Dropdown */}
              <div className="relative" ref={userDropdownRef}>
                <button 
                  onClick={handleUserClick}
                  className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group relative flex items-center space-x-2"
                >
                  <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <FiChevronDown className={`w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  {isAuthenticated && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                  )}
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && isAuthenticated && user && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl backdrop-blur-md z-50">
                    <div className="p-4 space-y-3">
                      {/* User Info */}
                      <div className="text-center border-b border-gray-700 pb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#EF5350] to-[#E57373] rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold text-sm">
                            {user.full_name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold truncate">{user.full_name}</h3>
                        <p className="text-gray-400 text-sm truncate">{user.email}</p>
                      </div>

                      {/* Dropdown Items */}
                      <div className="space-y-1">
                        {/* <button
                          onClick={handleProfileNavigation}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
                        >
                          <FiUser className="w-4 h-4" />
                          <span className="font-medium">{t('Profile')}</span>
                        </button>

                        <button
                          onClick={handleSettingsNavigation}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
                        >
                          <FiSettings className="w-4 h-4" />
                          <span className="font-medium">{t('Settings')}</span>
                        </button> */}

                        {/* <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
                          <FiHeart className="w-4 h-4" />
                          <span className="font-medium">{t('Favorites')}</span>
                        </button> */}

                        <div className="border-t border-gray-700 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
                          >
                            <FiLogOut className="w-4 h-4" />
                            <span className="font-medium">{t('Logout')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <Link href="/cart" className="relative">
              <div className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group relative">
                <FiShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900 shadow-lg">
                  {cartCount}
                </span>
              </div>
            </Link>

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
                    {t('Menu')}
                  </span>
                </Link>
                <Link
                  href="/mission"
                  className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-[#EF5350]/30 transform transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                    <span className="w-2 h-2 bg-[#EF5350] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    {t('Mission')}
                  </span>
                </Link>
                <Link
                  href="/sushiboat"
                  className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-[#EF5350]/30 transform transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                    <span className="w-2 h-2 bg-[#EF5350] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    {t('SushiBoat')}
                  </span>
                </Link>
              </div>

              {/* Mobile Phone Number */}
              <div className="px-4 py-4 flex items-center space-x-3 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 mt-4">
                <FiPhone className="w-5 h-5 text-[#FFEBEE]" />
                <span className="text-white font-semibold">
                  +1 (555) 123-4567
                </span>
              </div>

              {/* Mobile Additional Icons */}
              <div className="flex space-x-3 px-4 pt-4">
                {/* Language Switcher Mobile */}
                <div className="flex-1">
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden">
                    <button 
                      onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                      className="w-full p-4 flex items-center justify-center space-x-2 hover:bg-[#EF5350] transform transition-all duration-300 group"
                    >
                      <FiGlobe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      <span className="text-gray-300 group-hover:text-white font-medium text-sm">
                        {t('Language')}
                      </span>
                      <FiChevronDown className={`w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-300 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Mobile Language Options */}
                    {isLanguageDropdownOpen && (
                      <div className="border-t border-gray-700 space-y-1">
                        <button
                          onClick={() => handleLanguageChange('en')}
                          className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                            language === 'en' 
                              ? 'bg-[#EF5350] text-white' 
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          <span className="text-lg">🇺🇸</span>
                          <span className="font-medium">English</span>
                        </button>
                        <button
                          onClick={() => handleLanguageChange('pt')}
                          className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                            language === 'pt' 
                              ? 'bg-[#EF5350] text-white' 
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          <span className="text-lg">🇧🇷</span>
                          <span className="font-medium">Português</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {isAuthenticated ? (
                  <div className="flex-1 space-y-2">
                    <button 
                      onClick={handleProfileNavigation}
                      className="w-full bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:bg-[#EF5350] transform transition-all duration-300 group p-4 flex items-center justify-center space-x-2"
                    >
                      <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      <span className="text-gray-300 group-hover:text-white font-medium text-sm">
                        {t('Profile')}
                      </span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:bg-red-600 transform transition-all duration-300 group p-3 flex items-center justify-center space-x-2"
                    >
                      <FiLogOut className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      <span className="text-gray-300 group-hover:text-white font-medium text-sm">
                        {t('Logout')}
                      </span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      router.push("/login");
                      setIsMenuOpen(false);
                    }}
                    className="flex-1 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:bg-[#EF5350] transform transition-all duration-300 group p-4 flex items-center justify-center space-x-2"
                  >
                    <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <span className="text-gray-300 group-hover:text-white font-medium text-sm">
                      {t('Login')}
                    </span>
                  </button>
                )}
              </div>

              {/* User Info if logged in */}
              {isAuthenticated && user && (
                <div className="px-4 py-3 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <p className="text-sm text-gray-300">{t('Logged in as')}:</p>
                  <p className="text-white font-medium truncate">{user.full_name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
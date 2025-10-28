// "use client";

// import Link from "next/link";
// import { FaFacebookF, FaInstagram, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmazonPay, FaApplePay } from "react-icons/fa";
// import { useLanguage } from "../../../context/LanguageContext";

// const Footer = () => {
//   const { t } = useLanguage();

//   return (
//     <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
//           {/* Logo & Description */}
//           <div className="md:col-span-2 space-y-6">
//             <div className="flex items-center group">
//               <div className="w-12 h-12 bg-gradient-to-r from-[#EF5350] to-[#E57373] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-transform duration-300">
//                 <span className="text-white font-bold text-xl">S</span>
//               </div>
//               <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-white to-[#FFEBEE] bg-clip-text text-transparent">
//                 SushiMaster
//               </span>
//             </div>
//             <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
//               {t('Fresh sushi, authentic flavors, unforgettable experience. Crafted with passion, served with perfection.')}
//             </p>
            
//             {/* Payment Methods */}
//             <div className="space-y-3">
//               <h4 className="font-semibold text-[#FFEBEE] text-sm uppercase tracking-wide">
//                 {t('We Accept')}
//               </h4>
//               <div className="flex gap-4">
//                 <FaCcVisa className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
//                 <FaCcMastercard className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
//                 <FaCcPaypal className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
//                 <FaCcAmazonPay className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
//                 <FaApplePay className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
//               </div>
//             </div>
//           </div>

//           {/* Navigation Links */}
//           <div className="space-y-6">
//             <h4 className="font-bold text-[#FFEBEE] text-lg border-l-4 border-[#EF5350] pl-3">
//               {t('Navigation')}
//             </h4>
//             <div className="space-y-3">
//               <Link 
//                 href="/menu" 
//                 className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
//               >
//                 <span className="group-hover:text-[#EF5350] transition-colors duration-300">
//                   {t('Menu')}
//                 </span>
//               </Link>
//               <Link 
//                 href="/mission" 
//                 className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
//               >
//                 <span className="group-hover:text-[#EF5350] transition-colors duration-300">
//                   {t('Mission')}
//                 </span>
//               </Link>
//               <Link 
//                 href="/sushiboat" 
//                 className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
//               >
//                 <span className="group-hover:text-[#EF5350] transition-colors duration-300">
//                   {t('SushiBoat')}
//                 </span>
//               </Link>
//               <Link 
//                 href="/join-our-team" 
//                 className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
//               >
//                 <span className="group-hover:text-[#EF5350] transition-colors duration-300">
//                   {t('Work with us')}
//                 </span>
//               </Link>
//             </div>
//           </div>

//           {/* Policies & Social */}
//           <div className="space-y-6">
//             <div className="space-y-4">
//               <h4 className="font-bold text-[#FFEBEE] text-lg border-l-4 border-[#EF5350] pl-3">
//                 {t('Legal')}
//               </h4>
//               <div className="space-y-3">
//                 <Link 
//                   href="/privacy" 
//                   className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
//                 >
//                   <span className="group-hover:text-[#EF5350] transition-colors duration-300">
//                     {t('Privacy Policy')}
//                   </span>
//                 </Link>
//                 <Link 
//                   href="/terms" 
//                   className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
//                 >
//                   <span className="group-hover:text-[#EF5350] transition-colors duration-300">
//                     {t('Terms & Conditions')}
//                   </span>
//                 </Link>
//                 <Link 
//                   href="/faq" 
//                   className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
//                 >
//                   <span className="group-hover:text-[#EF5350] transition-colors duration-300">
//                     {t('FAQ')}
//                   </span>
//                 </Link>
//               </div>
//             </div>
            
//             {/* Social Media */}
//             <div className="space-y-4">
//               <h4 className="font-bold text-[#FFEBEE] text-lg border-l-4 border-[#EF5350] pl-3">
//                 {t('Follow Us')}
//               </h4>
//               <div className="flex space-x-4">
//                 <a 
//                   href="#" 
//                   className="bg-gray-800 hover:bg-[#EF5350] p-3 rounded-full hover:scale-110 transform transition-all duration-300 group"
//                   aria-label={t('Instagram')}
//                 >
//                   <FaInstagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
//                 </a>
//                 <a 
//                   href="#" 
//                   className="bg-gray-800 hover:bg-[#EF5350] p-3 rounded-full hover:scale-110 transform transition-all duration-300 group"
//                   aria-label={t('Facebook')}
//                 >
//                   <FaFacebookF className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-gray-800 mt-12 pt-8 text-center">
//           <p className="text-gray-400 text-sm font-light">
//             © {new Date().getFullYear()} SushiMaster. {t('All rights reserved.')} | 
//             <span className="text-[#EF5350] mx-1">{t('Crafted with passion')}</span>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmazonPay, FaApplePay } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

interface LogoLinkData {
  id?: string;
  logo: string | null;
  facebook: string | null;
  instagram: string | null;
}

const Footer = () => {
  const { t } = useLanguage();
  const [logoLinkData, setLogoLinkData] = useState<LogoLinkData | null>(null);

  // Fetch logo and social links data
  const fetchLogoLink = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
      const response = await fetch(`${API_BASE_URL}/logo/logo-link`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setLogoLinkData(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching logo and social links:', error);
    }
  };

  useEffect(() => {
    fetchLogoLink();
  }, []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#EF5350] to-[#E57373] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-transform duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-white to-[#FFEBEE] bg-clip-text text-transparent">
                SushiMaster
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
              {t('Fresh sushi, authentic flavors, unforgettable experience. Crafted with passion, served with perfection.')}
            </p>
            
            {/* Payment Methods */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#FFEBEE] text-sm uppercase tracking-wide">
                {t('We Accept')}
              </h4>
              <div className="flex gap-4">
                <FaCcVisa className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
                <FaCcMastercard className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
                <FaCcPaypal className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
                <FaCcAmazonPay className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
                <FaApplePay className="w-8 h-8 text-gray-400 hover:text-white hover:scale-110 transform transition-all duration-300 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-[#FFEBEE] text-lg border-l-4 border-[#EF5350] pl-3">
              {t('Navigation')}
            </h4>
            <div className="space-y-3">
              <Link 
                href="/menu" 
                className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
              >
                <span className="group-hover:text-[#EF5350] transition-colors duration-300">
                  {t('Menu')}
                </span>
              </Link>
              <Link 
                href="/mission" 
                className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
              >
                <span className="group-hover:text-[#EF5350] transition-colors duration-300">
                  {t('Mission')}
                </span>
              </Link>
              <Link 
                href="/sushiboat" 
                className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
              >
                <span className="group-hover:text-[#EF5350] transition-colors duration-300">
                  {t('SushiBoat')}
                </span>
              </Link>
              <Link 
                href="/join-our-team" 
                className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
              >
                <span className="group-hover:text-[#EF5350] transition-colors duration-300">
                  {t('Work with us')}
                </span>
              </Link>
            </div>
          </div>

          {/* Policies & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-bold text-[#FFEBEE] text-lg border-l-4 border-[#EF5350] pl-3">
                {t('Legal')}
              </h4>
              <div className="space-y-3">
                <Link 
                  href="/privacy" 
                  className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
                >
                  <span className="group-hover:text-[#EF5350] transition-colors duration-300">
                    {t('Privacy Policy')}
                  </span>
                </Link>
                <Link 
                  href="/terms" 
                  className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
                >
                  <span className="group-hover:text-[#EF5350] transition-colors duration-300">
                    {t('Terms & Conditions')}
                  </span>
                </Link>
                <Link 
                  href="/faq" 
                  className="block text-gray-300 hover:text-white hover:translate-x-2 transform transition-all duration-300 text-base font-medium group"
                >
                  <span className="group-hover:text-[#EF5350] transition-colors duration-300">
                    {t('FAQ')}
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Social Media - Now Dynamic */}
            <div className="space-y-4">
              <h4 className="font-bold text-[#FFEBEE] text-lg border-l-4 border-[#EF5350] pl-3">
                {t('Follow Us')}
              </h4>
              <div className="flex space-x-4">
                {/* Instagram Link - Dynamic */}
                {logoLinkData?.instagram ? (
                  <a 
                    href={logoLinkData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-[#EF5350] p-3 rounded-full hover:scale-110 transform transition-all duration-300 group"
                    aria-label={t('Instagram')}
                  >
                    <FaInstagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                ) : (
                  <div className="bg-gray-800 p-3 rounded-full opacity-50 cursor-not-allowed">
                    <FaInstagram className="w-5 h-5 text-gray-500" />
                  </div>
                )}
                
                {/* Facebook Link - Dynamic */}
                {logoLinkData?.facebook ? (
                  <a 
                    href={logoLinkData.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-[#EF5350] p-3 rounded-full hover:scale-110 transform transition-all duration-300 group"
                    aria-label={t('Facebook')}
                  >
                    <FaFacebookF className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                ) : (
                  <div className="bg-gray-800 p-3 rounded-full opacity-50 cursor-not-allowed">
                    <FaFacebookF className="w-5 h-5 text-gray-500" />
                  </div>
                )}
              </div>
              
              {/* Status Message */}
              {(!logoLinkData?.facebook && !logoLinkData?.instagram) && (
                <p className="text-xs text-gray-500 italic">
                  Social links not configured in admin panel
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} SushiMaster. {t('All rights reserved.')} | 
            <span className="text-[#EF5350] mx-1">{t('Crafted with passion')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
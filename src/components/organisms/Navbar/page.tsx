// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useCart } from "../../../context/CartContext";
// import { useAuth } from "../../../context/AuthContext";
// import { useLanguage } from "../../../context/LanguageContext";
// import {
//   FiPhone,
//   FiGlobe,
//   FiShoppingCart,
//   FiUser,
//   FiMenu,
//   FiX,
//   FiLogOut,
//   FiChevronDown,
//   FiRefreshCw,
//   FiFileText,
//   FiTrash2,
//   FiDownload
// } from "react-icons/fi";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// interface Receipt {
//   _id: string;
//   order_id: string;
//   total_price: number;
//   order_type: string;
//   payment_method: string;
//   status: string;
//   created_at: string;
//   customer_name: string;
//   customer_email: string;
//   items: Array<{
//     name: string;
//     quantity: number;
//     price: number;
//   }>;
// }

// interface ContactInfo {
//   phone: string;
//   email: string;
//   updated_at: string;
// }

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [receipts, setReceipts] = useState<Receipt[]>([]);
//   const [loadingReceipts, setLoadingReceipts] = useState(false);
//   const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [receiptToDelete, setReceiptToDelete] = useState<string | null>(null);
//   const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
//   const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);
//   const { cartCount } = useCart();
//   const { user, isAuthenticated, logout } = useAuth();
//   const { language, setLanguage, t, isTranslating, translatePage } = useLanguage();
//   const router = useRouter();
//   const languageDropdownRef = useRef<HTMLDivElement>(null);
//   const userDropdownRef = useRef<HTMLDivElement>(null);

//   // Fetch contact information
//   const fetchContactInfo = async () => {
//     try {
//       const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
//       const response = await fetch(`${API_BASE_URL}/admincontact`);
      
//       if (response.ok) {
//         const result = await response.json();
//         if (result.success) {
//           setContactInfo(result.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching contact info:', error);
//       setContactInfo({
//         phone: "+1 (555) 123-4567",
//         email: "contact@sushimaster.com",
//         updated_at: new Date().toISOString()
//       });
//     }
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
//         setIsLanguageDropdownOpen(false);
//       }
//       if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
//         setIsUserDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Fetch receipts when user dropdown opens
//   useEffect(() => {
//     if (isUserDropdownOpen && isAuthenticated && user) {
//       fetchReceipts();
//     }
//   }, [isUserDropdownOpen, isAuthenticated, user]);

//   // Fetch contact info on component mount
//   useEffect(() => {
//     fetchContactInfo();
//   }, []);

//   const fetchReceipts = async () => {
//     if (!user) return;
    
//     setLoadingReceipts(true);
//     try {
//       const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
//       const response = await fetch(`${API_BASE_URL}/receipts/user/${user._id}`);
      
//       console.log('Fetching receipts for user:', user._id);
      
//       if (response.ok) {
//         const result = await response.json();
//         console.log('Receipts API response:', result);
        
//         if (result.success) {
//           console.log('Fetched receipts:', result.data.length);
//           setReceipts(result.data);
//         } else {
//           console.error('Failed to fetch receipts:', result.message);
//         }
//       } else {
//         console.error('HTTP error fetching receipts:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching receipts:', error);
//     } finally {
//       setLoadingReceipts(false);
//     }
//   };

//   const handleUserClick = () => {
//     if (isAuthenticated) {
//       setIsUserDropdownOpen(!isUserDropdownOpen);
//     } else {
//       router.push("/login");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     setIsMenuOpen(false);
//     setIsUserDropdownOpen(false);
//     router.push("/");
//   };

//   const handleLanguageChange = async (newLanguage: 'en' | 'pt') => {
//     setLanguage(newLanguage);
//     setIsLanguageDropdownOpen(false);
//     setIsMenuOpen(false);
    
//     if (newLanguage !== 'en') {
//       setTimeout(() => translatePage(), 500);
//     }
//   };

//   const handleForceTranslate = async () => {
//     await translatePage();
//     setIsLanguageDropdownOpen(false);
//   };

//   const handleProfileNavigation = () => {
//     setIsUserDropdownOpen(false);
//     setIsMenuOpen(false);
//     router.push("/profile");
//   };

//   const handleViewReceipt = (receipt: Receipt) => {
//     setSelectedReceipt(receipt);
//   };

//   const handleCloseReceipt = () => {
//     setSelectedReceipt(null);
//   };

//   const handleDeleteReceipt = (receiptId: string) => {
//     setReceiptToDelete(receiptId);
//     setShowDeleteConfirm(true);
//   };

//   const confirmDeleteReceipt = async () => {
//     if (!receiptToDelete) return;

//     try {
//       const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
//       const response = await fetch(`${API_BASE_URL}/receipts/${receiptToDelete}`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         setReceipts(receipts.filter(receipt => receipt._id !== receiptToDelete));
//         if (selectedReceipt?._id === receiptToDelete) {
//           setSelectedReceipt(null);
//         }
//       }
//     } catch (error) {
//       console.error('Error deleting receipt:', error);
//     } finally {
//       setShowDeleteConfirm(false);
//       setReceiptToDelete(null);
//     }
//   };

//   const cancelDeleteReceipt = () => {
//     setShowDeleteConfirm(false);
//     setReceiptToDelete(null);
//   };

//   // PDF Download Function
//   const downloadReceiptPDF = async (receipt: Receipt) => {
//     setDownloadingPdf(receipt._id);
//     try {
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.getWidth();
      
//       // Add logo and header
//       pdf.setFillColor(239, 83, 80); // #EF5350
//       pdf.rect(0, 0, pageWidth, 40, 'F');
      
//       // Title
//       pdf.setTextColor(255, 255, 255);
//       pdf.setFontSize(24);
//       pdf.setFont('helvetica', 'bold');
//       pdf.text('SUSHI MASTER', pageWidth / 2, 20, { align: 'center' });
      
//       pdf.setFontSize(14);
//       pdf.text('RECEIPT', pageWidth / 2, 30, { align: 'center' });
      
//       let yPosition = 60;
      
//       // Receipt Information
//       pdf.setTextColor(0, 0, 0);
//       pdf.setFontSize(12);
//       pdf.setFont('helvetica', 'bold');
//       pdf.text('Receipt Information', 20, yPosition);
//       yPosition += 10;
      
//       pdf.setFont('helvetica', 'normal');
//       pdf.text(`Receipt ID: ${receipt._id}`, 20, yPosition);
//       yPosition += 8;
//       pdf.text(`Order ID: ${receipt.order_id}`, 20, yPosition);
//       yPosition += 8;
//       pdf.text(`Date: ${formatDate(receipt.created_at)}`, 20, yPosition);
//       yPosition += 15;
      
//       // Customer Information
//       pdf.setFont('helvetica', 'bold');
//       pdf.text('Customer Information', 20, yPosition);
//       yPosition += 10;
      
//       pdf.setFont('helvetica', 'normal');
//       pdf.text(`Name: ${receipt.customer_name}`, 20, yPosition);
//       yPosition += 8;
//       pdf.text(`Email: ${receipt.customer_email}`, 20, yPosition);
//       yPosition += 15;
      
//       // Order Details
//       pdf.setFont('helvetica', 'bold');
//       pdf.text('Order Details', 20, yPosition);
//       yPosition += 10;
      
//       pdf.setFont('helvetica', 'normal');
//       pdf.text(`Order Type: ${receipt.order_type}`, 20, yPosition);
//       yPosition += 8;
//       pdf.text(`Payment Method: ${receipt.payment_method}`, 20, yPosition);
//       yPosition += 8;
//       pdf.text(`Status: ${receipt.status}`, 20, yPosition);
//       yPosition += 15;
      
//       // Items Table Header
//       pdf.setFont('helvetica', 'bold');
//       pdf.text('Item', 20, yPosition);
//       pdf.text('Qty', 120, yPosition);
//       pdf.text('Price', 160, yPosition);
//       pdf.text('Total', pageWidth - 20, yPosition, { align: 'right' });
//       yPosition += 8;
      
//       // Draw line
//       pdf.line(20, yPosition, pageWidth - 20, yPosition);
//       yPosition += 10;
      
//       // Items
//       pdf.setFont('helvetica', 'normal');
//       let subtotal = 0;
      
//       receipt.items.forEach((item, index) => {
//         if (yPosition > 250) {
//           pdf.addPage();
//           yPosition = 20;
//         }
        
//         const itemTotal = item.price * item.quantity;
//         subtotal += itemTotal;
        
//         // Item name (wrapped if too long)
//         const itemName = item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name;
//         pdf.text(itemName, 20, yPosition);
//         pdf.text(item.quantity.toString(), 120, yPosition);
//         pdf.text(`$${item.price.toFixed(2)}`, 160, yPosition);
//         pdf.text(`$${itemTotal.toFixed(2)}`, pageWidth - 20, yPosition, { align: 'right' });
        
//         yPosition += 8;
//       });
      
//       yPosition += 10;
      
//       // Total
//       pdf.setFont('helvetica', 'bold');
//       pdf.line(20, yPosition, pageWidth - 20, yPosition);
//       yPosition += 10;
//       pdf.text(`Total Amount: $${receipt.total_price.toFixed(2)}`, pageWidth - 20, yPosition, { align: 'right' });
      
//       yPosition += 20;
      
//       // Footer
//       pdf.setFontSize(10);
//       pdf.setTextColor(128, 128, 128);
//       pdf.text('Thank you for dining with us!', pageWidth / 2, yPosition, { align: 'center' });
//       yPosition += 6;
//       pdf.text('Sushi Master - Fresh Sushi Experience', pageWidth / 2, yPosition, { align: 'center' });
//       yPosition += 6;
//       pdf.text('Contact: support@sushimaster.com', pageWidth / 2, yPosition, { align: 'center' });
      
//       // Save PDF
//       pdf.save(`receipt-${receipt.order_id}.pdf`);
      
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF. Please try again.');
//     } finally {
//       setDownloadingPdf(null);
//     }
//   };

//   // Alternative HTML to PDF conversion
//   const downloadReceiptPDFFromHTML = async (receipt: Receipt) => {
//     setDownloadingPdf(receipt._id);
//     try {
//       // Create a temporary div for PDF generation
//       const tempDiv = document.createElement('div');
//       tempDiv.style.position = 'absolute';
//       tempDiv.style.left = '-9999px';
//       tempDiv.style.top = '0';
//       tempDiv.style.width = '800px';
//       tempDiv.style.padding = '20px';
//       tempDiv.style.backgroundColor = 'white';
//       tempDiv.style.color = 'black';
//       tempDiv.style.fontFamily = 'Arial, sans-serif';
      
//       tempDiv.innerHTML = `
//         <div id="receipt-pdf" style="max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #EF5350; border-radius: 10px;">
//           <!-- Header -->
//           <div style="background: #EF5350; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; margin-bottom: 20px;">
//             <h1 style="margin: 0; font-size: 28px; font-weight: bold;">SUSHI MASTER</h1>
//             <p style="margin: 5px 0 0 0; font-size: 18px;">RECEIPT</p>
//           </div>
          
//           <!-- Receipt Information -->
//           <div style="margin-bottom: 20px;">
//             <h2 style="color: #EF5350; border-bottom: 2px solid #EF5350; padding-bottom: 5px;">Receipt Information</h2>
//             <p><strong>Receipt ID:</strong> ${receipt._id}</p>
//             <p><strong>Order ID:</strong> ${receipt.order_id}</p>
//             <p><strong>Date:</strong> ${formatDate(receipt.created_at)}</p>
//           </div>
          
//           <!-- Customer Information -->
//           <div style="margin-bottom: 20px;">
//             <h2 style="color: #EF5350; border-bottom: 2px solid #EF5350; padding-bottom: 5px;">Customer Information</h2>
//             <p><strong>Name:</strong> ${receipt.customer_name}</p>
//             <p><strong>Email:</strong> ${receipt.customer_email}</p>
//           </div>
          
//           <!-- Order Details -->
//           <div style="margin-bottom: 20px;">
//             <h2 style="color: #EF5350; border-bottom: 2px solid #EF5350; padding-bottom: 5px;">Order Details</h2>
//             <p><strong>Order Type:</strong> ${receipt.order_type}</p>
//             <p><strong>Payment Method:</strong> ${receipt.payment_method}</p>
//             <p><strong>Status:</strong> ${receipt.status}</p>
//           </div>
          
//           <!-- Items Table -->
//           <div style="margin-bottom: 20px;">
//             <h2 style="color: #EF5350; border-bottom: 2px solid #EF5350; padding-bottom: 5px;">Order Items</h2>
//             <table style="width: 100%; border-collapse: collapse;">
//               <thead>
//                 <tr style="background: #f8f9fa;">
//                   <th style="padding: 12px; text-align: left; border-bottom: 2px solid #EF5350;">Item</th>
//                   <th style="padding: 12px; text-align: center; border-bottom: 2px solid #EF5350;">Qty</th>
//                   <th style="padding: 12px; text-align: right; border-bottom: 2px solid #EF5350;">Price</th>
//                   <th style="padding: 12px; text-align: right; border-bottom: 2px solid #EF5350;">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${receipt.items.map(item => `
//                   <tr>
//                     <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.name}</td>
//                     <td style="padding: 12px; text-align: center; border-bottom: 1px solid #ddd;">${item.quantity}</td>
//                     <td style="padding: 12px; text-align: right; border-bottom: 1px solid #ddd;">$${item.price.toFixed(2)}</td>
//                     <td style="padding: 12px; text-align: right; border-bottom: 1px solid #ddd;">$${(item.price * item.quantity).toFixed(2)}</td>
//                   </tr>
//                 `).join('')}
//               </tbody>
//               <tfoot>
//                 <tr style="background: #f8f9fa;">
//                   <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #EF5350;">Total Amount:</td>
//                   <td style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #EF5350;">$${receipt.total_price.toFixed(2)}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
          
//           <!-- Footer -->
//           <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #EF5350; color: #666;">
//             <p style="margin: 5px 0;"><strong>Thank you for dining with us!</strong></p>
//             <p style="margin: 5px 0;">Sushi Master - Fresh Sushi Experience</p>
//             <p style="margin: 5px 0;">Contact: support@sushimaster.com</p>
//           </div>
//         </div>
//       `;
      
//       document.body.appendChild(tempDiv);
      
//       const canvas = await html2canvas(tempDiv, {
//         // scale: 2,
//         useCORS: true,
//         logging: false
//       });
      
//       document.body.removeChild(tempDiv);
      
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
      
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const ratio = imgHeight / imgWidth;
//       const pdfImgWidth = pageWidth - 20;
//       const pdfImgHeight = pdfImgWidth * ratio;
      
//       pdf.addImage(imgData, 'PNG', 10, 10, pdfImgWidth, pdfImgHeight);
//       pdf.save(`receipt-${receipt.order_id}.pdf`);
      
//     } catch (error) {
//       console.error('Error generating PDF from HTML:', error);
//       // Fallback to direct PDF generation
//       await downloadReceiptPDF(receipt);
//     } finally {
//       setDownloadingPdf(null);
//     }
//   };

//   const formatPrice = (price: number) => {
//     return `$${price.toFixed(2)}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatShortDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   return (
//     <nav className="bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl sticky top-0 z-50 border-b border-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo - Left */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="flex items-center group">
//               <div className="w-12 h-12 bg-gradient-to-r from-[#EF5350] to-[#E57373] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-transform duration-300 border border-[#EF5350]/30">
//                 <span className="text-white font-bold text-xl">S</span>
//               </div>
//               <span className="ml-4 text-2xl font-bold bg-gradient-to-r from-white to-[#FFEBEE] bg-clip-text text-transparent">
//                 SushiMaster
//               </span>
//             </Link>
//           </div>

//           {/* Center Menu Items - Desktop */}
//           <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl">
//             <div className="flex space-x-12">
//               <Link
//                 href="/menu"
//                 className="relative text-gray-300 hover:text-white px-4 py-2 text-base font-medium transition-all duration-300 group"
//               >
//                 {t('Menu')}
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF5350] group-hover:w-full transition-all duration-300 ease-out"></span>
//               </Link>
//               <Link
//                 href="/mission"
//                 className="relative text-gray-300 hover:text-white px-4 py-2 text-base font-medium transition-all duration-300 group"
//               >
//                 {t('Mission')}
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF5350] group-hover:w-full transition-all duration-300 ease-out"></span>
//               </Link>
//               <Link
//                 href="/sushiboat"
//                 className="relative text-gray-300 hover:text-white px-4 py-2 text-base font-medium transition-all duration-300 group"
//               >
//                 {t('SushiBoat')}
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF5350] group-hover:w-full transition-all duration-300 ease-out"></span>
//               </Link>
//             </div>
//           </div>

//           {/* Right Side Icons - Desktop */}
//           <div className="hidden lg:flex items-center space-x-6">
//             {/* Phone Number - Now Dynamic */}
//             <div className="flex items-center space-x-3 bg-gray-800/70 backdrop-blur-md rounded-2xl px-5 py-3 border border-gray-700 hover:border-[#EF5350]/50 transition-all duration-300 group">
//               <FiPhone className="w-4 h-4 text-[#FFEBEE] group-hover:scale-110 transition-transform duration-300" />
//               <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
//                 {contactInfo?.phone || "+1 (555) 123-4567"}
//               </span>
//             </div>

//             {/* Icons */}
//             <div className="flex items-center space-x-3">
//               {/* Language Switcher */}
//               <div className="relative" ref={languageDropdownRef}>
//                 <button 
//                   onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
//                   className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group flex items-center space-x-2 relative"
//                   disabled={isTranslating}
//                 >
//                   <FiGlobe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
//                   <FiChevronDown className={`w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-300 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
//                   {isTranslating && (
//                     <div className="absolute -top-1 -right-1 w-3 h-3">
//                       <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
//                     </div>
//                   )}
//                 </button>

//                 {/* Language Dropdown */}
//                 {isLanguageDropdownOpen && (
//                   <div className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl backdrop-blur-md z-50">
//                     <div className="p-2 space-y-1">
//                       <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
//                         {t('Select Language')}
//                       </div>
                      
//                       <button
//                         onClick={() => handleLanguageChange('en')}
//                         className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
//                           language === 'en' 
//                             ? 'bg-[#EF5350] text-white' 
//                             : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                         }`}
//                       >
//                         <span className="text-lg">🇺🇸</span>
//                         <span className="font-medium flex-1 text-left">English</span>
//                         {language === 'en' && (
//                           <div className="w-2 h-2 bg-white rounded-full"></div>
//                         )}
//                       </button>
                      
//                       <button
//                         onClick={() => handleLanguageChange('pt')}
//                         className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
//                           language === 'pt' 
//                             ? 'bg-[#EF5350] text-white' 
//                             : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                         }`}
//                       >
//                         <span className="text-lg">🇧🇷</span>
//                         <span className="font-medium flex-1 text-left">Português</span>
//                         {language === 'pt' && (
//                           <div className="w-2 h-2 bg-white rounded-full"></div>
//                         )}
//                       </button>

//                       {language !== 'en' && (
//                         <button
//                           onClick={handleForceTranslate}
//                           disabled={isTranslating}
//                           className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-gray-300 hover:bg-gray-700 hover:text-white text-sm mt-2"
//                         >
//                           <FiRefreshCw className={`w-4 h-4 ${isTranslating ? 'animate-spin' : ''}`} />
//                           <span>{isTranslating ? t('Translating...') : t('Refresh Translation')}</span>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               <Link href="/cart" className="relative">
//                 <div className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group relative">
//                   <FiShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
//                   <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900 shadow-lg">
//                     {cartCount}
//                   </span>
//                 </div>
//               </Link>

//               {/* User Dropdown */}
//               <div className="relative" ref={userDropdownRef}>
//                 <button 
//                   onClick={handleUserClick}
//                   className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group relative flex items-center space-x-2"
//                 >
//                   <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
//                   <FiChevronDown className={`w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
//                   {isAuthenticated && (
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
//                   )}
//                 </button>

//                 {/* User Dropdown Menu */}
//                 {isUserDropdownOpen && isAuthenticated && user && (
//                   <div className="absolute top-full right-0 mt-2 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl backdrop-blur-md z-50 max-h-96 overflow-hidden">
//                     <div className="p-4 space-y-3">
//                       {/* User Info */}
//                       <div className="text-center border-b border-gray-700 pb-3">
//                         <div className="w-12 h-12 bg-gradient-to-r from-[#EF5350] to-[#E57373] rounded-full flex items-center justify-center mx-auto mb-2">
//                           <span className="text-white font-bold text-sm">
//                             {user.full_name?.charAt(0).toUpperCase() || 'U'}
//                           </span>
//                         </div>
//                         <h3 className="text-white font-semibold truncate">{user.full_name}</h3>
//                         <p className="text-gray-400 text-sm truncate">{user.email}</p>
//                       </div>

//                       {/* Dropdown Items */}
//                       <div className="space-y-1 max-h-64 overflow-y-auto">
//                         {/* Receipts Section */}
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between px-2">
//                             <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
//                               {t('Receipts')}
//                             </h4>
//                             {loadingReceipts && (
//                               <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[#EF5350]"></div>
//                             )}
//                           </div>
                          
//                           {receipts.length === 0 && !loadingReceipts ? (
//                             <div className="text-center py-4 text-gray-500 text-sm">
//                               {t('No receipts found')}
//                             </div>
//                           ) : (
//                             receipts.slice(0, 5).map((receipt) => (
//                               <div
//                                 key={receipt._id}
//                                 onClick={() => handleViewReceipt(receipt)}
//                                 className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 cursor-pointer transition-all duration-200 group"
//                               >
//                                 <div className="flex-1 min-w-0">
//                                   <div className="flex items-center space-x-2">
//                                     <FiFileText className="w-4 h-4 text-[#EF5350] flex-shrink-0" />
//                                     <p className="text-white font-medium truncate text-sm">
//                                       Order #{receipt.order_id?.slice(-6) || 'N/A'}
//                                     </p>
//                                   </div>
//                                   <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
//                                     <span>{formatShortDate(receipt.created_at)}</span>
//                                     <span>{formatPrice(receipt.total_price)}</span>
//                                     <span className="capitalize">{receipt.status}</span>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                   <button
//                                     onClick={() => handleDeleteReceipt(receipt._id)}
//                                     className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
//                                   >
//                                     <FiTrash2 className="w-3 h-3" />
//                                   </button>
//                                 </div>
//                               </div>
//                             ))
//                           )}
                          
//                           {receipts.length > 5 && (
//                             <div className="text-center pt-2">
//                               <button className="text-xs text-[#EF5350] hover:text-[#E57373] transition-colors duration-200">
//                                 {t('View all receipts')} ({receipts.length})
//                               </button>
//                             </div>
//                           )}
//                         </div>

//                         <div className="border-t border-gray-700 pt-2">
//                           <button
//                             onClick={handleLogout}
//                             className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200"
//                           >
//                             <FiLogOut className="w-4 h-4" />
//                             <span className="font-medium">{t('Logout')}</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center space-x-3">
//             <Link href="/cart" className="relative">
//               <div className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group relative">
//                 <FiShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
//                 <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900 shadow-lg">
//                   {cartCount}
//                 </span>
//               </div>
//             </Link>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 hover:bg-[#EF5350] hover:scale-110 transform transition-all duration-300 group"
//             >
//               {isMenuOpen ? (
//                 <FiX className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
//               ) : (
//                 <FiMenu className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 backdrop-blur-2xl">
//             <div className="px-4 pt-6 pb-8 space-y-4">
//               {/* Menu Links */}
//               <div className="space-y-2">
//                 <Link
//                   href="/menu"
//                   className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-[#EF5350]/30 transform transition-all duration-300 group"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
//                     <span className="w-2 h-2 bg-[#EF5350] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
//                     {t('Menu')}
//                   </span>
//                 </Link>
//                 <Link
//                   href="/mission"
//                   className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-[#EF5350]/30 transform transition-all duration-300 group"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
//                     <span className="w-2 h-2 bg-[#EF5350] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
//                     {t('Mission')}
//                   </span>
//                 </Link>
//                 <Link
//                   href="/sushiboat"
//                   className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-2xl border border-transparent hover:border-[#EF5350]/30 transform transition-all duration-300 group"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
//                     <span className="w-2 h-2 bg-[#EF5350] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
//                     {t('SushiBoat')}
//                   </span>
//                 </Link>
//               </div>

//               {/* Mobile Phone Number - Now Dynamic */}
//               <div className="px-4 py-4 flex items-center space-x-3 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 mt-4">
//                 <FiPhone className="w-5 h-5 text-[#FFEBEE]" />
//                 <span className="text-white font-semibold">
//                   {contactInfo?.phone || "+1 (555) 123-4567"}
//                 </span>
//               </div>

//               {/* Mobile Additional Icons */}
//               <div className="flex space-x-3 px-4 pt-4">
//                 {/* Language Switcher Mobile */}
//                 <div className="flex-1">
//                   <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden">
//                     <button 
//                       onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
//                       className="w-full p-4 flex items-center justify-center space-x-2 hover:bg-[#EF5350] transform transition-all duration-300 group"
//                     >
//                       <FiGlobe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
//                       <span className="text-gray-300 group-hover:text-white font-medium text-sm">
//                         {t('Language')}
//                       </span>
//                       <FiChevronDown className={`w-3 h-3 text-gray-400 group-hover:text-white transition-transform duration-300 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
//                     </button>
                    
//                     {/* Mobile Language Options */}
//                     {isLanguageDropdownOpen && (
//                       <div className="border-t border-gray-700 space-y-1">
//                         <button
//                           onClick={() => handleLanguageChange('en')}
//                           className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
//                             language === 'en' 
//                               ? 'bg-[#EF5350] text-white' 
//                               : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                           }`}
//                         >
//                           <span className="text-lg">🇺🇸</span>
//                           <span className="font-medium">English</span>
//                         </button>
//                         <button
//                           onClick={() => handleLanguageChange('pt')}
//                           className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
//                             language === 'pt' 
//                               ? 'bg-[#EF5350] text-white' 
//                               : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                           }`}
//                         >
//                           <span className="text-lg">🇧🇷</span>
//                           <span className="font-medium">Português</span>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 {isAuthenticated ? (
//                   <div className="flex-1 space-y-2">
//                     <button 
//                       onClick={handleProfileNavigation}
//                       className="w-full bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:bg-[#EF5350] transform transition-all duration-300 group p-4 flex items-center justify-center space-x-2"
//                     >
//                       <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
//                       <span className="text-gray-300 group-hover:text-white font-medium text-sm">
//                         {t('Profile')}
//                       </span>
//                     </button>
//                     <button 
//                       onClick={handleLogout}
//                       className="w-full bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:bg-red-600 transform transition-all duration-300 group p-3 flex items-center justify-center space-x-2"
//                     >
//                       <FiLogOut className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
//                       <span className="text-gray-300 group-hover:text-white font-medium text-sm">
//                         {t('Logout')}
//                       </span>
//                     </button>
//                   </div>
//                 ) : (
//                   <button 
//                     onClick={() => {
//                       router.push("/login");
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex-1 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:bg-[#EF5350] transform transition-all duration-300 group p-4 flex items-center justify-center space-x-2"
//                   >
//                     <FiUser className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
//                     <span className="text-gray-300 group-hover:text-white font-medium text-sm">
//                       {t('Login')}
//                     </span>
//                   </button>
//                 )}
//               </div>

//               {/* User Info if logged in */}
//               {isAuthenticated && user && (
//                 <div className="px-4 py-3 bg-gray-800/50 rounded-2xl border border-gray-700">
//                   <p className="text-sm text-gray-300">{t('Logged in as')}:</p>
//                   <p className="text-white font-medium truncate">{user.full_name}</p>
//                   <p className="text-xs text-gray-400 truncate">{user.email}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Receipt Detail Modal */}
//       {selectedReceipt && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col border-2 border-[#EF5350]/20">
//             {/* Header */}
//             <div className="p-5 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white flex-shrink-0">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-xl font-bold">Order Receipt</h2>
//                   <p className="text-[#FFEBEE] text-sm">Order #{selectedReceipt.order_id?.slice(-8)}</p>
//                 </div>
//                 <button
//                   onClick={handleCloseReceipt}
//                   className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
            
//             {/* Content - Now scrollable with flexible height */}
//             <div className="flex-1 overflow-y-auto p-5 space-y-4">
//               {/* Order Summary */}
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-gray-600 text-xs font-medium">Customer</p>
//                   <p className="font-semibold text-sm">{selectedReceipt.customer_name}</p>
//                 </div>
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-gray-600 text-xs font-medium">Order Type</p>
//                   <p className="font-semibold text-sm capitalize">{selectedReceipt.order_type}</p>
//                 </div>
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-gray-600 text-xs font-medium">Payment</p>
//                   <p className="font-semibold text-sm capitalize">{selectedReceipt.payment_method}</p>
//                 </div>
//                 <div className="bg-gray-50 p-3 rounded-lg">
//                   <p className="text-gray-600 text-xs font-medium">Status</p>
//                   <p className="font-semibold text-sm capitalize text-[#EF5350]">{selectedReceipt.status}</p>
//                 </div>
//                 <div className="bg-gray-50 p-3 rounded-lg col-span-2">
//                   <p className="text-gray-600 text-xs font-medium">Order Date</p>
//                   <p className="font-semibold text-sm">{formatDate(selectedReceipt.created_at)}</p>
//                 </div>
//               </div>

//               {/* Items */}
//               <div className="border-t pt-4">
//                 <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-600  gap-2">
//                   <FiFileText className="text-[#EF5350]" />
//                   Order Items
//                 </h3>
//                 <div className="space-y-1">
//                   {selectedReceipt.items.map((item, index) => (
//                     <div key={index} className="flex justify-between items-center py-2 border-b">
//                       <div className="flex-1">
//                         <p className="font-medium text-sm text-gray-600">{item.name}</p>
//                         <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
//                       </div>
//                       <p className="font-semibold text-sm text-gray-600 ">${(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Total */}
//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center text-lg font-bold bg-gradient-to-r text-gray-600  p-3 rounded-lg">
//                   <span>Total Amount</span>
//                   <span className="text-[#EF5350]">{formatPrice(selectedReceipt.total_price)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Actions - Now always visible with proper styling */}
//             <div className="p-5 border-t flex flex-col sm:flex-row gap-3 flex-shrink-0">
//               <button
//                 onClick={() => downloadReceiptPDFFromHTML(selectedReceipt)}
//                 disabled={downloadingPdf === selectedReceipt._id}
//                 className="flex-1 flex items-center justify-center space-x-2 px-4 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl text-base"
//               >
//                 {downloadingPdf === selectedReceipt._id ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Generating PDF...</span>
//                   </>
//                 ) : (
//                   <>
//                     <FiDownload className="w-5 h-5" />
//                     <span>Download PDF</span>
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={() => handleDeleteReceipt(selectedReceipt._id)}
//                 className="flex-1 flex items-center justify-center space-x-2 px-4 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-base"
//               >
//                 <FiTrash2 className="w-5 h-5" />
//                 <span>Delete Receipt</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border-2 border-red-200">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FiTrash2 className="w-8 h-8 text-red-600" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Receipt?</h3>
//               <p className="text-gray-600 mb-6 text-sm">
//                 Are you sure you want to delete this receipt? This action cannot be undone.
//               </p>
              
//               <div className="flex space-x-3 justify-center ">
//                 <button
//                   onClick={cancelDeleteReceipt}
//                   className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDeleteReceipt}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

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
  FiFileText,
  FiTrash2,
  FiDownload
} from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Receipt {
  _id: string;
  order_id: string;
  total_price: number;
  order_type: string;
  payment_method: string;
  status: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface ContactInfo {
  phone: string;
  email: string;
  updated_at: string;
}

interface LogoLinkData {
  id?: string;
  logo: string | null;
  facebook: string | null;
  instagram: string | null;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loadingReceipts, setLoadingReceipts] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [receiptToDelete, setReceiptToDelete] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState<string | null>(null);
  const [logoData, setLogoData] = useState<LogoLinkData | null>(null);
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t, isTranslating, translatePage } = useLanguage();
  const router = useRouter();
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch contact information
  const fetchContactInfo = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
      const response = await fetch(`${API_BASE_URL}/admincontact`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setContactInfo(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      setContactInfo({
        phone: "+1 (555) 123-4567",
        email: "contact@sushimaster.com",
        updated_at: new Date().toISOString()
      });
    }
  };

  // Fetch logo data
  const fetchLogoData = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
      const response = await fetch(`${API_BASE_URL}/logo/logo-link`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setLogoData(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching logo data:', error);
    }
  };

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

  // Fetch receipts when user dropdown opens
  useEffect(() => {
    if (isUserDropdownOpen && isAuthenticated && user) {
      fetchReceipts();
    }
  }, [isUserDropdownOpen, isAuthenticated, user]);

  // Fetch contact info and logo data on component mount
  useEffect(() => {
    fetchContactInfo();
    fetchLogoData();
  }, []);

  const fetchReceipts = async () => {
    if (!user) return;
    
    setLoadingReceipts(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
      const response = await fetch(`${API_BASE_URL}/receipts/user/${user._id}`);
      
      console.log('Fetching receipts for user:', user._id);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Receipts API response:', result);
        
        if (result.success) {
          console.log('Fetched receipts:', result.data.length);
          setReceipts(result.data);
        } else {
          console.error('Failed to fetch receipts:', result.message);
        }
      } else {
        console.error('HTTP error fetching receipts:', response.status);
      }
    } catch (error) {
      console.error('Error fetching receipts:', error);
    } finally {
      setLoadingReceipts(false);
    }
  };

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

  const handleViewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleCloseReceipt = () => {
    setSelectedReceipt(null);
  };

  const handleDeleteReceipt = (receiptId: string) => {
    setReceiptToDelete(receiptId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteReceipt = async () => {
    if (!receiptToDelete) return;

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
      const response = await fetch(`${API_BASE_URL}/receipts/${receiptToDelete}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setReceipts(receipts.filter(receipt => receipt._id !== receiptToDelete));
        if (selectedReceipt?._id === receiptToDelete) {
          setSelectedReceipt(null);
        }
      }
    } catch (error) {
      console.error('Error deleting receipt:', error);
    } finally {
      setShowDeleteConfirm(false);
      setReceiptToDelete(null);
    }
  };

  const cancelDeleteReceipt = () => {
    setShowDeleteConfirm(false);
    setReceiptToDelete(null);
  };

  // PDF Download Function
  const downloadReceiptPDF = async (receipt: Receipt) => {
    setDownloadingPdf(receipt._id);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Add logo and header
      pdf.setFillColor(239, 83, 80); // #EF5350
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      // Title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SUSHI MASTER', pageWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.text('RECEIPT', pageWidth / 2, 30, { align: 'center' });
      
      let yPosition = 60;
      
      // Receipt Information
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Receipt Information', 20, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Receipt ID: ${receipt._id}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Order ID: ${receipt.order_id}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Date: ${formatDate(receipt.created_at)}`, 20, yPosition);
      yPosition += 15;
      
      // Customer Information
      pdf.setFont('helvetica', 'bold');
      pdf.text('Customer Information', 20, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Name: ${receipt.customer_name}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Email: ${receipt.customer_email}`, 20, yPosition);
      yPosition += 15;
      
      // Order Details
      pdf.setFont('helvetica', 'bold');
      pdf.text('Order Details', 20, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Order Type: ${receipt.order_type}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Payment Method: ${receipt.payment_method}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Status: ${receipt.status}`, 20, yPosition);
      yPosition += 15;
      
      // Items Table Header
      pdf.setFont('helvetica', 'bold');
      pdf.text('Item', 20, yPosition);
      pdf.text('Qty', 120, yPosition);
      pdf.text('Price', 160, yPosition);
      pdf.text('Total', pageWidth - 20, yPosition, { align: 'right' });
      yPosition += 8;
      
      // Draw line
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;
      
      // Items
      pdf.setFont('helvetica', 'normal');
      let subtotal = 0;
      
      receipt.items.forEach((item, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }
        
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Item name (wrapped if too long)
        const itemName = item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name;
        pdf.text(itemName, 20, yPosition);
        pdf.text(item.quantity.toString(), 120, yPosition);
        pdf.text(`$${item.price.toFixed(2)}`, 160, yPosition);
        pdf.text(`$${itemTotal.toFixed(2)}`, pageWidth - 20, yPosition, { align: 'right' });
        
        yPosition += 8;
      });
      
      yPosition += 10;
      
      // Total
      pdf.setFont('helvetica', 'bold');
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;
      pdf.text(`Total Amount: $${receipt.total_price.toFixed(2)}`, pageWidth - 20, yPosition, { align: 'right' });
      
      yPosition += 20;
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text('Thank you for dining with us!', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 6;
      pdf.text('Sushi Master - Fresh Sushi Experience', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 6;
      pdf.text('Contact: support@sushimaster.com', pageWidth / 2, yPosition, { align: 'center' });
      
      // Save PDF
      pdf.save(`receipt-${receipt.order_id}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingPdf(null);
    }
  };

  // Alternative HTML to PDF conversion
  const downloadReceiptPDFFromHTML = async (receipt: Receipt) => {
    setDownloadingPdf(receipt._id);
    try {
      // Create a temporary div for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '800px';
      tempDiv.style.padding = '20px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.color = 'black';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      
      tempDiv.innerHTML = `
        <div id="receipt-pdf" style="max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #EF5350; border-radius: 10px;">
          <!-- Header -->
          <div style="background: #EF5350; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">SUSHI MASTER</h1>
            <p style="margin: 5px 0 0 0; font-size: 18px;">RECEIPT</p>
          </div>
          
          <!-- Receipt Information -->
          <div style="margin-bottom: 20px;">
            <h2 style="color: #EF5350; border-bottom: 2px solid #EF5350; padding-bottom: 5px;">Receipt Information</h2>
            <p><strong>Receipt ID:</strong> ${receipt._id}</p>
            <p><strong>Order ID:</strong> ${receipt.order_id}</p>
            <p><strong>Date:</strong> ${formatDate(receipt.created_at)}</p>
          </div>
          
          <!-- Customer Information -->
          <div style="margin-bottom: 20px;">
            <h2 style="color: #EF5350; border-bottom: 2px solid #EF5350; padding-bottom: 5px;">Customer Information</h2>
            <p><strong>Name:</strong> ${receipt.customer_name}</p>
            <p><strong>Email:</strong> ${receipt.customer_email}</p>
          </div>
          
          <!-- Order Details -->
          <div style="margin-bottom: 20px;">
            <h2 style="color: #EF5350; border-bottom: 2px solid #EF5350; padding-bottom: 5px;">Order Details</h2>
            <p><strong>Order Type:</strong> ${receipt.order_type}</p>
            <p><strong>Payment Method:</strong> ${receipt.payment_method}</p>
            <p><strong>Status:</strong> ${receipt.status}</p>
          </div>
          
          <!-- Items Table -->
          <div style="margin-bottom: 20px;">
            <h2 style="color: #EF5350; border-bottom: 2px solid #EF5350; padding-bottom: 5px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #EF5350;">Item</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #EF5350;">Qty</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #EF5350;">Price</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #EF5350;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${receipt.items.map(item => `
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.name}</td>
                    <td style="padding: 12px; text-align: center; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #ddd;">$${item.price.toFixed(2)}</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #ddd;">$${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr style="background: #f8f9fa;">
                  <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #EF5350;">Total Amount:</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #EF5350;">$${receipt.total_price.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #EF5350; color: #666;">
            <p style="margin: 5px 0;"><strong>Thank you for dining with us!</strong></p>
            <p style="margin: 5px 0;">Sushi Master - Fresh Sushi Experience</p>
            <p style="margin: 5px 0;">Contact: support@sushimaster.com</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(tempDiv);
      
      const canvas = await html2canvas(tempDiv, {
        // scale: 2,
        useCORS: true,
        logging: false
      });
      
      document.body.removeChild(tempDiv);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgHeight / imgWidth;
      const pdfImgWidth = pageWidth - 20;
      const pdfImgHeight = pdfImgWidth * ratio;
      
      pdf.addImage(imgData, 'PNG', 10, 10, pdfImgWidth, pdfImgHeight);
      pdf.save(`receipt-${receipt.order_id}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF from HTML:', error);
      // Fallback to direct PDF generation
      await downloadReceiptPDF(receipt);
    } finally {
      setDownloadingPdf(null);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left - Now Dynamic */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              {logoData?.logo ? (
                // Dynamic logo from API
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-transform duration-300 border border-[#EF5350]/30 overflow-hidden">
                  <img 
                    src={logoData.logo} 
                    alt="SushiMaster Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                // Fallback logo
                <div className="w-12 h-12 bg-gradient-to-r from-[#EF5350] to-[#E57373] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-transform duration-300 border border-[#EF5350]/30">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
              )}
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
            {/* Phone Number - Now Dynamic */}
            <div className="flex items-center space-x-3 bg-gray-800/70 backdrop-blur-md rounded-2xl px-5 py-3 border border-gray-700 hover:border-[#EF5350]/50 transition-all duration-300 group">
              <FiPhone className="w-4 h-4 text-[#FFEBEE] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                {contactInfo?.phone || "+1 (555) 123-4567"}
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
                  <div className="absolute top-full right-0 mt-2 w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl backdrop-blur-md z-50 max-h-96 overflow-hidden">
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
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {/* Receipts Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between px-2">
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                              {t('Receipts')}
                            </h4>
                            {loadingReceipts && (
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[#EF5350]"></div>
                            )}
                          </div>
                          
                          {receipts.length === 0 && !loadingReceipts ? (
                            <div className="text-center py-4 text-gray-500 text-sm">
                              {t('No receipts found')}
                            </div>
                          ) : (
                            receipts.slice(0, 5).map((receipt) => (
                              <div
                                key={receipt._id}
                                onClick={() => handleViewReceipt(receipt)}
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 cursor-pointer transition-all duration-200 group"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <FiFileText className="w-4 h-4 text-[#EF5350] flex-shrink-0" />
                                    <p className="text-white font-medium truncate text-sm">
                                      Order #{receipt.order_id?.slice(-6) || 'N/A'}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                                    <span>{formatShortDate(receipt.created_at)}</span>
                                    <span>{formatPrice(receipt.total_price)}</span>
                                    <span className="capitalize">{receipt.status}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <button
                                    onClick={() => handleDeleteReceipt(receipt._id)}
                                    className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                                  >
                                    <FiTrash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                          
                          {receipts.length > 5 && (
                            <div className="text-center pt-2">
                              <button className="text-xs text-[#EF5350] hover:text-[#E57373] transition-colors duration-200">
                                {t('View all receipts')} ({receipts.length})
                              </button>
                            </div>
                          )}
                        </div>

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

              {/* Mobile Phone Number - Now Dynamic */}
              <div className="px-4 py-4 flex items-center space-x-3 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 mt-4">
                <FiPhone className="w-5 h-5 text-[#FFEBEE]" />
                <span className="text-white font-semibold">
                  {contactInfo?.phone || "+1 (555) 123-4567"}
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

      {/* Receipt Detail Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col border-2 border-[#EF5350]/20">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Order Receipt</h2>
                  <p className="text-[#FFEBEE] text-sm">Order #{selectedReceipt.order_id?.slice(-8)}</p>
                </div>
                <button
                  onClick={handleCloseReceipt}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Content - Now scrollable with flexible height */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs font-medium">Customer</p>
                  <p className="font-semibold text-sm">{selectedReceipt.customer_name}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs font-medium">Order Type</p>
                  <p className="font-semibold text-sm capitalize">{selectedReceipt.order_type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs font-medium">Payment</p>
                  <p className="font-semibold text-sm capitalize">{selectedReceipt.payment_method}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs font-medium">Status</p>
                  <p className="font-semibold text-sm capitalize text-[#EF5350]">{selectedReceipt.status}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                  <p className="text-gray-600 text-xs font-medium">Order Date</p>
                  <p className="font-semibold text-sm">{formatDate(selectedReceipt.created_at)}</p>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-600  gap-2">
                  <FiFileText className="text-[#EF5350]" />
                  Order Items
                </h3>
                <div className="space-y-1">
                  {selectedReceipt.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-600">{item.name}</p>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm text-gray-600 ">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold bg-gradient-to-r text-gray-600  p-3 rounded-lg">
                  <span>Total Amount</span>
                  <span className="text-[#EF5350]">{formatPrice(selectedReceipt.total_price)}</span>
                </div>
              </div>
            </div>

            {/* Actions - Now always visible with proper styling */}
            <div className="p-5 border-t flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => downloadReceiptPDFFromHTML(selectedReceipt)}
                disabled={downloadingPdf === selectedReceipt._id}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl text-base"
              >
                {downloadingPdf === selectedReceipt._id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <FiDownload className="w-5 h-5" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleDeleteReceipt(selectedReceipt._id)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-base"
              >
                <FiTrash2 className="w-5 h-5" />
                <span>Delete Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border-2 border-red-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Receipt?</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Are you sure you want to delete this receipt? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3 justify-center ">
                <button
                  onClick={cancelDeleteReceipt}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteReceipt}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
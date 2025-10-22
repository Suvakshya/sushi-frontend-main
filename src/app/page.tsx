// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import Navbar from "../components/organisms/Navbar/page";
// // // import Footer from "../components/organisms/Footer/page";
// // // import { useRouter } from "next/navigation";



// // // interface Slider {
// // //   _id: string;
// // //   name: string;
// // //   image: string;
// // //   created_at: string;
// // //   updated_at: string;
// // // }

// // // interface MenuItem {
// // //   _id: string;
// // //   name: string;
// // //   description: string;
// // //   price: number;
// // //   quantity: number;
// // //   category: string;
// // //   image: string;
// // //   is_available: boolean;
// // //   created_at: string;
// // //   updated_at: string;
// // // }

// // // export default function Home() {
// // //   const [sliders, setSliders] = useState<Slider[]>([]);
// // //   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
// // //   const [currentSlide, setCurrentSlide] = useState(0);
// // //   const [loading, setLoading] = useState(true);
// // //   const [menuLoading, setMenuLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [menuError, setMenuError] = useState<string | null>(null);

// // //   const router = useRouter();

// // //   // Fetch sliders from backend
// // //   const fetchSliders = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       // const API =
// // //       //   process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";
// // //       const API =
// // //         process.env.NEXT_PUBLIC_API_BASE_URL ||
// // //         "https://sushi-backend-main.vercel.app/api/v1/sliders";

// // //       const response = await fetch(`${API}/sliders`);

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }

// // //       const result = await response.json();

// // //       if (result.success && result.data) {
// // //         setSliders(result.data);
// // //       } else {
// // //         throw new Error(result.message || "Failed to fetch sliders");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching sliders:", error);
// // //       setError(
// // //         error instanceof Error ? error.message : "Failed to load sliders"
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Fetch menu items from backend
// // //   const fetchMenuItems = async () => {
// // //     try {
// // //       setMenuLoading(true);
// // //       setMenuError(null);
// // //       const API =
// // //         process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";

// // //       const response = await fetch(`${API}/menu`);

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }

// // //       const result = await response.json();

// // //       if (result.success && result.data) {
// // //         // Filter only available items and limit to 4 for popular dishes
// // //         const availableItems = result.data
// // //           .filter((item: MenuItem) => item.is_available)
// // //           .slice(0, 4);
// // //         setMenuItems(availableItems);
// // //       } else {
// // //         throw new Error(result.message || "Failed to fetch menu items");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching menu items:", error);
// // //       setMenuError(
// // //         error instanceof Error ? error.message : "Failed to load menu items"
// // //       );
// // //     } finally {
// // //       setMenuLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchSliders();
// // //     fetchMenuItems();
// // //   }, []);

// // //   // Auto-slide functionality
// // //   useEffect(() => {
// // //     if (sliders.length <= 1) return;

// // //     const interval = setInterval(() => {
// // //       setCurrentSlide((prev) => (prev + 1) % sliders.length);
// // //     }, 3000);

// // //     return () => clearInterval(interval);
// // //   }, [sliders.length]);

// // //   // Manual slide navigation
// // //   const goToSlide = (index: number) => {
// // //     setCurrentSlide(index);
// // //   };

// // //   const nextSlide = () => {
// // //     setCurrentSlide((prev) => (prev + 1) % sliders.length);
// // //   };

// // //   const prevSlide = () => {
// // //     setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
// // //   };

// // //   // Format price to display with dollar sign
// // //   const formatPrice = (price: number) => {
// // //     return `$${price}`;
// // //   };

// // //   // Get emoji based on category
// // //   const getCategoryEmoji = (category: string) => {
// // //     const emojiMap: { [key: string]: string } = {
// // //       sushi: "🍣",
// // //       sashimi: "🐟",
// // //       drinks: "🍹",
// // //       appetizers: "🥢",
// // //       desserts: "🍰",
// // //     };
// // //     return emojiMap[category] || "🍽️";
// // //   };

// // //   // If no sliders, show default background
// // //   const defaultBackground = "bg-gradient-to-r from-[#EF5350] to-[#E57373]";

// // //   return (
// // //     <>
// // //       <Navbar />

// // //       <main className="min-h-screen bg-gray-50">
// // //         {/* Hero Section with Slider - Decreased height */}
// // //         <section className="relative h-[75vh] overflow-hidden">
// // //           {loading ? (
// // //             // Loading state
// // //             <div
// // //               className={`w-full h-full ${defaultBackground} flex items-center justify-center`}
// // //             >
// // //               <div className="text-center">
// // //                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
// // //                 <p className="text-white text-lg">Loading...</p>
// // //               </div>
// // //             </div>
// // //           ) : error ? (
// // //             // Error state
// // //             <div
// // //               className={`w-full h-full ${defaultBackground} flex items-center justify-center`}
// // //             >
// // //               <div className="text-center">
// // //                 <p className="text-white text-lg mb-4">Failed to load slider</p>
// // //                 <button
// // //                   onClick={fetchSliders}
// // //                   className="bg-white text-[#EF5350] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
// // //                 >
// // //                   Retry
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ) : sliders.length > 0 ? (
// // //             // Slider with images from backend
// // //             <>
// // //               {/* Slides Container */}
// // //               <div className="relative w-full h-full">
// // //                 {sliders.map((slider, index) => (
// // //                   <div
// // //                     key={slider._id}
// // //                     className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
// // //                       index === currentSlide ? "opacity-100" : "opacity-0"
// // //                     }`}
// // //                   >
// // //                     {/* Image as img element */}
// // //                     <div className="relative w-full h-full">
// // //                       <img
// // //                         src={slider.image}
// // //                         alt={slider.name}
// // //                         className="w-full h-full object-cover"
// // //                       />

// // //                       {/* Content with Order Online button at bottom */}
// // //                       <div className="absolute inset-0 flex items-end justify-center pb-12">
// // //                         <div className="text-center">
// // //                           {/* <button className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
// // //                             Order Online
// // //                           </button> */}
// // //                           <button
// // //                             onClick={() => router.push("/menu")}
// // //                             className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
// // //                           >
// // //                             Order Now
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               {/* Minimal Navigation Arrows */}
// // //               {sliders.length > 1 && (
// // //                 <>
// // //                   <button
// // //                     onClick={prevSlide}
// // //                     className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
// // //                     aria-label="Previous slide"
// // //                   >
// // //                     <svg
// // //                       className="w-5 h-5"
// // //                       fill="none"
// // //                       stroke="currentColor"
// // //                       viewBox="0 0 24 24"
// // //                     >
// // //                       <path
// // //                         strokeLinecap="round"
// // //                         strokeLinejoin="round"
// // //                         strokeWidth={2}
// // //                         d="M15 19l-7-7 7-7"
// // //                       />
// // //                     </svg>
// // //                   </button>
// // //                   <button
// // //                     onClick={nextSlide}
// // //                     className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
// // //                     aria-label="Next slide"
// // //                   >
// // //                     <svg
// // //                       className="w-5 h-5"
// // //                       fill="none"
// // //                       stroke="currentColor"
// // //                       viewBox="0 0 24 24"
// // //                     >
// // //                       <path
// // //                         strokeLinecap="round"
// // //                         strokeLinejoin="round"
// // //                         strokeWidth={2}
// // //                         d="M9 5l7 7-7 7"
// // //                       />
// // //                     </svg>
// // //                   </button>
// // //                 </>
// // //               )}

// // //               {/* Minimal Slide Indicators */}
// // //               {sliders.length > 1 && (
// // //                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
// // //                   {sliders.map((_, index) => (
// // //                     <button
// // //                       key={index}
// // //                       onClick={() => goToSlide(index)}
// // //                       className={`w-2 h-2 rounded-full transition-all duration-300 ${
// // //                         index === currentSlide
// // //                           ? "bg-white scale-125"
// // //                           : "bg-white bg-opacity-40 hover:bg-opacity-60"
// // //                       }`}
// // //                       aria-label={`Go to slide ${index + 1}`}
// // //                     />
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </>
// // //           ) : (
// // //             // Default hero section when no sliders
// // //             <div
// // //               className={`w-full h-full ${defaultBackground} flex items-end justify-center pb-12`}
// // //             >
// // //               <div className="text-center">
// // //                 <button className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
// // //                   Order Online
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </section>

// // //         {/* Popular Dishes Section - Dynamic */}
// // //         <section className="py-16 bg-gray-100">
// // //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
// // //               Popular Dishes
// // //             </h2>
// // //             {menuLoading ? (
// // //               // Loading state for menu items
// // //               <div className="flex justify-center items-center py-12">
// // //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350]"></div>
// // //               </div>
// // //             ) : menuError ? (
// // //               // Error state for menu items
// // //               <div className="text-center py-12">
// // //                 <p className="text-gray-600 text-lg mb-4">
// // //                   Failed to load menu items
// // //                 </p>
// // //                 <button
// // //                   onClick={fetchMenuItems}
// // //                   className="bg-[#EF5350] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
// // //                 >
// // //                   Try Again
// // //                 </button>
// // //               </div>
// // //             ) : menuItems.length > 0 ? (
// // //               // Dynamic menu items grid
// // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// // //                 {menuItems.map((item) => (
// // //                   <div
// // //                     key={item._id}
// // //                     className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
// // //                   >
// // //                     {item.image ? (
// // //                       <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg">
// // //                         <img
// // //                           src={item.image}
// // //                           alt={item.name}
// // //                           className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
// // //                           loading="lazy"
// // //                           // onError={(e) => {
// // //                           //   e.target.style.display = "none";
// // //                           //   e.target.nextElementSibling.style.display = "flex";
// // //                           // }}
// // //                           onError={(e) => {
// // //                             const target = e.target as HTMLImageElement;
// // //                             target.style.display = "none";
// // //                             if (target.nextElementSibling) {
// // //                               (
// // //                                 target.nextElementSibling as HTMLElement
// // //                               ).style.display = "flex";
// // //                             }
// // //                           }}
// // //                         />
// // //                         <div className="hidden w-full h-full items-center justify-center text-gray-400">
// // //                           {getCategoryEmoji(item.category)}
// // //                         </div>
// // //                       </div>
// // //                     ) : (
// // //                       <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center shadow-lg">
// // //                         <span className="text-5xl">
// // //                           {getCategoryEmoji(item.category)}
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                     <h3 className="text-xl font-bold mb-3 text-gray-900">
// // //                       {item.name}
// // //                     </h3>
// // //                     <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
// // //                       {item.description}
// // //                     </p>
// // //                     <p className="text-[#EF5350] font-bold text-xl">
// // //                       {formatPrice(item.price)}
// // //                     </p>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             ) : (
// // //               // No menu items available
// // //               <div className="text-center py-12">
// // //                 <p className="text-gray-600 text-lg">
// // //                   No popular dishes available at the moment.
// // //                 </p>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </section>

// // //         {/* Why Choose SushiMaster? Section */}
// // //         <section className="py-16 bg-white">
// // //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
// // //               Why Choose SushiMaster?
// // //             </h2>
// // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // //               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
// // //                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
// // //                   <span className="text-3xl">🎣</span>
// // //                 </div>
// // //                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
// // //                   Fresh Daily
// // //                 </h3>
// // //                 <p className="text-gray-600">
// // //                   We source the freshest fish daily from trusted suppliers
// // //                 </p>
// // //               </div>

// // //               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
// // //                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
// // //                   <span className="text-3xl">👨‍🍳</span>
// // //                 </div>
// // //                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
// // //                   Master Chefs
// // //                 </h3>
// // //                 <p className="text-gray-600">
// // //                   Our chefs trained in Japan with decades of experience
// // //                 </p>
// // //               </div>

// // //               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
// // //                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
// // //                   <span className="text-3xl">🚀</span>
// // //                 </div>
// // //                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
// // //                   Fast Delivery
// // //                 </h3>
// // //                 <p className="text-gray-600">
// // //                   Quick delivery to keep your sushi fresh and delicious
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* CTA Section */}
// // //         <section className="py-16 bg-white">
// // //           <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
// // //             <h2 className="text-3xl font-bold text-gray-900 mb-4">
// // //               Ready to experience the best sushi?
// // //             </h2>
// // //             <p className="text-lg text-gray-600 mb-8">
// // //               Order online or visit us today!
// // //             </p>
// // //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// // //               {/* <button className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-all duration-300 transform hover:scale-105">
// // //                 Order Now
// // //               </button> */}
// // //               <button
// // //                 onClick={() => router.push("/menu")}
// // //                 className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-all duration-300 transform hover:scale-105"
// // //               >
// // //                 Order Now
// // //               </button>

// // //               <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
// // //                 Call Us: (555) 123-4567
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </section>
// // //       </main>

// // //       <Footer />
// // //     </>
// // //   );
// // // }
// // "use client";

// // import { useState, useEffect } from "react";
// // import Navbar from "../components/organisms/Navbar/page";
// // import Footer from "../components/organisms/Footer/page";
// // import { useRouter } from "next/navigation";

// // interface Slider {
// //   _id: string;
// //   name: string;
// //   image: string;
// //   created_at: string;
// //   updated_at: string;
// // }

// // interface MenuItem {
// //   _id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   quantity: number;
// //   category: string;
// //   image: string;
// //   is_available: boolean;
// //   created_at: string;
// //   updated_at: string;
// // }

// // interface CartItem extends MenuItem {
// //   cartQuantity: number;
// // }

// // export default function Home() {
// //   const [sliders, setSliders] = useState<Slider[]>([]);
// //   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [menuLoading, setMenuLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [menuError, setMenuError] = useState<string | null>(null);
// //   const [cart, setCart] = useState<CartItem[]>([]);
// //   const [showCartNotification, setShowCartNotification] = useState(false);

// //   const router = useRouter();

// //   // Fetch sliders from backend
// //   const fetchSliders = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const API =
// //         process.env.NEXT_PUBLIC_API_BASE_URL ||
// //         "https://sushi-backend-main.vercel.app/api/v1/sliders";

// //       const response = await fetch(`${API}/sliders`);

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const result = await response.json();

// //       if (result.success && result.data) {
// //         setSliders(result.data);
// //       } else {
// //         throw new Error(result.message || "Failed to fetch sliders");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching sliders:", error);
// //       setError(
// //         error instanceof Error ? error.message : "Failed to load sliders"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch menu items from backend
// //   const fetchMenuItems = async () => {
// //     try {
// //       setMenuLoading(true);
// //       setMenuError(null);
// //       const API =
// //         process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";

// //       const response = await fetch(`${API}/menu`);

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const result = await response.json();

// //       if (result.success && result.data) {
// //         // Filter only available items and limit to 4 for popular dishes
// //         const availableItems = result.data
// //           .filter((item: MenuItem) => item.is_available)
// //           .slice(0, 4);
// //         setMenuItems(availableItems);
// //       } else {
// //         throw new Error(result.message || "Failed to fetch menu items");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching menu items:", error);
// //       setMenuError(
// //         error instanceof Error ? error.message : "Failed to load menu items"
// //       );
// //     } finally {
// //       setMenuLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSliders();
// //     fetchMenuItems();
// //     // Load cart from localStorage on component mount
// //     const savedCart = localStorage.getItem('sushiCart');
// //     if (savedCart) {
// //       setCart(JSON.parse(savedCart));
// //     }
// //   }, []);

// //   // Save cart to localStorage whenever cart changes
// //   useEffect(() => {
// //     localStorage.setItem('sushiCart', JSON.stringify(cart));
// //   }, [cart]);

// //   // Add to cart function
// //   const addToCart = (item: MenuItem) => {
// //     setCart(prevCart => {
// //       const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      
// //       if (existingItem) {
// //         // If item already exists, increase quantity
// //         return prevCart.map(cartItem =>
// //           cartItem._id === item._id
// //             ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
// //             : cartItem
// //         );
// //       } else {
// //         // If item doesn't exist, add it with quantity 1
// //         return [...prevCart, { ...item, cartQuantity: 1 }];
// //       }
// //     });

// //     // Show notification
// //     setShowCartNotification(true);
// //     setTimeout(() => setShowCartNotification(false), 3000);
// //   };

// //   // Get total cart items count
// //   const getTotalCartItems = () => {
// //     return cart.reduce((total, item) => total + item.cartQuantity, 0);
// //   };

// //   // Auto-slide functionality
// //   useEffect(() => {
// //     if (sliders.length <= 1) return;

// //     const interval = setInterval(() => {
// //       setCurrentSlide((prev) => (prev + 1) % sliders.length);
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, [sliders.length]);

// //   // Manual slide navigation
// //   const goToSlide = (index: number) => {
// //     setCurrentSlide(index);
// //   };

// //   const nextSlide = () => {
// //     setCurrentSlide((prev) => (prev + 1) % sliders.length);
// //   };

// //   const prevSlide = () => {
// //     setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
// //   };

// //   // Format price to display with dollar sign
// //   const formatPrice = (price: number) => {
// //     return `$${price}`;
// //   };

// //   // Get emoji based on category
// //   const getCategoryEmoji = (category: string) => {
// //     const emojiMap: { [key: string]: string } = {
// //       sushi: "🍣",
// //       sashimi: "🐟",
// //       drinks: "🍹",
// //       appetizers: "🥢",
// //       desserts: "🍰",
// //     };
// //     return emojiMap[category] || "🍽️";
// //   };

// //   // If no sliders, show default background
// //   const defaultBackground = "bg-gradient-to-r from-[#EF5350] to-[#E57373]";

// //   return (
// //     <>
// //       <Navbar />

// //       {/* Cart Notification */}
// //       {showCartNotification && (
// //         <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
// //           <span className="font-semibold">✓ Added to cart!</span>
// //         </div>
// //       )}

// //       <main className="min-h-screen bg-gray-50">
// //         {/* Hero Section with Slider - Decreased height */}
// //         <section className="relative h-[75vh] overflow-hidden">
// //           {loading ? (
// //             // Loading state
// //             <div
// //               className={`w-full h-full ${defaultBackground} flex items-center justify-center`}
// //             >
// //               <div className="text-center">
// //                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
// //                 <p className="text-white text-lg">Loading...</p>
// //               </div>
// //             </div>
// //           ) : error ? (
// //             // Error state
// //             <div
// //               className={`w-full h-full ${defaultBackground} flex items-center justify-center`}
// //             >
// //               <div className="text-center">
// //                 <p className="text-white text-lg mb-4">Failed to load slider</p>
// //                 <button
// //                   onClick={fetchSliders}
// //                   className="bg-white text-[#EF5350] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
// //                 >
// //                   Retry
// //                 </button>
// //               </div>
// //             </div>
// //           ) : sliders.length > 0 ? (
// //             // Slider with images from backend
// //             <>
// //               {/* Slides Container */}
// //               <div className="relative w-full h-full">
// //                 {sliders.map((slider, index) => (
// //                   <div
// //                     key={slider._id}
// //                     className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
// //                       index === currentSlide ? "opacity-100" : "opacity-0"
// //                     }`}
// //                   >
// //                     {/* Image as img element */}
// //                     <div className="relative w-full h-full">
// //                       <img
// //                         src={slider.image}
// //                         alt={slider.name}
// //                         className="w-full h-full object-cover"
// //                       />

// //                       {/* Content with Order Online button at bottom */}
// //                       <div className="absolute inset-0 flex items-end justify-center pb-12">
// //                         <div className="text-center">
// //                           <button
// //                             onClick={() => router.push("/menu")}
// //                             className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
// //                           >
// //                             Order Now
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Minimal Navigation Arrows */}
// //               {sliders.length > 1 && (
// //                 <>
// //                   <button
// //                     onClick={prevSlide}
// //                     className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
// //                     aria-label="Previous slide"
// //                   >
// //                     <svg
// //                       className="w-5 h-5"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M15 19l-7-7 7-7"
// //                       />
// //                     </svg>
// //                   </button>
// //                   <button
// //                     onClick={nextSlide}
// //                     className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
// //                     aria-label="Next slide"
// //                   >
// //                     <svg
// //                       className="w-5 h-5"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M9 5l7 7-7 7"
// //                       />
// //                     </svg>
// //                   </button>
// //                 </>
// //               )}

// //               {/* Minimal Slide Indicators */}
// //               {sliders.length > 1 && (
// //                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
// //                   {sliders.map((_, index) => (
// //                     <button
// //                       key={index}
// //                       onClick={() => goToSlide(index)}
// //                       className={`w-2 h-2 rounded-full transition-all duration-300 ${
// //                         index === currentSlide
// //                           ? "bg-white scale-125"
// //                           : "bg-white bg-opacity-40 hover:bg-opacity-60"
// //                       }`}
// //                       aria-label={`Go to slide ${index + 1}`}
// //                     />
// //                   ))}
// //                 </div>
// //               )}
// //             </>
// //           ) : (
// //             // Default hero section when no sliders
// //             <div
// //               className={`w-full h-full ${defaultBackground} flex items-end justify-center pb-12`}
// //             >
// //               <div className="text-center">
// //                 <button className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
// //                   Order Online
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </section>

// //         {/* Popular Dishes Section - Dynamic */}
// //         <section className="py-16 bg-gray-100">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
// //               Popular Dishes
// //             </h2>
// //             {menuLoading ? (
// //               // Loading state for menu items
// //               <div className="flex justify-center items-center py-12">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350]"></div>
// //               </div>
// //             ) : menuError ? (
// //               // Error state for menu items
// //               <div className="text-center py-12">
// //                 <p className="text-gray-600 text-lg mb-4">
// //                   Failed to load menu items
// //                 </p>
// //                 <button
// //                   onClick={fetchMenuItems}
// //                   className="bg-[#EF5350] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
// //                 >
// //                   Try Again
// //                 </button>
// //               </div>
// //             ) : menuItems.length > 0 ? (
// //               // Dynamic menu items grid
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //                 {menuItems.map((item) => (
// //                   <div
// //                     key={item._id}
// //                     className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
// //                   >
// //                     {item.image ? (
// //                       <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg">
// //                         <img
// //                           src={item.image}
// //                           alt={item.name}
// //                           className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
// //                           loading="lazy"
// //                           onError={(e) => {
// //                             const target = e.target as HTMLImageElement;
// //                             target.style.display = "none";
// //                             if (target.nextElementSibling) {
// //                               (
// //                                 target.nextElementSibling as HTMLElement
// //                               ).style.display = "flex";
// //                             }
// //                           }}
// //                         />
// //                         <div className="hidden w-full h-full items-center justify-center text-gray-400">
// //                           {getCategoryEmoji(item.category)}
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center shadow-lg">
// //                         <span className="text-5xl">
// //                           {getCategoryEmoji(item.category)}
// //                         </span>
// //                       </div>
// //                     )}
// //                     <h3 className="text-xl font-bold mb-3 text-gray-900">
// //                       {item.name}
// //                     </h3>
// //                     <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
// //                       {item.description}
// //                     </p>
// //                     <p className="text-[#EF5350] font-bold text-xl mb-4">
// //                       {formatPrice(item.price)}
// //                     </p>
// //                     <button 
// //                       onClick={() => addToCart(item)}
// //                       className="w-full bg-[#EF5350] text-white py-2.5 rounded-lg font-semibold hover:bg-[#E57373] transition-colors text-sm"
// //                     >
// //                       Add to Cart
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               // No menu items available
// //               <div className="text-center py-12">
// //                 <p className="text-gray-600 text-lg">
// //                   No popular dishes available at the moment.
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </section>

// //         {/* Why Choose SushiMaster? Section */}
// //         <section className="py-16 bg-white">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
// //               Why Choose SushiMaster?
// //             </h2>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
// //                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <span className="text-3xl">🎣</span>
// //                 </div>
// //                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
// //                   Fresh Daily
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   We source the freshest fish daily from trusted suppliers
// //                 </p>
// //               </div>

// //               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
// //                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <span className="text-3xl">👨‍🍳</span>
// //                 </div>
// //                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
// //                   Master Chefs
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   Our chefs trained in Japan with decades of experience
// //                 </p>
// //               </div>

// //               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
// //                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <span className="text-3xl">🚀</span>
// //                 </div>
// //                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
// //                   Fast Delivery
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   Quick delivery to keep your sushi fresh and delicious
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* CTA Section */}
// //         <section className="py-16 bg-white">
// //           <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
// //             <h2 className="text-3xl font-bold text-gray-900 mb-4">
// //               Ready to experience the best sushi?
// //             </h2>
// //             <p className="text-lg text-gray-600 mb-8">
// //               Order online or visit us today!
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <button
// //                 onClick={() => router.push("/menu")}
// //                 className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-all duration-300 transform hover:scale-105"
// //               >
// //                 Order Now
// //               </button>

// //               <button 
// //                 onClick={() => router.push("/cart")}
// //                 className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
// //               >
// //                 <span>🛒</span>
// //                 <span>View Cart ({getTotalCartItems()})</span>
// //               </button>
// //             </div>
// //           </div>
// //         </section>
// //       </main>

// //       <Footer />
// //     </>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import Navbar from "../components/organisms/Navbar/page";
// import Footer from "../components/organisms/Footer/page";
// import { useCart } from "../context/CartContext";
// import { useRouter } from "next/navigation";

// interface Slider {
//   _id: string;
//   name: string;
//   image: string;
//   created_at: string;
//   updated_at: string;
// }

// interface MenuItem {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   category: string;
//   image: string;
//   is_available: boolean;
//   created_at: string;
//   updated_at: string;
// }

// export default function Home() {
//   const [sliders, setSliders] = useState<Slider[]>([]);
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [menuLoading, setMenuLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [menuError, setMenuError] = useState<string | null>(null);
//   const [showCartNotification, setShowCartNotification] = useState(false);

//   const { addToCart, cartCount } = useCart();
//   const router = useRouter();

//   // Fetch sliders from backend
//   const fetchSliders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const API =
//         process.env.NEXT_PUBLIC_API_BASE_URL ||
//         "https://sushi-backend-main.vercel.app/api/v1/sliders";

//       const response = await fetch(`${API}/sliders`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.success && result.data) {
//         setSliders(result.data);
//       } else {
//         throw new Error(result.message || "Failed to fetch sliders");
//       }
//     } catch (error) {
//       console.error("Error fetching sliders:", error);
//       setError(
//         error instanceof Error ? error.message : "Failed to load sliders"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch menu items from backend
//   const fetchMenuItems = async () => {
//     try {
//       setMenuLoading(true);
//       setMenuError(null);
//       const API =
//         process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";

//       const response = await fetch(`${API}/menu`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.success && result.data) {
//         // Filter only available items and limit to 4 for popular dishes
//         const availableItems = result.data
//           .filter((item: MenuItem) => item.is_available)
//           .slice(0, 4);
//         setMenuItems(availableItems);
//       } else {
//         throw new Error(result.message || "Failed to fetch menu items");
//       }
//     } catch (error) {
//       console.error("Error fetching menu items:", error);
//       setMenuError(
//         error instanceof Error ? error.message : "Failed to load menu items"
//       );
//     } finally {
//       setMenuLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSliders();
//     fetchMenuItems();
//   }, []);

//   // Add to cart function
//   const handleAddToCart = (item: MenuItem) => {
//     addToCart(item);
//     setShowCartNotification(true);
//     setTimeout(() => setShowCartNotification(false), 3000);
//   };

//   // Auto-slide functionality
//   useEffect(() => {
//     if (sliders.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % sliders.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [sliders.length]);

//   // Manual slide navigation
//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % sliders.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
//   };

//   // Format price to display with dollar sign
//   const formatPrice = (price: number) => {
//     return `$${price}`;
//   };

//   // Get emoji based on category
//   const getCategoryEmoji = (category: string) => {
//     const emojiMap: { [key: string]: string } = {
//       sushi: "🍣",
//       sashimi: "🐟",
//       drinks: "🍹",
//       appetizers: "🥢",
//       desserts: "🍰",
//     };
//     return emojiMap[category] || "🍽️";
//   };

//   // If no sliders, show default background
//   const defaultBackground = "bg-gradient-to-r from-[#EF5350] to-[#E57373]";

//   return (
//     <>
//       <Navbar />

//       {/* Cart Notification */}
//       {showCartNotification && (
//         <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
//           <span className="font-semibold">✓ Added to cart!</span>
//         </div>
//       )}

//       <main className="min-h-screen bg-gray-50">
//         {/* Hero Section with Slider - Decreased height */}
//         <section className="relative h-[75vh] overflow-hidden">
//           {loading ? (
//             // Loading state
//             <div
//               className={`w-full h-full ${defaultBackground} flex items-center justify-center`}
//             >
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
//                 <p className="text-white text-lg">Loading...</p>
//               </div>
//             </div>
//           ) : error ? (
//             // Error state
//             <div
//               className={`w-full h-full ${defaultBackground} flex items-center justify-center`}
//             >
//               <div className="text-center">
//                 <p className="text-white text-lg mb-4">Failed to load slider</p>
//                 <button
//                   onClick={fetchSliders}
//                   className="bg-white text-[#EF5350] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//                 >
//                   Retry
//                 </button>
//               </div>
//             </div>
//           ) : sliders.length > 0 ? (
//             // Slider with images from backend
//             <>
//               {/* Slides Container */}
//               <div className="relative w-full h-full">
//                 {sliders.map((slider, index) => (
//                   <div
//                     key={slider._id}
//                     className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                       index === currentSlide ? "opacity-100" : "opacity-0"
//                     }`}
//                   >
//                     {/* Image as img element */}
//                     <div className="relative w-full h-full">
//                       <img
//                         src={slider.image}
//                         alt={slider.name}
//                         className="w-full h-full object-cover"
//                       />

//                       {/* Content with Order Online button at bottom */}
//                       <div className="absolute inset-0 flex items-end justify-center pb-12">
//                         <div className="text-center">
//                           <button
//                             onClick={() => router.push("/menu")}
//                             className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
//                           >
//                             Order Now
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Minimal Navigation Arrows */}
//               {sliders.length > 1 && (
//                 <>
//                   <button
//                     onClick={prevSlide}
//                     className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
//                     aria-label="Previous slide"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={nextSlide}
//                     className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
//                     aria-label="Next slide"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </button>
//                 </>
//               )}

//               {/* Minimal Slide Indicators */}
//               {sliders.length > 1 && (
//                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
//                   {sliders.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => goToSlide(index)}
//                       className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                         index === currentSlide
//                           ? "bg-white scale-125"
//                           : "bg-white bg-opacity-40 hover:bg-opacity-60"
//                       }`}
//                       aria-label={`Go to slide ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </>
//           ) : (
//             // Default hero section when no sliders
//             <div
//               className={`w-full h-full ${defaultBackground} flex items-end justify-center pb-12`}
//             >
//               <div className="text-center">
//                 <button className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
//                   Order Online
//                 </button>
//               </div>
//             </div>
//           )}
//         </section>

//         {/* Popular Dishes Section - Dynamic */}
//         <section className="py-16 bg-gray-100">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
//               Popular Dishes
//             </h2>
//             {menuLoading ? (
//               // Loading state for menu items
//               <div className="flex justify-center items-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350]"></div>
//               </div>
//             ) : menuError ? (
//               // Error state for menu items
//               <div className="text-center py-12">
//                 <p className="text-gray-600 text-lg mb-4">
//                   Failed to load menu items
//                 </p>
//                 <button
//                   onClick={fetchMenuItems}
//                   className="bg-[#EF5350] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             ) : menuItems.length > 0 ? (
//               // Dynamic menu items grid
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {menuItems.map((item) => (
//                   <div
//                     key={item._id}
//                     className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
//                   >
//                     {item.image ? (
//                       <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
//                           loading="lazy"
//                           onError={(e) => {
//                             const target = e.target as HTMLImageElement;
//                             target.style.display = "none";
//                             if (target.nextElementSibling) {
//                               (
//                                 target.nextElementSibling as HTMLElement
//                               ).style.display = "flex";
//                             }
//                           }}
//                         />
//                         <div className="hidden w-full h-full items-center justify-center text-gray-400">
//                           {getCategoryEmoji(item.category)}
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center shadow-lg">
//                         <span className="text-5xl">
//                           {getCategoryEmoji(item.category)}
//                         </span>
//                       </div>
//                     )}
//                     <h3 className="text-xl font-bold mb-3 text-gray-900">
//                       {item.name}
//                     </h3>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
//                       {item.description}
//                     </p>
//                     <p className="text-[#EF5350] font-bold text-xl mb-4">
//                       {formatPrice(item.price)}
//                     </p>
//                     <button 
//                       onClick={() => handleAddToCart(item)}
//                       className="w-full bg-[#EF5350] text-white py-2.5 rounded-lg font-semibold hover:bg-[#E57373] transition-colors text-sm"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               // No menu items available
//               <div className="text-center py-12">
//                 <p className="text-gray-600 text-lg">
//                   No popular dishes available at the moment.
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Why Choose SushiMaster? Section */}
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
//               Why Choose SushiMaster?
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-3xl">🎣</span>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
//                   Fresh Daily
//                 </h3>
//                 <p className="text-gray-600">
//                   We source the freshest fish daily from trusted suppliers
//                 </p>
//               </div>

//               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-3xl">👨‍🍳</span>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
//                   Master Chefs
//                 </h3>
//                 <p className="text-gray-600">
//                   Our chefs trained in Japan with decades of experience
//                 </p>
//               </div>

//               <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//                 <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-3xl">🚀</span>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 text-gray-900">
//                   Fast Delivery
//                 </h3>
//                 <p className="text-gray-600">
//                   Quick delivery to keep your sushi fresh and delicious
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 bg-white">
//           <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Ready to experience the best sushi?
//             </h2>
//             <p className="text-lg text-gray-600 mb-8">
//               Order online or visit us today!
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={() => router.push("/menu")}
//                 className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-all duration-300 transform hover:scale-105"
//               >
//                 Order Now
//               </button>

//               <button 
//                 onClick={() => router.push("/cart")}
//                 className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
//               >
//                 <span>🛒</span>
//                 <span>View Cart ({cartCount})</span>
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/organisms/Navbar/page";
import Footer from "../components/organisms/Footer/page";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

interface Slider {
  _id: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const { addToCart, cartCount } = useCart();
  const { t, language } = useLanguage();
  const router = useRouter();

  // Fetch sliders from backend
  const fetchSliders = async () => {
    try {
      setLoading(true);
      setError(null);
      const API =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://sushi-backend-main.vercel.app/api/v1/sliders";

      const response = await fetch(`${API}/sliders`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setSliders(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch sliders");
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load sliders"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch menu items from backend
  const fetchMenuItems = async () => {
    try {
      setMenuLoading(true);
      setMenuError(null);
      const API =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

      const response = await fetch(`${API}/menu`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        // Filter only available items and limit to 4 for popular dishes
        const availableItems = result.data
          .filter((item: MenuItem) => item.is_available)
          .slice(0, 4);
        setMenuItems(availableItems);
      } else {
        throw new Error(result.message || "Failed to fetch menu items");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setMenuError(
        error instanceof Error ? error.message : "Failed to load menu items"
      );
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
    fetchMenuItems();
  }, []);

  // Add to cart function
  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (sliders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliders.length]);

  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  // Format price to display with dollar sign
  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  // Get emoji based on category
  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      sushi: "🍣",
      sashimi: "🐟",
      drinks: "🍹",
      appetizers: "🥢",
      desserts: "🍰",
    };
    return emojiMap[category] || "🍽️";
  };

  // If no sliders, show default background
  const defaultBackground = "bg-gradient-to-r from-[#EF5350] to-[#E57373]";

  return (
    <>
      <Navbar />

      {/* Cart Notification */}
      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <span className="font-semibold">✓ {t('Added to cart!')}</span>
        </div>
      )}

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section with Slider - Decreased height */}
        <section className="relative h-[75vh] overflow-hidden">
          {loading ? (
            // Loading state
            <div
              className={`w-full h-full ${defaultBackground} flex items-center justify-center`}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-lg">{t('Loading...')}</p>
              </div>
            </div>
          ) : error ? (
            // Error state
            <div
              className={`w-full h-full ${defaultBackground} flex items-center justify-center`}
            >
              <div className="text-center">
                <p className="text-white text-lg mb-4">{t('Failed to load slider')}</p>
                <button
                  onClick={fetchSliders}
                  className="bg-white text-[#EF5350] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {t('Retry')}
                </button>
              </div>
            </div>
          ) : sliders.length > 0 ? (
            // Slider with images from backend
            <>
              {/* Slides Container */}
              <div className="relative w-full h-full">
                {sliders.map((slider, index) => (
                  <div
                    key={slider._id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* Image as img element */}
                    <div className="relative w-full h-full">
                      <img
                        src={slider.image}
                        alt={slider.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Content with Order Online button at bottom */}
                      <div className="absolute inset-0 flex items-end justify-center pb-12">
                        <div className="text-center">
                          <button
                            onClick={() => router.push("/menu")}
                            className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                          >
                            {t('Order Now')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Minimal Navigation Arrows */}
              {sliders.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
                    aria-label={t('Previous slide')}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-10 hover:bg-opacity-20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
                    aria-label={t('Next slide')}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Minimal Slide Indicators */}
              {sliders.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {sliders.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-white scale-125"
                          : "bg-white bg-opacity-40 hover:bg-opacity-60"
                      }`}
                      aria-label={`${t('Go to slide')} ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // Default hero section when no sliders
            <div
              className={`w-full h-full ${defaultBackground} flex items-end justify-center pb-12`}
            >
              <div className="text-center">
                <button className="bg-white text-[#EF5350] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  {t('Order Online')}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Popular Dishes Section - Dynamic */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('Popular Dishes')}
            </h2>
            {menuLoading ? (
              // Loading state for menu items
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350]"></div>
              </div>
            ) : menuError ? (
              // Error state for menu items
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">
                  {t('Failed to load menu items')}
                </p>
                <button
                  onClick={fetchMenuItems}
                  className="bg-[#EF5350] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
                >
                  {t('Try Again')}
                </button>
              </div>
            ) : menuItems.length > 0 ? (
              // Dynamic menu items grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {menuItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
                  >
                    {item.image ? (
                      <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            if (target.nextElementSibling) {
                              (
                                target.nextElementSibling as HTMLElement
                              ).style.display = "flex";
                            }
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center text-gray-400">
                          {getCategoryEmoji(item.category)}
                        </div>
                      </div>
                    ) : (
                      <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center shadow-lg">
                        <span className="text-5xl">
                          {getCategoryEmoji(item.category)}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <p className="text-[#EF5350] font-bold text-xl mb-4">
                      {formatPrice(item.price)}
                    </p>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-[#EF5350] text-white py-2.5 rounded-lg font-semibold hover:bg-[#E57373] transition-colors text-sm"
                    >
                      {t('Add to Cart')}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // No menu items available
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  {t('No popular dishes available at the moment.')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose SushiMaster? Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('Why Choose SushiMaster?')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎣</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {t('Fresh Daily')}
                </h3>
                <p className="text-gray-600">
                  {t('We source the freshest fish daily from trusted suppliers')}
                </p>
              </div>

              <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {t('Master Chefs')}
                </h3>
                <p className="text-gray-600">
                  {t('Our chefs trained in Japan with decades of experience')}
                </p>
              </div>

              <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-20 h-20 bg-[#FFEBEE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {t('Fast Delivery')}
                </h3>
                <p className="text-gray-600">
                  {t('Quick delivery to keep your sushi fresh and delicious')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('Ready to experience the best sushi?')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('Order online or visit us today!')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/menu")}
                className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-all duration-300 transform hover:scale-105"
              >
                {t('Order Now')}
              </button>

              <button 
                onClick={() => router.push("/cart")}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <span>🛒</span>
                <span>{t('View Cart')} ({cartCount})</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
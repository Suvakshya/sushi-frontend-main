// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useParams, useRouter } from "next/navigation";
// // // import Link from "next/link";
// // // import { FiCheck, FiClock, FiPackage, FiTruck, FiHome } from "react-icons/fi";

// // // interface Order {
// // //   _id: string;
// // //   total_price: number;
// // //   order_type: string;
// // //   payment_method: string;
// // //   status: string;
// // //   created_at: string;
// // // }

// // // export default function OrderConfirmation() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const [order, setOrder] = useState<Order | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   const orderId = params.id as string;

// // //   useEffect(() => {
// // //     const fetchOrder = async () => {
// // //       try {
// // //         const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
// // //         const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);

// // //         if (response.ok) {
// // //           const result = await response.json();
// // //           if (result.success) {
// // //             setOrder(result.data);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching order:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (orderId) {
// // //       fetchOrder();
// // //     }
// // //   }, [orderId]);

// // //   const formatPrice = (price: number) => {
// // //     return `$${price.toFixed(2)}`;
// // //   };

// // //   const formatDate = (dateString: string) => {
// // //     return new Date(dateString).toLocaleDateString('en-US', {
// // //       year: 'numeric',
// // //       month: 'long',
// // //       day: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     });
// // //   };

// // //   const getStatusIcon = (status: string) => {
// // //     switch (status) {
// // //       case 'Completed':
// // //         return <FiCheck className="w-6 h-6 text-green-500" />;
// // //       case 'Preparing':
// // //         return <FiPackage className="w-6 h-6 text-blue-500" />;
// // //       case 'Out for Delivery':
// // //         return <FiTruck className="w-6 h-6 text-orange-500" />;
// // //       default:
// // //         return <FiClock className="w-6 h-6 text-yellow-500" />;
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EF5350] mx-auto mb-4"></div>
// // //           <p className="text-gray-600">Loading order details...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!order) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
// // //           <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
// // //           <Link
// // //             href="/menu"
// // //             className="bg-[#EF5350] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
// // //           >
// // //             Back to Menu
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// // //         <div className="bg-white rounded-2xl shadow-lg p-8">
// // //           {/* Success Header */}
// // //           <div className="text-center mb-8">
// // //             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <FiCheck className="w-10 h-10 text-green-500" />
// // //             </div>
// // //             <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
// // //             <p className="text-gray-600">Thank you for your order. We're preparing it now.</p>
// // //           </div>

// // //           {/* Order Details */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// // //             <div>
// // //               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
// // //               <div className="space-y-3">
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Order ID:</span>
// // //                   <span className="font-mono font-semibold">{order._id}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Order Type:</span>
// // //                   <span className="font-semibold capitalize">{order.order_type}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Payment Method:</span>
// // //                   <span className="font-semibold capitalize">{order.payment_method}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Order Date:</span>
// // //                   <span className="font-semibold">{formatDate(order.created_at)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Total Amount:</span>
// // //                   <span className="font-semibold text-[#EF5350] text-lg">
// // //                     {formatPrice(order.total_price)}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Order Status */}
// // //             <div>
// // //               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
// // //               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
// // //                 {getStatusIcon(order.status)}
// // //                 <div>
// // //                   <p className="font-semibold text-gray-900 capitalize">{order.status}</p>
// // //                   <p className="text-sm text-gray-600">
// // //                     {order.status === 'Pending' && 'We have received your order'}
// // //                     {order.status === 'Preparing' && 'Your food is being prepared'}
// // //                     {order.status === 'Out for Delivery' && 'Your order is on the way'}
// // //                     {order.status === 'Completed' && 'Order delivered successfully'}
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Next Steps */}
// // //           <div className="bg-blue-50 rounded-lg p-6 mb-8">
// // //             <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
// // //             <ul className="space-y-2 text-gray-700">
// // //               <li>• You will receive an order confirmation email shortly</li>
// // //               <li>• We'll notify you when your order is ready for {order.order_type.toLowerCase()}</li>
// // //               <li>• Estimated preparation time: 20-30 minutes</li>
// // //               {order.order_type === 'Delivery' && (
// // //                 <li>• Delivery time: 30-45 minutes</li>
// // //               )}
// // //             </ul>
// // //           </div>

// // //           {/* Action Buttons */}
// // //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// // //             <Link
// // //               href="/menu"
// // //               className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors text-center"
// // //             >
// // //               Order Again
// // //             </Link>
// // //             <Link
// // //               href="/"
// // //               className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
// // //             >
// // //               <FiHome className="w-4 h-4" />
// // //               Back to Home
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useParams, useRouter } from "next/navigation";
// // // import Link from "next/link";
// // // import { FiCheck, FiClock, FiPackage, FiTruck, FiHome, FiUser } from "react-icons/fi";

// // // interface Order {
// // //   _id: string;
// // //   user_id: string;
// // //   total_price: number;
// // //   order_type: string;
// // //   payment_method: string;
// // //   status: string;
// // //   created_at: string;
// // // }

// // // interface User {
// // //   _id: string;
// // //   name: string;
// // //   email: string;
// // // }

// // // export default function OrderConfirmation() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const [order, setOrder] = useState<Order | null>(null);
// // //   const [user, setUser] = useState<User | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   const orderId = params.id as string;

// // //   useEffect(() => {
// // //     const fetchOrderAndUser = async () => {
// // //       try {
// // //         const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';

// // //         // Fetch order details
// // //         const orderResponse = await fetch(`${API_BASE_URL}/orders/${orderId}`);

// // //         if (orderResponse.ok) {
// // //           const orderResult = await orderResponse.json();
// // //           if (orderResult.success) {
// // //             setOrder(orderResult.data);

// // //             // Get current user data from localStorage
// // //             const userData = localStorage.getItem('userData');
// // //             if (userData) {
// // //               const parsedUser = JSON.parse(userData);
// // //               setUser(parsedUser);
// // //             }
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching order:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (orderId) {
// // //       fetchOrderAndUser();
// // //     }
// // //   }, [orderId]);

// // //   const formatPrice = (price: number) => {
// // //     return `$${price.toFixed(2)}`;
// // //   };

// // //   const formatDate = (dateString: string) => {
// // //     return new Date(dateString).toLocaleDateString('en-US', {
// // //       year: 'numeric',
// // //       month: 'long',
// // //       day: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     });
// // //   };

// // //   const getStatusIcon = (status: string) => {
// // //     switch (status) {
// // //       case 'Completed':
// // //         return <FiCheck className="w-6 h-6 text-green-500" />;
// // //       case 'Preparing':
// // //         return <FiPackage className="w-6 h-6 text-blue-500" />;
// // //       case 'Out for Delivery':
// // //         return <FiTruck className="w-6 h-6 text-orange-500" />;
// // //       default:
// // //         return <FiClock className="w-6 h-6 text-yellow-500" />;
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EF5350] mx-auto mb-4"></div>
// // //           <p className="text-gray-600">Loading order details...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!order) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
// // //           <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
// // //           <Link
// // //             href="/menu"
// // //             className="bg-[#EF5350] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
// // //           >
// // //             Back to Menu
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// // //         <div className="bg-white rounded-2xl shadow-lg p-8">
// // //           {/* Success Header */}
// // //           <div className="text-center mb-8">
// // //             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <FiCheck className="w-10 h-10 text-green-500" />
// // //             </div>
// // //             <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
// // //             <p className="text-gray-600">Thank you for your order. We're preparing it now.</p>
// // //           </div>

// // //           {/* User Information */}
// // //           {user && (
// // //             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
// // //               <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
// // //                 <FiUser className="w-5 h-5" />
// // //                 Customer Information
// // //               </h2>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <div>
// // //                   <span className="text-sm text-gray-600">Name:</span>
// // //                   <p className="font-semibold">{user.name}</p>
// // //                 </div>
// // //                 <div>
// // //                   <span className="text-sm text-gray-600">Email:</span>
// // //                   <p className="font-semibold">{user.email}</p>
// // //                 </div>
// // //                 <div className="md:col-span-2">
// // //                   <span className="text-sm text-gray-600">User ID:</span>
// // //                   <p className="font-mono text-sm font-semibold">{user._id}</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Order Details */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// // //             <div>
// // //               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
// // //               <div className="space-y-3">
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Order ID:</span>
// // //                   <span className="font-mono font-semibold text-sm">{order._id}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Order Type:</span>
// // //                   <span className="font-semibold capitalize">{order.order_type}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Payment Method:</span>
// // //                   <span className="font-semibold capitalize">{order.payment_method}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Order Date:</span>
// // //                   <span className="font-semibold">{formatDate(order.created_at)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-600">Total Amount:</span>
// // //                   <span className="font-semibold text-[#EF5350] text-lg">
// // //                     {formatPrice(order.total_price)}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Order Status */}
// // //             <div>
// // //               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
// // //               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
// // //                 {getStatusIcon(order.status)}
// // //                 <div>
// // //                   <p className="font-semibold text-gray-900 capitalize">{order.status}</p>
// // //                   <p className="text-sm text-gray-600">
// // //                     {order.status === 'Pending' && 'We have received your order'}
// // //                     {order.status === 'Preparing' && 'Your food is being prepared'}
// // //                     {order.status === 'Out for Delivery' && 'Your order is on the way'}
// // //                     {order.status === 'Completed' && 'Order delivered successfully'}
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Next Steps */}
// // //           <div className="bg-blue-50 rounded-lg p-6 mb-8">
// // //             <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
// // //             <ul className="space-y-2 text-gray-700">
// // //               <li>• You will receive an order confirmation email shortly</li>
// // //               <li>• We'll notify you when your order is ready for {order.order_type.toLowerCase()}</li>
// // //               <li>• Estimated preparation time: 20-30 minutes</li>
// // //               {order.order_type === 'Delivery' && (
// // //                 <li>• Delivery time: 30-45 minutes</li>
// // //               )}
// // //             </ul>
// // //           </div>

// // //           {/* Action Buttons */}
// // //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// // //             <Link
// // //               href="/menu"
// // //               className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors text-center"
// // //             >
// // //               Order Again
// // //             </Link>
// // //             <Link
// // //               href="/"
// // //               className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
// // //             >
// // //               <FiHome className="w-4 h-4" />
// // //               Back to Home
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import Link from "next/link";
// // import { FiCheck, FiClock, FiPackage, FiTruck, FiHome, FiUser, FiDownload } from "react-icons/fi";

// // interface Order {
// //   _id: string;
// //   user_id: string;
// //   total_price: number;
// //   order_type: string;
// //   payment_method: string;
// //   status: string;
// //   created_at: string;
// // }

// // interface User {
// //   _id: string;
// //   name: string;
// //   email: string;
// // }

// // export default function OrderConfirmation() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const [order, setOrder] = useState<Order | null>(null);
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [receiptCreated, setReceiptCreated] = useState(false);

// //   const orderId = params.id as string;

// //   // Add this function to create receipt
// //   const createReceipt = async (orderData: Order, userData: User) => {
// //     try {
// //       const receiptData = {
// //         _id: `receipt_${orderData._id}`,
// //         user_id: userData._id,
// //         order_id: orderData._id,
// //         total_price: orderData.total_price,
// //         order_type: orderData.order_type,
// //         payment_method: orderData.payment_method,
// //         status: orderData.status,
// //         items: [], // You'll need to fetch order items from your order data
// //         customer_name: userData.name,
// //         customer_email: userData.email,
// //         created_at: new Date().toISOString()
// //       };

// //       const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
// //       const response = await fetch(`${API_BASE_URL}/receipts`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(receiptData),
// //       });

// //       if (response.ok) {
// //         console.log('Receipt created successfully');
// //         setReceiptCreated(true);
// //       }
// //     } catch (error) {
// //       console.error('Error creating receipt:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchOrderAndUser = async () => {
// //       try {
// //         const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';

// //         // Fetch order details
// //         const orderResponse = await fetch(`${API_BASE_URL}/orders/${orderId}`);

// //         if (orderResponse.ok) {
// //           const orderResult = await orderResponse.json();
// //           if (orderResult.success) {
// //             const orderData = orderResult.data;
// //             setOrder(orderData);

// //             // Get current user data from localStorage
// //             const userData = localStorage.getItem('userData');
// //             if (userData) {
// //               const parsedUser = JSON.parse(userData);
// //               setUser(parsedUser);

// //               // Create receipt when both order and user data are available
// //               // Only create receipt once
// //               if (!receiptCreated) {
// //                 await createReceipt(orderData, parsedUser);
// //               }
// //             }
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error fetching order:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (orderId) {
// //       fetchOrderAndUser();
// //     }
// //   }, [orderId, receiptCreated]);

// //   const formatPrice = (price: number) => {
// //     return `$${price.toFixed(2)}`;
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   const getStatusIcon = (status: string) => {
// //     switch (status) {
// //       case 'Completed':
// //         return <FiCheck className="w-6 h-6 text-green-500" />;
// //       case 'Preparing':
// //         return <FiPackage className="w-6 h-6 text-blue-500" />;
// //       case 'Out for Delivery':
// //         return <FiTruck className="w-6 h-6 text-orange-500" />;
// //       default:
// //         return <FiClock className="w-6 h-6 text-yellow-500" />;
// //     }
// //   };

// //   // Add download receipt function
// //   const downloadReceipt = () => {
// //     if (!order || !user) return;

// //     const receiptContent = `
// //       SUSHI MASTER - RECEIPT
// //       ======================

// //       Receipt ID: receipt_${order._id}
// //       Order ID: ${order._id}
// //       Date: ${formatDate(order.created_at)}

// //       Customer Information:
// //       --------------------
// //       Name: ${user.name}
// //       Email: ${user.email}

// //       Order Details:
// //       -------------
// //       Order Type: ${order.order_type}
// //       Payment Method: ${order.payment_method}
// //       Status: ${order.status}

// //       Total Amount: ${formatPrice(order.total_price)}

// //       Thank you for your order!
// //       =========================
// //     `;

// //     const blob = new Blob([receiptContent], { type: 'text/plain' });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = `receipt-${order._id}.txt`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     URL.revokeObjectURL(url);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EF5350] mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading order details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!order) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
// //           <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
// //           <Link
// //             href="/menu"
// //             className="bg-[#EF5350] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
// //           >
// //             Back to Menu
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //         <div className="bg-white rounded-2xl shadow-lg p-8">
// //           {/* Success Header */}
// //           <div className="text-center mb-8">
// //             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <FiCheck className="w-10 h-10 text-green-500" />
// //             </div>
// //             <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
// //             <p className="text-gray-600">Thank you for your order. We're preparing it now.</p>
// //             {receiptCreated && (
// //               <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
// //                 <p className="text-green-700 text-sm">
// //                   ✓ Receipt has been saved to your account
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* User Information */}
// //           {user && (
// //             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
// //               <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
// //                 <FiUser className="w-5 h-5" />
// //                 Customer Information
// //               </h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <span className="text-sm text-gray-600">Name:</span>
// //                   <p className="font-semibold">{user.name}</p>
// //                 </div>
// //                 <div>
// //                   <span className="text-sm text-gray-600">Email:</span>
// //                   <p className="font-semibold">{user.email}</p>
// //                 </div>
// //                 <div className="md:col-span-2">
// //                   <span className="text-sm text-gray-600">User ID:</span>
// //                   <p className="font-mono text-sm font-semibold">{user._id}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Order Details */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// //             <div>
// //               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
// //               <div className="space-y-3">
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Order ID:</span>
// //                   <span className="font-mono font-semibold text-sm">{order._id}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Order Type:</span>
// //                   <span className="font-semibold capitalize">{order.order_type}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Payment Method:</span>
// //                   <span className="font-semibold capitalize">{order.payment_method}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Order Date:</span>
// //                   <span className="font-semibold">{formatDate(order.created_at)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Total Amount:</span>
// //                   <span className="font-semibold text-[#EF5350] text-lg">
// //                     {formatPrice(order.total_price)}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Order Status */}
// //             <div>
// //               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
// //               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
// //                 {getStatusIcon(order.status)}
// //                 <div>
// //                   <p className="font-semibold text-gray-900 capitalize">{order.status}</p>
// //                   <p className="text-sm text-gray-600">
// //                     {order.status === 'Pending' && 'We have received your order'}
// //                     {order.status === 'Preparing' && 'Your food is being prepared'}
// //                     {order.status === 'Out for Delivery' && 'Your order is on the way'}
// //                     {order.status === 'Completed' && 'Order delivered successfully'}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Next Steps */}
// //           <div className="bg-blue-50 rounded-lg p-6 mb-8">
// //             <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
// //             <ul className="space-y-2 text-gray-700">
// //               <li>• You will receive an order confirmation email shortly</li>
// //               <li>• We'll notify you when your order is ready for {order.order_type.toLowerCase()}</li>
// //               <li>• Estimated preparation time: 20-30 minutes</li>
// //               {order.order_type === 'Delivery' && (
// //                 <li>• Delivery time: 30-45 minutes</li>
// //               )}
// //             </ul>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Link
// //               href="/menu"
// //               className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors text-center"
// //             >
// //               Order Again
// //             </Link>
// //             <button
// //               onClick={downloadReceipt}
// //               className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-2"
// //             >
// //               <FiDownload className="w-4 h-4" />
// //               Download Receipt
// //             </button>
// //             <Link
// //               href="/"
// //               className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
// //             >
// //               <FiHome className="w-4 h-4" />
// //               Back to Home
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   FiCheck,
//   FiClock,
//   FiPackage,
//   FiTruck,
//   FiHome,
//   FiUser,
//   FiDownload,
// } from "react-icons/fi";

// interface Order {
//   _id: string;
//   user_id: string;
//   total_price: number;
//   order_type: string;
//   payment_method: string;
//   status: string;
//   created_at: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
// }

// interface OrderItem {
//   name: string;
//   quantity: number;
//   price: number;
// }

// export default function OrderConfirmation() {
//   const params = useParams();
//   const router = useRouter();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [receiptCreated, setReceiptCreated] = useState(false);

//   const orderId = params.id as string;

//   // Add this function to create receipt with proper order items
//   const createReceipt = async (
//     orderData: Order,
//     userData: User,
//     items: OrderItem[]
//   ) => {
//     try {
//       const receiptData = {
//         _id: `receipt_${orderData._id}`,
//         user_id: userData._id,
//         order_id: orderData._id,
//         total_price: orderData.total_price,
//         order_type: orderData.order_type,
//         payment_method: orderData.payment_method,
//         status: orderData.status,
//         items: items,
//         customer_name: userData.name,
//         customer_email: userData.email,
//         created_at: new Date().toISOString(),
//       };

//       const API_BASE_URL =
//         process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";
//       const response = await fetch(`${API_BASE_URL}/receipts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(receiptData),
//       });

//       if (response.ok) {
//         console.log("Receipt created successfully with items:", items.length);
//         setReceiptCreated(true);
//         return true;
//       } else {
//         console.error("Failed to create receipt");
//         return false;
//       }
//     } catch (error) {
//       console.error("Error creating receipt:", error);
//       return false;
//     }
//   };

//   // Function to fetch order items
//   const fetchOrderItems = async (orderId: string): Promise<OrderItem[]> => {
//     try {
//       const API_BASE_URL =
//         process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";
//       const response = await fetch(
//         `${API_BASE_URL}/order-items/order/${orderId}/details`
//       );

//       if (response.ok) {
//         const result = await response.json();
//         if (result.success) {
//           console.log("Fetched order items:", result.data);
//           return result.data;
//         }
//       }
//       console.error("Failed to fetch order items");
//       return [];
//     } catch (error) {
//       console.error("Error fetching order items:", error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchOrderAndUser = async () => {
//       try {
//         const API_BASE_URL =
//           process.env.NEXT_PUBLIC_API_BASE_URL ||
//           "http://localhost:3005/api/v1";

//         // Fetch order details
//         const orderResponse = await fetch(`${API_BASE_URL}/orders/${orderId}`);

//         if (orderResponse.ok) {
//           const orderResult = await orderResponse.json();
//           if (orderResult.success) {
//             const orderData = orderResult.data;
//             setOrder(orderData);

//             // Fetch order items
//             const items = await fetchOrderItems(orderId);
//             setOrderItems(items);

//             // Get current user data from localStorage
//             const userData = localStorage.getItem("user");
//             if (userData) {
//               const parsedUser = JSON.parse(userData);
//               setUser(parsedUser);

//               // Create receipt when all data is available
//               // Only create receipt once
//               if (!receiptCreated && items.length > 0) {
//                 await createReceipt(orderData, parsedUser, items);
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrderAndUser();
//     }
//   }, [orderId, receiptCreated]);

//   const formatPrice = (price: number) => {
//     return `$${price.toFixed(2)}`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "Completed":
//         return <FiCheck className="w-6 h-6 text-green-500" />;
//       case "Preparing":
//         return <FiPackage className="w-6 h-6 text-blue-500" />;
//       case "Out for Delivery":
//         return <FiTruck className="w-6 h-6 text-orange-500" />;
//       default:
//         return <FiClock className="w-6 h-6 text-yellow-500" />;
//     }
//   };

//   // Add download receipt function
//   const downloadReceipt = () => {
//     if (!order || !user) return;

//     const receiptContent = `
//       SUSHI MASTER - RECEIPT
//       ======================
      
//       Receipt ID: receipt_${order._id}
//       Order ID: ${order._id}
//       Date: ${formatDate(order.created_at)}
      
//       Customer Information:
//       --------------------
//       Name: ${user.name}
//       Email: ${user.email}
      
//       Order Details:
//       -------------
//       Order Type: ${order.order_type}
//       Payment Method: ${order.payment_method}
//       Status: ${order.status}
      
//       Items:
//       ------
//       ${orderItems
//         .map(
//           (item) =>
//             `${item.quantity}x ${item.name} - $${(
//               item.price * item.quantity
//             ).toFixed(2)}`
//         )
//         .join("\n      ")}
      
//       Total Amount: ${formatPrice(order.total_price)}
      
//       Thank you for your order!
//       =========================
//     `;

//     const blob = new Blob([receiptContent], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `receipt-${order._id}.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EF5350] mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">
//             Order Not Found
//           </h1>
//           <p className="text-gray-600 mb-8">
//             The order you're looking for doesn't exist.
//           </p>
//           <Link
//             href="/menu"
//             className="bg-[#EF5350] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
//           >
//             Back to Menu
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           {/* Success Header */}
//           <div className="text-center mb-8">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FiCheck className="w-10 h-10 text-green-500" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Order Confirmed!
//             </h1>
//             <p className="text-gray-600">
//               Thank you for your order. We're preparing it now.
//             </p>
//             {receiptCreated && (
//               <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                 <p className="text-green-700 text-sm">
//                   ✓ Receipt has been saved to your account
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* User Information */}
//           {user && (
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
//                 <FiUser className="w-5 h-5" />
//                 Customer Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <span className="text-sm text-gray-600">Name:</span>
//                   <p className="font-semibold">{user.name}</p>
//                 </div>
//                 <div>
//                   <span className="text-sm text-gray-600">Email:</span>
//                   <p className="font-semibold">{user.email}</p>
//                 </div>
//                 <div className="md:col-span-2">
//                   <span className="text-sm text-gray-600">User ID:</span>
//                   <p className="font-mono text-sm font-semibold">{user._id}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Order Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 mb-4">
//                 Order Information
//               </h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order ID:</span>
//                   <span className="font-mono font-semibold text-sm">
//                     {order._id}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order Type:</span>
//                   <span className="font-semibold capitalize">
//                     {order.order_type}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Payment Method:</span>
//                   <span className="font-semibold capitalize">
//                     {order.payment_method}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order Date:</span>
//                   <span className="font-semibold">
//                     {formatDate(order.created_at)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Amount:</span>
//                   <span className="font-semibold text-[#EF5350] text-lg">
//                     {formatPrice(order.total_price)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Order Status */}
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 mb-4">
//                 Order Status
//               </h2>
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                 {getStatusIcon(order.status)}
//                 <div>
//                   <p className="font-semibold text-gray-900 capitalize">
//                     {order.status}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {order.status === "Pending" &&
//                       "We have received your order"}
//                     {order.status === "Preparing" &&
//                       "Your food is being prepared"}
//                     {order.status === "Out for Delivery" &&
//                       "Your order is on the way"}
//                     {order.status === "Completed" &&
//                       "Order delivered successfully"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Order Items */}
//           {orderItems.length > 0 && (
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <h2 className="text-lg font-bold text-gray-900 mb-3">
//                 Order Items
//               </h2>
//               <div className="space-y-2">
//                 {orderItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center py-2 border-b"
//                   >
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-600">
//                         Quantity: {item.quantity}
//                       </p>
//                     </div>
//                     <p className="font-semibold">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Next Steps */}
//           <div className="bg-blue-50 rounded-lg p-6 mb-8">
//             <h3 className="text-lg font-semibold text-gray-900 mb-3">
//               What's Next?
//             </h3>
//             <ul className="space-y-2 text-gray-700">
//               <li>• You will receive an order confirmation email shortly</li>
//               <li>
//                 • We'll notify you when your order is ready for{" "}
//                 {order.order_type.toLowerCase()}
//               </li>
//               <li>• Estimated preparation time: 20-30 minutes</li>
//               {order.order_type === "Delivery" && (
//                 <li>• Delivery time: 30-45 minutes</li>
//               )}
//             </ul>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/menu"
//               className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors text-center"
//             >
//               Order Again
//             </Link>
//             <button
//               onClick={downloadReceipt}
//               className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-2"
//             >
//               <FiDownload className="w-4 h-4" />
//               Download Receipt
//             </button>
//             <Link
//               href="/"
//               className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
//             >
//               <FiHome className="w-4 h-4" />
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiCheck,
  FiClock,
  FiPackage,
  FiTruck,
  FiHome,
  FiUser,
  FiDownload,
} from "react-icons/fi";
import  { jsPDF } from "jspdf";

interface Order {
  _id: string;
  user_id: string;
  total_price: number;
  order_type: string;
  payment_method: string;
  status: string;
  created_at: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export default function OrderConfirmation() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiptCreated, setReceiptCreated] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const orderId = params.id as string;

  // Add this function to create receipt with proper order items
  const createReceipt = async (
    orderData: Order,
    userData: User,
    items: OrderItem[]
  ) => {
    try {
      const receiptData = {
        _id: `receipt_${orderData._id}`,
        user_id: userData._id,
        order_id: orderData._id,
        total_price: orderData.total_price,
        order_type: orderData.order_type,
        payment_method: orderData.payment_method,
        status: orderData.status,
        items: items,
        customer_name: userData.name,
        customer_email: userData.email,
        created_at: new Date().toISOString(),
      };

      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";
      const response = await fetch(`${API_BASE_URL}/receipts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receiptData),
      });

      if (response.ok) {
        console.log("Receipt created successfully with items:", items.length);
        setReceiptCreated(true);
        return true;
      } else {
        console.error("Failed to create receipt");
        return false;
      }
    } catch (error) {
      console.error("Error creating receipt:", error);
      return false;
    }
  };

  // Function to fetch order items
  const fetchOrderItems = async (orderId: string): Promise<OrderItem[]> => {
    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";
      const response = await fetch(
        `${API_BASE_URL}/order-items/order/${orderId}/details`
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          console.log("Fetched order items:", result.data);
          return result.data;
        }
      }
      console.error("Failed to fetch order items");
      return [];
    } catch (error) {
      console.error("Error fetching order items:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchOrderAndUser = async () => {
      try {
        const API_BASE_URL =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "http://localhost:3005/api/v1";

        // Fetch order details
        const orderResponse = await fetch(`${API_BASE_URL}/orders/${orderId}`);

        if (orderResponse.ok) {
          const orderResult = await orderResponse.json();
          if (orderResult.success) {
            const orderData = orderResult.data;
            setOrder(orderData);

            // Fetch order items
            const items = await fetchOrderItems(orderId);
            setOrderItems(items);

            // Get current user data from localStorage
            const userData = localStorage.getItem("user");
            if (userData) {
              const parsedUser = JSON.parse(userData);
              setUser(parsedUser);

              // Create receipt when all data is available
              // Only create receipt once
              if (!receiptCreated && items.length > 0) {
                await createReceipt(orderData, parsedUser, items);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderAndUser();
    }
  }, [orderId, receiptCreated]);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <FiCheck className="w-6 h-6 text-green-500" />;
      case "Preparing":
        return <FiPackage className="w-6 h-6 text-blue-500" />;
      case "Out for Delivery":
        return <FiTruck className="w-6 h-6 text-orange-500" />;
      default:
        return <FiClock className="w-6 h-6 text-yellow-500" />;
    }
  };

  // PDF Download Function
  const downloadReceiptPDF = async () => {
    if (!order || !user) return;

    setDownloadingPdf(true);
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
      pdf.text('ORDER CONFIRMATION', pageWidth / 2, 30, { align: 'center' });
      
      let yPosition = 60;
      
      // Order Information
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Order Information', 20, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Order ID: ${order._id}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Date: ${formatDate(order.created_at)}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Order Type: ${order.order_type}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Payment Method: ${order.payment_method}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Status: ${order.status}`, 20, yPosition);
      yPosition += 15;
      
      // Customer Information
      pdf.setFont('helvetica', 'bold');
      pdf.text('Customer Information', 20, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Name: ${user.name}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Email: ${user.email}`, 20, yPosition);
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
      
      orderItems.forEach((item, index) => {
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
      pdf.text(`Total Amount: $${order.total_price.toFixed(2)}`, pageWidth - 20, yPosition, { align: 'right' });
      
      yPosition += 20;
      
      // Next Steps
      pdf.setFont('helvetica', 'bold');
      pdf.text("What's Next?", 20, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text("• You will receive an order confirmation email shortly", 20, yPosition);
      yPosition += 8;
      pdf.text(`• We'll notify you when your order is ready for ${order.order_type.toLowerCase()}`, 20, yPosition);
      yPosition += 8;
      pdf.text("• Estimated preparation time: 20-30 minutes", 20, yPosition);
      yPosition += 8;
      if (order.order_type === 'Delivery') {
        pdf.text("• Delivery time: 30-45 minutes", 20, yPosition);
        yPosition += 8;
      }
      
      yPosition += 15;
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text('Thank you for your order!', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 6;
      pdf.text('Sushi Master - Fresh Sushi Experience', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 6;
      pdf.text('Contact: support@sushimaster.com', pageWidth / 2, yPosition, { align: 'center' });
      
      // Save PDF
      pdf.save(`order-confirmation-${order._id}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  // Original text download function (keep as fallback)
  const downloadReceiptText = () => {
    if (!order || !user) return;

    const receiptContent = `
      SUSHI MASTER - RECEIPT
      ======================
      
      Receipt ID: receipt_${order._id}
      Order ID: ${order._id}
      Date: ${formatDate(order.created_at)}
      
      Customer Information:
      --------------------
      Name: ${user.name}
      Email: ${user.email}
      
      Order Details:
      -------------
      Order Type: ${order.order_type}
      Payment Method: ${order.payment_method}
      Status: ${order.status}
      
      Items:
      ------
      ${orderItems
        .map(
          (item) =>
            `${item.quantity}x ${item.name} - $${(
              item.price * item.quantity
            ).toFixed(2)}`
        )
        .join("\n      ")}
      
      Total Amount: ${formatPrice(order.total_price)}
      
      Thank you for your order!
      =========================
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${order._id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EF5350] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The order you're looking for doesn't exist.
          </p>
          <Link
            href="/menu"
            className="bg-[#EF5350] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. We're preparing it now.
            </p>
            {receiptCreated && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">
                  ✓ Receipt has been saved to your account
                </p>
              </div>
            )}
          </div>

          {/* User Information */}
          {user && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FiUser className="w-5 h-5" />
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Name:</span>
                  <p className="font-semibold">{user.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <p className="font-semibold">{user.email}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-gray-600">User ID:</span>
                  <p className="font-mono text-sm font-semibold">{user._id}</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono font-semibold text-sm">
                    {order._id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Type:</span>
                  <span className="font-semibold capitalize">
                    {order.order_type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold capitalize">
                    {order.payment_method}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-semibold">
                    {formatDate(order.created_at)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-[#EF5350] text-lg">
                    {formatPrice(order.total_price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Status
              </h2>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-semibold text-gray-900 capitalize">
                    {order.status}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.status === "Pending" &&
                      "We have received your order"}
                    {order.status === "Preparing" &&
                      "Your food is being prepared"}
                    {order.status === "Out for Delivery" &&
                      "Your order is on the way"}
                    {order.status === "Completed" &&
                      "Order delivered successfully"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          {orderItems.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                Order Items
              </h2>
              <div className="space-y-2">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What's Next?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• You will receive an order confirmation email shortly</li>
              <li>
                • We'll notify you when your order is ready for{" "}
                {order.order_type.toLowerCase()}
              </li>
              <li>• Estimated preparation time: 20-30 minutes</li>
              {order.order_type === "Delivery" && (
                <li>• Delivery time: 30-45 minutes</li>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors text-center"
            >
              Order Again
            </Link>
            
            <button
              onClick={downloadReceiptPDF}
              disabled={downloadingPdf}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloadingPdf ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <FiDownload className="w-4 h-4" />
                  <span>Download PDF Receipt</span>
                </>
              )}
            </button>

            <button
              onClick={downloadReceiptText}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              <span>Download Text Receipt</span>
            </button>

            <Link
              href="/"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              <FiHome className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Download Options Info */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Choose between PDF (professional format) or Text (simple format) receipt</p>
          </div>
        </div>
      </div>
    </div>
  );
}
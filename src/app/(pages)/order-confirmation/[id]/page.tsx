// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { FiCheck, FiClock, FiPackage, FiTruck, FiHome } from "react-icons/fi";

// interface Order {
//   _id: string;
//   total_price: number;
//   order_type: string;
//   payment_method: string;
//   status: string;
//   created_at: string;
// }

// export default function OrderConfirmation() {
//   const params = useParams();
//   const router = useRouter();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   const orderId = params.id as string;

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
//         const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
        
//         if (response.ok) {
//           const result = await response.json();
//           if (result.success) {
//             setOrder(result.data);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching order:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrder();
//     }
//   }, [orderId]);

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

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'Completed':
//         return <FiCheck className="w-6 h-6 text-green-500" />;
//       case 'Preparing':
//         return <FiPackage className="w-6 h-6 text-blue-500" />;
//       case 'Out for Delivery':
//         return <FiTruck className="w-6 h-6 text-orange-500" />;
//       default:
//         return <FiClock className="w-6 h-6 text-yellow-500" />;
//     }
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
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
//           <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
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
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
//             <p className="text-gray-600">Thank you for your order. We're preparing it now.</p>
//           </div>

//           {/* Order Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order ID:</span>
//                   <span className="font-mono font-semibold">{order._id}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order Type:</span>
//                   <span className="font-semibold capitalize">{order.order_type}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Payment Method:</span>
//                   <span className="font-semibold capitalize">{order.payment_method}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Order Date:</span>
//                   <span className="font-semibold">{formatDate(order.created_at)}</span>
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
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
//               <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                 {getStatusIcon(order.status)}
//                 <div>
//                   <p className="font-semibold text-gray-900 capitalize">{order.status}</p>
//                   <p className="text-sm text-gray-600">
//                     {order.status === 'Pending' && 'We have received your order'}
//                     {order.status === 'Preparing' && 'Your food is being prepared'}
//                     {order.status === 'Out for Delivery' && 'Your order is on the way'}
//                     {order.status === 'Completed' && 'Order delivered successfully'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Next Steps */}
//           <div className="bg-blue-50 rounded-lg p-6 mb-8">
//             <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
//             <ul className="space-y-2 text-gray-700">
//               <li>• You will receive an order confirmation email shortly</li>
//               <li>• We'll notify you when your order is ready for {order.order_type.toLowerCase()}</li>
//               <li>• Estimated preparation time: 20-30 minutes</li>
//               {order.order_type === 'Delivery' && (
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
import { FiCheck, FiClock, FiPackage, FiTruck, FiHome, FiUser } from "react-icons/fi";

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

export default function OrderConfirmation() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = params.id as string;

  useEffect(() => {
    const fetchOrderAndUser = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
        
        // Fetch order details
        const orderResponse = await fetch(`${API_BASE_URL}/orders/${orderId}`);
        
        if (orderResponse.ok) {
          const orderResult = await orderResponse.json();
          if (orderResult.success) {
            setOrder(orderResult.data);
            
            // Get current user data from localStorage
            const userData = localStorage.getItem('userData');
            if (userData) {
              const parsedUser = JSON.parse(userData);
              setUser(parsedUser);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderAndUser();
    }
  }, [orderId]);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <FiCheck className="w-6 h-6 text-green-500" />;
      case 'Preparing':
        return <FiPackage className="w-6 h-6 text-blue-500" />;
      case 'Out for Delivery':
        return <FiTruck className="w-6 h-6 text-orange-500" />;
      default:
        return <FiClock className="w-6 h-6 text-yellow-500" />;
    }
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your order. We're preparing it now.</p>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono font-semibold text-sm">{order._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Type:</span>
                  <span className="font-semibold capitalize">{order.order_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold capitalize">{order.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-semibold">{formatDate(order.created_at)}</span>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-semibold text-gray-900 capitalize">{order.status}</p>
                  <p className="text-sm text-gray-600">
                    {order.status === 'Pending' && 'We have received your order'}
                    {order.status === 'Preparing' && 'Your food is being prepared'}
                    {order.status === 'Out for Delivery' && 'Your order is on the way'}
                    {order.status === 'Completed' && 'Order delivered successfully'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• You will receive an order confirmation email shortly</li>
              <li>• We'll notify you when your order is ready for {order.order_type.toLowerCase()}</li>
              <li>• Estimated preparation time: 20-30 minutes</li>
              {order.order_type === 'Delivery' && (
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
            <Link
              href="/"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              <FiHome className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
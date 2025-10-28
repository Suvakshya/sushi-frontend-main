
// "use client";

// import { useState, useEffect } from "react";
// import { useCart } from "../../../context/CartContext";
// import { useRouter } from "next/navigation";
// import { FiArrowLeft, FiUser, FiPhone, FiMapPin, FiCreditCard, FiCheck } from "react-icons/fi";
// import Link from "next/link";
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   Elements,
//   useStripe,
//   useElements,
//   PaymentElement,
// } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// interface OrderData {
//   user_id: string;
//   total_price: number;
//   order_type: 'Delivery' | 'Takeaway';
//   payment_method: 'Cash' | 'Online';
//   status: 'Pending';
// }

// // Stripe Payment Form Component
// function StripePaymentForm({ 
//   clientSecret, 
//   orderId, 
//   total,
//   onPaymentSuccess,
//   onPaymentCancel 
// }: { 
//   clientSecret: string;
//   orderId: string;
//   total: number;
//   onPaymentSuccess: (orderId: string) => void;
//   onPaymentCancel: () => void;
// }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string>('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!stripe || !elements) {
//       return;
//     }

//     setIsProcessing(true);
//     setErrorMessage('');

//     try {
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/order-confirmation/${orderId}`,
//         },
//         redirect: 'if_required',
//       });

//       if (error) {
//         setErrorMessage(error.message || 'An unexpected error occurred');
//         console.error('Payment error:', error);
//       } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//         // Payment succeeded
//         const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
        
//         // Confirm payment with backend
//         const confirmResponse = await fetch(`${API_BASE_URL}/stripe/confirm-payment`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             paymentIntentId: paymentIntent.id,
//             orderId: orderId
//           }),
//         });

//         if (confirmResponse.ok) {
//           onPaymentSuccess(orderId);
//         } else {
//           throw new Error('Failed to confirm payment with server');
//         }
//       }
//     } catch (error) {
//       console.error('Payment processing error:', error);
//       setErrorMessage('Failed to process payment. Please try again.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
//       <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <PaymentElement />
        
//         {errorMessage && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
//             {errorMessage}
//           </div>
//         )}
        
//         <div className="flex gap-4 pt-4">
//           <button
//             type="button"
//             onClick={onPaymentCancel}
//             className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={!stripe || isProcessing}
//             className="flex-1 bg-[#EF5350] text-white py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {isProcessing ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Processing...
//               </>
//             ) : (
//               `Pay $${total.toFixed(2)}`
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// // Main Checkout Component
// export default function Checkout() {
//   const { cart, getCartTotal, clearCart } = useCart();
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [orderId, setOrderId] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [showStripeForm, setShowStripeForm] = useState(false);

//   // Form state
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     orderType: 'Delivery' as 'Delivery' | 'Takeaway',
//     paymentMethod: 'Cash' as 'Cash' | 'Online',
//     specialInstructions: ''
//   });

//   // Get user data on component mount
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       try {
//         const user = JSON.parse(userData);
//         setUserId(user._id);
//         setFormData(prev => ({
//           ...prev,
//           fullName: user.full_name || '',
//           email: user.email || '',
//           phone: user.phone_number || '',
//           address: user.address || ''
//         }));
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//       }
//     }
//   }, []);

//   // Calculate totals
//   const subtotal = getCartTotal();
//   const deliveryFee = formData.orderType === 'Delivery' ? 2.99 : 0;
//   const tax = subtotal * 0.08;
//   const total = subtotal + deliveryFee + tax;

//   const formatPrice = (price: number) => {
//     return `$${price.toFixed(2)}`;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const createOrder = async (): Promise<string | null> => {
//     try {
//       const orderData: OrderData = {
//         user_id: userId!,
//         total_price: total,
//         order_type: formData.orderType,
//         payment_method: formData.paymentMethod,
//         status: 'Pending'
//       };

//       const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
//       const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!orderResponse.ok) {
//         throw new Error('Failed to create order');
//       }

//       const orderResult = await orderResponse.json();

//       if (orderResult.success) {
//         const createdOrder = orderResult.data;

//         // Create order items
//         const orderItems = cart.map(item => ({
//           order_id: createdOrder._id,
//           item_id: item._id,
//           quantity: item.cartQuantity,
//           price: item.price
//         }));

//         const orderItemsResponse = await fetch(`${API_BASE_URL}/order-items/bulk`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ orderItems }),
//         });

//         if (!orderItemsResponse.ok) {
//           throw new Error('Failed to create order items');
//         }

//         return createdOrder._id;
//       } else {
//         throw new Error(orderResult.message || 'Failed to create order');
//       }
//     } catch (error) {
//       console.error('Order creation error:', error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Check if user is authenticated
//     if (!userId) {
//       alert('Please log in to place an order');
//       router.push('/');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // For online payment, create order first and then show Stripe form
//       if (formData.paymentMethod === 'Online') {
//         const createdOrderId = await createOrder();
//         if (createdOrderId) {
//           setOrderId(createdOrderId);
          
//           // Create payment intent
//           const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
//           const paymentResponse = await fetch(`${API_BASE_URL}/stripe/create-payment-intent`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               amount: total,
//               orderId: createdOrderId
//             }),
//           });

//           if (!paymentResponse.ok) {
//             throw new Error('Failed to create payment intent');
//           }

//           const paymentResult = await paymentResponse.json();
          
//           if (paymentResult.success) {
//             setClientSecret(paymentResult.clientSecret);
//             setShowStripeForm(true);
//           } else {
//             throw new Error(paymentResult.message || 'Failed to create payment intent');
//           }
//         }
//       } else {
//         // For cash payments, create order and complete immediately
//         const createdOrderId = await createOrder();
//         if (createdOrderId) {
//           setOrderId(createdOrderId);
//           clearCart();
//           setOrderSuccess(true);
          
//           setTimeout(() => {
//             router.push(`/order-confirmation/${createdOrderId}`);
//           }, 3000);
//         }
//       }
//     } catch (error) {
//       console.error('Order submission error:', error);
//       alert('Failed to place order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handlePaymentSuccess = (orderId: string) => {
//     clearCart();
//     setOrderSuccess(true);
//     setShowStripeForm(false);
    
//     setTimeout(() => {
//       router.push(`/order-confirmation/${orderId}`);
//     }, 2000);
//   };

//   const handlePaymentCancel = () => {
//     setShowStripeForm(false);
//     setClientSecret(null);
//   };

//   // Redirect if cart is empty and not in success state
//   useEffect(() => {
//     if (cart.length === 0 && !orderSuccess && !showStripeForm) {
//       router.push('/menu');
//     }
//   }, [cart, orderSuccess, showStripeForm, router]);

//   if (cart.length === 0 && !orderSuccess && !showStripeForm) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
//               <span className="text-6xl">🛒</span>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
//             <p className="text-gray-600 mb-8">Add some delicious sushi to get started!</p>
//             <Link
//               href="/menu"
//               className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors inline-flex items-center gap-2"
//             >
//               <FiArrowLeft className="w-4 h-4" />
//               Browse Menu
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (orderSuccess) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <FiCheck className="w-10 h-10 text-green-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
//           <p className="text-gray-600 mb-2">Thank you for your order.</p>
//           <p className="text-gray-600 mb-6">Order ID: <span className="font-mono">{orderId}</span></p>
//           <div className="animate-pulse text-sm text-gray-500">
//             Redirecting to order details...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex items-center mb-8">
//           <Link
//             href="/cart"
//             className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//           >
//             <FiArrowLeft className="w-5 h-5 mr-2" />
//             Back to Cart
//           </Link>
//         </div>

//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

//         {/* User Info Display */}
//         {userId && (
//           <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
//             <p className="text-green-700 font-semibold">
//               ✓ Ordering as: {formData.fullName || 'Logged in user'}
//             </p>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Checkout Form */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Personal Information */}
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <FiUser className="w-5 h-5" />
//                   Personal Information
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
//                       placeholder="Enter your full name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
//                       placeholder="Enter your email"
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                     <FiPhone className="w-4 h-4" />
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//               </div>

//               {/* Order Type */}
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Order Type</h2>
//                 <div className="grid grid-cols-2 gap-4">
//                   <label className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData.orderType === 'Delivery' 
//                       ? 'border-[#EF5350] bg-red-50' 
//                       : 'border-gray-300 hover:border-gray-400'
//                   }`}>
//                     <input
//                       type="radio"
//                       name="orderType"
//                       value="Delivery"
//                       checked={formData.orderType === 'Delivery'}
//                       onChange={handleInputChange}
//                       className="sr-only"
//                     />
//                     <span className="font-semibold text-gray-900">Delivery</span>
//                     <span className="text-sm text-gray-600 mt-1">$2.99 delivery fee</span>
//                   </label>
//                   <label className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData.orderType === 'Takeaway' 
//                       ? 'border-[#EF5350] bg-red-50' 
//                       : 'border-gray-300 hover:border-gray-400'
//                   }`}>
//                     <input
//                       type="radio"
//                       name="orderType"
//                       value="Takeaway"
//                       checked={formData.orderType === 'Takeaway'}
//                       onChange={handleInputChange}
//                       className="sr-only"
//                     />
//                     <span className="font-semibold text-gray-900">Takeaway</span>
//                     <span className="text-sm text-gray-600 mt-1">Pick up in store</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Delivery Address */}
//               {formData.orderType === 'Delivery' && (
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                     <FiMapPin className="w-5 h-5" />
//                     Delivery Address
//                   </h2>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Street Address *
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
//                         placeholder="Enter your street address"
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           City *
//                         </label>
//                         <input
//                           type="text"
//                           name="city"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
//                           placeholder="Enter your city"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           ZIP Code *
//                         </label>
//                         <input
//                           type="text"
//                           name="zipCode"
//                           value={formData.zipCode}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
//                           placeholder="Enter ZIP code"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Payment Method */}
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <FiCreditCard className="w-5 h-5" />
//                   Payment Method
//                 </h2>
//                 <div className="space-y-3">
//                   {(['Cash', 'Online'] as const).map((method) => (
//                     <label key={method} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                       formData.paymentMethod === method 
//                         ? 'border-[#EF5350] bg-red-50' 
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}>
//                       <input
//                         type="radio"
//                         name="paymentMethod"
//                         value={method}
//                         checked={formData.paymentMethod === method}
//                         onChange={handleInputChange}
//                         className="w-4 h-4 text-[#EF5350] focus:ring-[#EF5350] border-gray-300"
//                       />
//                       <span className="ml-3 font-medium text-gray-900">{method}</span>
//                       {method === 'Online' && (
//                         <span className="ml-2 text-sm text-gray-600">(Redirect to Stripe)</span>
//                       )}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Special Instructions */}
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Special Instructions</h2>
//                 <textarea
//                   name="specialInstructions"
//                   value={formData.specialInstructions}
//                   onChange={handleInputChange}
//                   rows={4}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
//                   placeholder="Any special instructions for your order..."
//                 />
//               </div>

//               {!showStripeForm && (
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !userId}
//                   className="w-full bg-[#EF5350] text-white py-4 rounded-lg font-semibold hover:bg-[#E57373] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {!userId ? (
//                     "Please log in to place order"
//                   ) : isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       {formData.paymentMethod === 'Online' ? 'Redirecting to Payment...' : 'Processing...'}
//                     </>
//                   ) : (
//                     `${formData.paymentMethod === 'Online' ? 'Proceed to Payment' : 'Place Order'} - ${formatPrice(total)}`
//                   )}
//                 </button>
//               )}
//             </form>

//             {/* Stripe Payment Form */}
//             {showStripeForm && clientSecret && orderId && (
//               <Elements stripe={stripePromise} options={{ clientSecret }}>
//                 <StripePaymentForm
//                   clientSecret={clientSecret}
//                   orderId={orderId}
//                   total={total}
//                   onPaymentSuccess={handlePaymentSuccess}
//                   onPaymentCancel={handlePaymentCancel}
//                 />
//               </Elements>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
//               {/* Cart Items */}
//               <div className="space-y-4 mb-6">
//                 {cart.map((item) => (
//                   <div key={item._id} className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
//                       {item.image ? (
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-lg">🍣</span>
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
//                       <p className="text-gray-600 text-xs">
//                         Qty: {item.cartQuantity} × {formatPrice(item.price)}
//                       </p>
//                     </div>
//                     <span className="font-semibold text-gray-900">
//                       {formatPrice(item.price * item.cartQuantity)}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Order Details */}
//               <div className="space-y-3 border-t border-gray-200 pt-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-medium">{formatPrice(subtotal)}</span>
//                 </div>
//                 {formData.orderType === 'Delivery' && (
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Delivery Fee</span>
//                     <span className="font-medium">{formatPrice(deliveryFee)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax (8%)</span>
//                   <span className="font-medium">{formatPrice(tax)}</span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-3">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span className="text-[#EF5350]">{formatPrice(total)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Type Display */}
//               <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Order Type:</span>
//                   <span className="font-semibold text-gray-900 capitalize">
//                     {formData.orderType}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-sm text-gray-600">Payment:</span>
//                   <span className="font-semibold text-gray-900 capitalize">
//                     {formData.paymentMethod}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUser, FiPhone, FiMapPin, FiCreditCard, FiCheck } from "react-icons/fi";
import Link from "next/link";

interface OrderData {
  user_id: string;
  total_price: number;
  order_type: 'Delivery' | 'Takeaway';
  payment_method: 'Cash' | 'Online';
  status: 'Pending';
}

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    orderType: 'Delivery' as 'Delivery' | 'Takeaway',
    paymentMethod: 'Cash' as 'Cash' | 'Online',
    specialInstructions: ''
  });

  // Get user data on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserId(user._id);
        setFormData(prev => ({
          ...prev,
          fullName: user.full_name || '',
          email: user.email || '',
          phone: user.phone_number || '',
          address: user.address || ''
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Calculate totals
  const subtotal = getCartTotal();
  const deliveryFee = formData.orderType === 'Delivery' ? 2.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createOrder = async (): Promise<string | null> => {
    try {
      const orderData: OrderData = {
        user_id: userId!,
        total_price: total,
        order_type: formData.orderType,
        payment_method: formData.paymentMethod,
        status: 'Pending'
      };

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
      const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderResult = await orderResponse.json();

      if (orderResult.success) {
        const createdOrder = orderResult.data;

        // Create order items
        const orderItems = cart.map(item => ({
          order_id: createdOrder._id,
          item_id: item._id,
          quantity: item.cartQuantity,
          price: item.price
        }));

        const orderItemsResponse = await fetch(`${API_BASE_URL}/order-items/bulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderItems }),
        });

        if (!orderItemsResponse.ok) {
          throw new Error('Failed to create order items');
        }

        return createdOrder._id;
      } else {
        throw new Error(orderResult.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!userId) {
      alert('Please log in to place an order');
      router.push('/');
      return;
    }

    setIsSubmitting(true);

    try {
      if (formData.paymentMethod === 'Online') {
        // For online payment - create order and redirect to Stripe
        const createdOrderId = await createOrder();
        if (createdOrderId) {
          setOrderId(createdOrderId);
          
          // Create Stripe Checkout Session
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
          const checkoutResponse = await fetch(`${API_BASE_URL}/stripe/create-checkout-session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: total,
              orderId: createdOrderId,
              successUrl: `${window.location.origin}/order-confirmation/${createdOrderId}`,
              cancelUrl: `${window.location.origin}/checkout`
            }),
          });

          if (!checkoutResponse.ok) {
            throw new Error('Failed to create checkout session');
          }

          const checkoutResult = await checkoutResponse.json();
          
          if (checkoutResult.success) {
            // Redirect to Stripe Checkout
            window.location.href = checkoutResult.url;
          } else {
            throw new Error(checkoutResult.message || 'Failed to create checkout session');
          }
        }
      } else {
        // For cash payment - create order and complete immediately
        const createdOrderId = await createOrder();
        if (createdOrderId) {
          setOrderId(createdOrderId);
          clearCart();
          setOrderSuccess(true);
          
          setTimeout(() => {
            router.push(`/order-confirmation/${createdOrderId}`);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if cart is empty and not in success state
  useEffect(() => {
    if (cart.length === 0 && !orderSuccess) {
      router.push('/menu');
    }
  }, [cart, orderSuccess, router]);

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some delicious sushi to get started!</p>
            <Link
              href="/menu"
              className="bg-[#EF5350] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E57373] transition-colors inline-flex items-center gap-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order.</p>
          <p className="text-gray-600 mb-6">Order ID: <span className="font-mono">{orderId}</span></p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting to order details...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/cart"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* User Info Display */}
        {userId && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-700 font-semibold">
              ✓ Ordering as: {formData.fullName || 'Logged in user'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiUser className="w-5 h-5" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiPhone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Order Type */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.orderType === 'Delivery' 
                      ? 'border-[#EF5350] bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="orderType"
                      value="Delivery"
                      checked={formData.orderType === 'Delivery'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-semibold text-gray-900">Delivery</span>
                    <span className="text-sm text-gray-600 mt-1">$2.99 delivery fee</span>
                  </label>
                  <label className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.orderType === 'Takeaway' 
                      ? 'border-[#EF5350] bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="orderType"
                      value="Takeaway"
                      checked={formData.orderType === 'Takeaway'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-semibold text-gray-900">Takeaway</span>
                    <span className="text-sm text-gray-600 mt-1">Pick up in store</span>
                  </label>
                </div>
              </div>

              {/* Delivery Address */}
              {formData.orderType === 'Delivery' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FiMapPin className="w-5 h-5" />
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
                        placeholder="Enter your street address"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
                          placeholder="Enter your city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
                          placeholder="Enter ZIP code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiCreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {(['Cash', 'Online'] as const).map((method) => (
                    <label key={method} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === method 
                        ? 'border-[#EF5350] bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#EF5350] focus:ring-[#EF5350] border-gray-300"
                      />
                      <span className="ml-3 font-medium text-gray-900">{method}</span>
                      {method === 'Online' && (
                        <span className="ml-2 text-sm text-gray-600">(Redirect to Stripe)</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Special Instructions</h2>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF5350] focus:border-transparent transition-colors"
                  placeholder="Any special instructions for your order..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !userId}
                className="w-full bg-[#EF5350] text-white py-4 rounded-lg font-semibold hover:bg-[#E57373] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {!userId ? (
                  "Please log in to place order"
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {formData.paymentMethod === 'Online' ? 'Redirecting to Payment...' : 'Processing...'}
                  </>
                ) : (
                  `${formData.paymentMethod === 'Online' ? 'Proceed to Payment' : 'Place Order'} - ${formatPrice(total)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">🍣</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-gray-600 text-xs">
                        Qty: {item.cartQuantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.cartQuantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {formData.orderType === 'Delivery' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">{formatPrice(deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#EF5350]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Order Type Display */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Order Type:</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {formData.orderType}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Payment:</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {formData.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
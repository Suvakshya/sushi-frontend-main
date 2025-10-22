// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AxiosError } from "axios";
// import { FiEdit, FiEye, FiRefreshCw, FiGrid, FiList } from "react-icons/fi";
// import { motion } from "framer-motion";
// import Image from "next/image";

// // Import reusable components
// import CardGrid from "@/components/DashboardComponents/CardGrid/CardGrid";
// import FormModal from "@/components/DashboardComponents/FormModal/FormModal";
// import PaginationControls from "@/components/DashboardComponents/PaginationControls/PaginationControls";

// const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// interface User {
//   _id: string;
//   full_name: string;
//   email: string;
//   phone_number: string;
//   address?: string;
// }

// interface MenuItem {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   imageUrl: string;
//   is_available: boolean;
// }

// interface Order {
//   _id: string;
//   user_id: User;
//   total_price: number;
//   order_type: "Delivery" | "Takeaway";
//   payment_method: "Cash" | "Card" | "Online";
//   status: "Pending" | "Preparing" | "Out for Delivery" | "Completed" | "Cancelled";
//   created_at: string;
//   updated_at: string;
// }

// interface OrderItem {
//   _id: string;
//   order_id: Order;
//   item_id: MenuItem;
//   quantity: number;
//   price: number;
// }

// interface OrderDetails extends Order {
//   order_items: OrderItem[];
// }

// export default function OrdersManagement() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
//   const [form, setForm] = useState({
//     status: "" as Order["status"],
//   });
//   const [editId, setEditId] = useState<string | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [detailsModalOpen, setDetailsModalOpen] = useState(false);
//   const [refreshLoading, setRefreshLoading] = useState(false);
//   const [viewMode, setViewMode] = useState<"list" | "card">("list"); // Default to list view

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(orders.length / itemsPerPage);
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentOrders = orders.slice(indexOfFirst, indexOfLast);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const fetchOrders = async () => {
//     try {
//       setRefreshLoading(true);
//       const res = await axios.get<ApiResponse<Order[]>>(`${API}/orders`);
//       // Sort orders by created_at descending (latest first)
//       const sortedOrders = (res.data.data || []).sort((a, b) => 
//         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//       );
//       setOrders(sortedOrders);
//     } catch (err) {
//       console.error(err);
//       setOrders([]);
//     } finally {
//       setRefreshLoading(false);
//     }
//   };

//   const fetchOrderDetails = async (orderId: string) => {
//     try {
//       const [orderRes, itemsRes] = await Promise.all([
//         axios.get<ApiResponse<Order>>(`${API}/orders/${orderId}`),
//         axios.get<ApiResponse<OrderItem[]>>(`${API}/order-items/order/${orderId}`),
//       ]);

//       const orderDetails: OrderDetails = {
//         ...orderRes.data.data,
//         order_items: itemsRes.data.data || [],
//       };

//       setOrderDetails(orderDetails);
//       setDetailsModalOpen(true);
//     } catch (err) {
//       console.error("Error fetching order details:", err);
//       setError("Failed to fetch order details");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editId) return;

//     setLoading(true);
//     setError("");

//     try {
//       await axios.patch(
//         `${API}/orders/${editId}/status`,
//         { status: form.status },
//         axiosConfig
//       );

//       resetForm();
//       fetchOrders();
//       closeModal();
//     } catch (err) {
//       const axiosError = err as AxiosError<{ message: string }>;
//       setError(axiosError.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (order: Order) => {
//     setForm({
//       status: order.status,
//     });
//     setEditId(order._id);
//     setShowModal(true);
//   };

//   const handleViewDetails = (order: Order) => {
//     fetchOrderDetails(order._id);
//   };

//   const resetForm = () => {
//     setForm({
//       status: "" as Order["status"],
//     });
//     setEditId(null);
//     setError("");
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const closeDetailsModal = () => {
//     setDetailsModalOpen(false);
//     setOrderDetails(null);
//   };

//   const getStatusColor = (status: Order["status"]) => {
//     switch (status) {
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "Preparing":
//         return "bg-blue-100 text-blue-800";
//       case "Out for Delivery":
//         return "bg-purple-100 text-purple-800";
//       case "Completed":
//         return "bg-green-100 text-green-800";
//       case "Cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getOrderTypeColor = (type: Order["order_type"]) => {
//     return type === "Delivery"
//       ? "bg-orange-100 text-orange-800"
//       : "bg-teal-100 text-teal-800";
//   };

//   const getPaymentMethodColor = (method: Order["payment_method"]) => {
//     switch (method) {
//       case "Cash":
//         return "bg-gray-100 text-gray-800";
//       case "Card":
//         return "bg-indigo-100 text-indigo-800";
//       case "Online":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatShortDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Card View Renderer
//   const renderOrderCard = (order: Order) => (
//     <motion.div
//       key={order._id}
//       className="relative bg-white overflow-hidden rounded-xl shadow-lg p-6 border border-gray-200"
//       whileHover={{ scale: 1.02 }}
//     >
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">
//             Order #{order._id.slice(-6).toUpperCase()}
//           </h3>
//           <p className="text-sm text-gray-600">
//             {formatDate(order.created_at)}
//           </p>
//         </div>
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//             order.status
//           )}`}
//         >
//           {order.status}
//         </span>
//       </div>

//       <div className="space-y-3 mb-4">
//         <div>
//           <p className="text-sm font-medium text-gray-600">Customer</p>
//           <p className="text-lg font-semibold">{order.user_id.full_name}</p>
//           <p className="text-sm text-gray-600">{order.user_id.phone_number}</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm font-medium text-gray-600">Type</p>
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeColor(
//                 order.order_type
//               )}`}
//             >
//               {order.order_type}
//             </span>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-600">Payment</p>
//             <span
//               className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(
//                 order.payment_method
//               )}`}
//             >
//               {order.payment_method}
//             </span>
//           </div>
//         </div>

//         <div>
//           <p className="text-sm font-medium text-gray-600">Total Amount</p>
//           <p className="text-xl font-bold text-green-600">
//             ${order.total_price.toFixed(2)}
//           </p>
//         </div>
//       </div>

//       <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//         <button
//           onClick={() => handleViewDetails(order)}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
//         >
//           <FiEye size={16} />
//           View Details
//         </button>
//         <button
//           onClick={() => handleEdit(order)}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
//         >
//           <FiEdit size={16} />
//           Update Status
//         </button>
//       </div>
//     </motion.div>
//   );

//   // List View Renderer
//   const renderOrderList = (order: Order) => (
//     <motion.div
//       key={order._id}
//       className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition-shadow"
//       whileHover={{ x: 4 }}
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
//         {/* Order ID & Date */}
//         <div className="lg:col-span-2">
//           <div className="font-semibold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</div>
//           <div className="text-sm text-gray-500">{formatShortDate(order.created_at)}</div>
//         </div>

//         {/* Customer */}
//         <div className="lg:col-span-2">
//           <div className="font-medium text-gray-900">{order.user_id.full_name}</div>
//           <div className="text-sm text-gray-500">{order.user_id.phone_number}</div>
//         </div>

//         {/* Status */}
//         <div className="lg:col-span-2">
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
//             {order.status}
//           </span>
//         </div>

//         {/* Type & Payment */}
//         <div className="lg:col-span-2">
//           <div className="flex flex-wrap gap-2">
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeColor(order.order_type)}`}>
//               {order.order_type}
//             </span>
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(order.payment_method)}`}>
//               {order.payment_method}
//             </span>
//           </div>
//         </div>

//         {/* Total Amount */}
//         <div className="lg:col-span-2">
//           <div className="text-lg font-bold text-green-600">${order.total_price.toFixed(2)}</div>
//         </div>

//         {/* Actions */}
//         <div className="lg:col-span-2">
//           <div className="flex gap-3 justify-end">
//             <button
//               onClick={() => handleViewDetails(order)}
//               className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
//               title="View Details"
//             >
//               <FiEye size={16} />
//               <span className="hidden sm:inline">Details</span>
//             </button>
//             <button
//               onClick={() => handleEdit(order)}
//               className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm"
//               title="Update Status"
//             >
//               <FiEdit size={16} />
//               <span className="hidden sm:inline">Update</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900">Orders Management</h2>
//             <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
//           </div>
//           <div className="flex gap-3">
//             {/* View Mode Toggle */}
//             <div className="flex bg-white rounded-lg shadow border border-gray-200 p-1">
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
//                   viewMode === "list" 
//                     ? "bg-blue-100 text-blue-700" 
//                     : "text-gray-600 hover:text-gray-700"
//                 }`}
//                 title="List View"
//               >
//                 <FiList size={18} />
//                 <span className="hidden sm:inline">List</span>
//               </button>
//               <button
//                 onClick={() => setViewMode("card")}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
//                   viewMode === "card" 
//                     ? "bg-blue-100 text-blue-700" 
//                     : "text-gray-600 hover:text-gray-700"
//                 }`}
//                 title="Card View"
//               >
//                 <FiGrid size={18} />
//                 <span className="hidden sm:inline">Card</span>
//               </button>
//             </div>

//             {/* Refresh Button */}
//             <button
//               onClick={fetchOrders}
//               disabled={refreshLoading}
//               className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition disabled:opacity-50"
//             >
//               <FiRefreshCw
//                 size={18}
//                 className={refreshLoading ? "animate-spin" : ""}
//               />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Statistics */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow border">
//             <p className="text-gray-600 text-sm">Total Orders</p>
//             <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow border">
//             <p className="text-gray-600 text-sm">Pending</p>
//             <p className="text-3xl font-bold text-yellow-600">
//               {orders.filter((o) => o.status === "Pending").length}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow border">
//             <p className="text-gray-600 text-sm">In Progress</p>
//             <p className="text-3xl font-bold text-blue-600">
//               {orders.filter((o) => o.status === "Preparing" || o.status === "Out for Delivery").length}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow border">
//             <p className="text-gray-600 text-sm">Completed</p>
//             <p className="text-3xl font-bold text-green-600">
//               {orders.filter((o) => o.status === "Completed").length}
//             </p>
//           </div>
//         </div>

//         {/* Orders Display */}
//         {viewMode === "card" ? (
//           <CardGrid
//             items={currentOrders}
//             renderItem={renderOrderCard}
//             emptyMessage="No orders found"
//             gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           />
//         ) : (
//           <div className="space-y-4">
//             {currentOrders.length === 0 ? (
//               <div className="text-center py-12 bg-white rounded-lg shadow border">
//                 <p className="text-gray-500 text-lg">No orders found</p>
//               </div>
//             ) : (
//               currentOrders.map(renderOrderList)
//             )}
//           </div>
//         )}

//         <PaginationControls
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />

//         {/* Update Status Modal */}
//         <FormModal
//           isOpen={showModal}
//           onClose={closeModal}
//           title="Update Order Status"
//           onSubmit={handleSubmit}
//           isLoading={loading}
//           isEdit={!!editId}
//           error={error}
//           submitText="Update Status"
//         >
//           <div className="space-y-4">
//             <div className="flex flex-col">
//               <label htmlFor="status" className="text-gray-700 font-medium mb-2">
//                 Order Status
//               </label>
//               <select
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 required
//                 className="px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
//               >
//                 <option value="">Select Status</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Preparing">Preparing</option>
//                 <option value="Out for Delivery">Out for Delivery</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//             </div>
//           </div>
//         </FormModal>

//         {/* Order Details Modal */}
//         {detailsModalOpen && orderDetails && (
//           <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
//             >
//               <div className="p-6 border-b border-gray-200/60">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-2xl font-bold text-gray-900">
//                     Order Details - #{orderDetails._id.slice(-6).toUpperCase()}
//                   </h3>
//                   <button
//                     onClick={closeDetailsModal}
//                     className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
//                   >
//                     ×
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 space-y-6">
//                 {/* Customer Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50">
//                     <h4 className="font-semibold text-lg mb-3 text-gray-800">Customer Information</h4>
//                     <div className="space-y-2">
//                       <p><strong className="text-gray-700">Name:</strong> {orderDetails.user_id.full_name}</p>
//                       <p><strong className="text-gray-700">Email:</strong> {orderDetails.user_id.email}</p>
//                       <p><strong className="text-gray-700">Phone:</strong> {orderDetails.user_id.phone_number}</p>
//                       {orderDetails.user_id.address && (
//                         <p><strong className="text-gray-700">Address:</strong> {orderDetails.user_id.address}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50">
//                     <h4 className="font-semibold text-lg mb-3 text-gray-800">Order Information</h4>
//                     <div className="space-y-2">
//                       <p><strong className="text-gray-700">Order Type:</strong> 
//                         <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getOrderTypeColor(orderDetails.order_type)}`}>
//                           {orderDetails.order_type}
//                         </span>
//                       </p>
//                       <p><strong className="text-gray-700">Payment Method:</strong> 
//                         <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getPaymentMethodColor(orderDetails.payment_method)}`}>
//                           {orderDetails.payment_method}
//                         </span>
//                       </p>
//                       <p><strong className="text-gray-700">Status:</strong> 
//                         <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(orderDetails.status)}`}>
//                           {orderDetails.status}
//                         </span>
//                       </p>
//                       <p><strong className="text-gray-700">Order Date:</strong> {formatDate(orderDetails.created_at)}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div>
//                   <h4 className="font-semibold text-lg mb-3 text-gray-800">Order Items</h4>
//                   <div className="space-y-3">
//                     {orderDetails.order_items.map((item) => (
//                       <div key={item._id} className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50">
//                         <div className="relative w-16 h-16 rounded-lg overflow-hidden">
//                           <Image
//                             src={item.item_id.imageUrl || "/placeholder-food.jpg"}
//                             alt={item.item_id.name}
//                             fill
//                             style={{ objectFit: "cover" }}
//                             className="rounded-lg"
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <h5 className="font-semibold text-gray-800">{item.item_id.name}</h5>
//                           <p className="text-sm text-gray-600">Category: {item.item_id.category}</p>
//                           <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-semibold text-gray-800">${item.price.toFixed(2)}</p>
//                           <p className="text-sm text-gray-600">${item.item_id.price.toFixed(2)} each</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-gray-200/50">
//                   <h4 className="font-semibold text-lg mb-3 text-gray-800">Order Summary</h4>
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
//                     <span className="text-2xl font-bold text-green-600">
//                       ${orderDetails.total_price.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { FiEdit, FiEye, FiRefreshCw, FiGrid, FiList } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

// Import reusable components
import CardGrid from "@/components/DashboardComponents/CardGrid/CardGrid";
import FormModal from "@/components/DashboardComponents/FormModal/FormModal";
import PaginationControls from "@/components/DashboardComponents/PaginationControls/PaginationControls";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface User {
  _id: string;
  full_name: string;
  email: string;
  phone_number: string;
  address?: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  is_available: boolean;
}

interface Order {
  _id: string;
  user_id: User;
  total_price: number;
  order_type: "Delivery" | "Takeaway";
  payment_method: "Cash" | "Card" | "Online";
  status: "Pending" | "Preparing" | "Out for Delivery" | "Completed" | "Cancelled";
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  _id: string;
  order_id: Order;
  item_id: MenuItem;
  quantity: number;
  price: number;
}

interface OrderDetails extends Order {
  order_items: OrderItem[];
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [form, setForm] = useState({
    status: "" as Order["status"],
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "card">("list"); // Default to list view

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchOrders = async () => {
    try {
      setRefreshLoading(true);
      const res = await axios.get<ApiResponse<Order[]>>(`${API}/orders`);
      // Sort orders by created_at descending (latest first)
      const sortedOrders = (res.data.data || []).sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setRefreshLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const [orderRes, itemsRes] = await Promise.all([
        axios.get<ApiResponse<Order>>(`${API}/orders/${orderId}`),
        axios.get<ApiResponse<OrderItem[]>>(`${API}/order-items/order/${orderId}`),
      ]);

      const orderDetails: OrderDetails = {
        ...orderRes.data.data,
        order_items: itemsRes.data.data || [],
      };

      setOrderDetails(orderDetails);
      setDetailsModalOpen(true);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to fetch order details");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;

    setLoading(true);
    setError("");

    try {
      await axios.patch(
        `${API}/orders/${editId}/status`,
        { status: form.status },
        axiosConfig
      );

      resetForm();
      fetchOrders();
      closeModal();
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (order: Order) => {
    setForm({
      status: order.status,
    });
    setEditId(order._id);
    setShowModal(true);
  };

  const handleViewDetails = (order: Order) => {
    fetchOrderDetails(order._id);
  };

  const resetForm = () => {
    setForm({
      status: "" as Order["status"],
    });
    setEditId(null);
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setOrderDetails(null);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Preparing":
        return "bg-blue-100 text-blue-800";
      case "Out for Delivery":
        return "bg-purple-100 text-purple-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderTypeColor = (type: Order["order_type"]) => {
    return type === "Delivery"
      ? "bg-orange-100 text-orange-800"
      : "bg-teal-100 text-teal-800";
  };

  const getPaymentMethodColor = (method: Order["payment_method"]) => {
    switch (method) {
      case "Cash":
        return "bg-gray-100 text-gray-800";
      case "Card":
        return "bg-indigo-100 text-indigo-800";
      case "Online":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Card View Renderer
  const renderOrderCard = (order: Order) => (
    <motion.div
      key={order._id}
      className="relative bg-white overflow-hidden rounded-xl shadow-lg p-6 border border-[#EF5350]/40"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Order #{order._id.slice(-6).toUpperCase()}
          </h3>
          <p className="text-sm text-gray-600">
            {formatDate(order.created_at)}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Customer</p>
          <p className="text-lg font-semibold">{order.user_id.full_name}</p>
          <p className="text-sm text-gray-600">{order.user_id.phone_number}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Type</p>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeColor(
                order.order_type
              )}`}
            >
              {order.order_type}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Payment</p>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(
                order.payment_method
              )}`}
            >
              {order.payment_method}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600">Total Amount</p>
          <p className="text-xl font-bold text-[#EF5350]">
            ${order.total_price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          onClick={() => handleViewDetails(order)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <FiEye size={16} />
          View Details
        </button>
        <button
          onClick={() => handleEdit(order)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
        >
          <FiEdit size={16} />
          Update Status
        </button>
      </div>
    </motion.div>
  );

  // List View Renderer
  const renderOrderList = (order: Order) => (
    <motion.div
      key={order._id}
      className="bg-white rounded-lg shadow border border-[#EF5350]/40 p-6 hover:shadow-md transition-shadow"
      whileHover={{ x: 4 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Order ID & Date */}
        <div className="lg:col-span-2">
          <div className="font-semibold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</div>
          <div className="text-sm text-gray-500">{formatShortDate(order.created_at)}</div>
        </div>

        {/* Customer */}
        <div className="lg:col-span-2">
          <div className="font-medium text-gray-900">{order.user_id.full_name}</div>
          <div className="text-sm text-gray-500">{order.user_id.phone_number}</div>
        </div>

        {/* Status */}
        <div className="lg:col-span-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>

        {/* Type & Payment */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderTypeColor(order.order_type)}`}>
              {order.order_type}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(order.payment_method)}`}>
              {order.payment_method}
            </span>
          </div>
        </div>

        {/* Total Amount */}
        <div className="lg:col-span-2">
          <div className="text-lg font-bold text-[#EF5350]">${order.total_price.toFixed(2)}</div>
        </div>

        {/* Actions */}
        <div className="lg:col-span-2">
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => handleViewDetails(order)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
              title="View Details"
            >
              <FiEye size={16} />
              <span className="hidden sm:inline">Details</span>
            </button>
            <button
              onClick={() => handleEdit(order)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm"
              title="Update Status"
            >
              <FiEdit size={16} />
              <span className="hidden sm:inline">Update</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 bg-[#FFEBEE] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="text-[#EF5350]">Orders</span> Management
            </h2>
            <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
          </div>
          <div className="flex gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg shadow border border-[#EF5350]/40 p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  viewMode === "list" 
                    ? "bg-[#EF5350] text-white" 
                    : "text-gray-600 hover:text-gray-700"
                }`}
                title="List View"
              >
                <FiList size={18} />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                  viewMode === "card" 
                    ? "bg-[#EF5350] text-white" 
                    : "text-gray-600 hover:text-gray-700"
                }`}
                title="Card View"
              >
                <FiGrid size={18} />
                <span className="hidden sm:inline">Card</span>
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchOrders}
              disabled={refreshLoading}
              className="flex items-center gap-2 bg-[#EF5350] hover:bg-[#E57373] text-white px-4 py-2 rounded-lg shadow transition disabled:opacity-50"
            >
              <FiRefreshCw
                size={18}
                className={refreshLoading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border border-[#EF5350]/40">
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-[#EF5350]">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-[#EF5350]/40">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-[#EF5350]/40">
            <p className="text-gray-600 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "Preparing" || o.status === "Out for Delivery").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-[#EF5350]/40">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {orders.filter((o) => o.status === "Completed").length}
            </p>
          </div>
        </div>

        {/* Orders Display */}
        {viewMode === "card" ? (
          <CardGrid
            items={currentOrders}
            renderItem={renderOrderCard}
            emptyMessage="No orders found"
            gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          />
        ) : (
          <div className="space-y-4">
            {currentOrders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow border border-[#EF5350]/40">
                <p className="text-gray-500 text-lg">No orders found</p>
              </div>
            ) : (
              currentOrders.map(renderOrderList)
            )}
          </div>
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Update Status Modal */}
        <FormModal
          isOpen={showModal}
          onClose={closeModal}
          title="Update Order Status"
          onSubmit={handleSubmit}
          isLoading={loading}
          isEdit={!!editId}
          error={error}
          submitText="Update Status"
        >
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="status" className="text-gray-700 font-medium mb-2">
                Order Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
                className="px-4 py-2 rounded-lg border border-[#EF5350] focus:border-[#EF5350] focus:ring-1 focus:ring-[#EF9A9A] transition"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </FormModal>

        {/* Order Details Modal */}
        {detailsModalOpen && orderDetails && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#EF5350]/40"
            >
              <div className="p-6 border-b border-gray-200/60">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    <span className="text-[#EF5350]">Order Details</span> - #{orderDetails._id.slice(-6).toUpperCase()}
                  </h3>
                  <button
                    onClick={closeDetailsModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-200"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#EF5350]/40">
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Customer Information</h4>
                    <div className="space-y-2">
                      <p><strong className="text-gray-700">Name:</strong> {orderDetails.user_id.full_name}</p>
                      <p><strong className="text-gray-700">Email:</strong> {orderDetails.user_id.email}</p>
                      <p><strong className="text-gray-700">Phone:</strong> {orderDetails.user_id.phone_number}</p>
                      {orderDetails.user_id.address && (
                        <p><strong className="text-gray-700">Address:</strong> {orderDetails.user_id.address}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#EF5350]/40">
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Order Information</h4>
                    <div className="space-y-2">
                      <p><strong className="text-gray-700">Order Type:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getOrderTypeColor(orderDetails.order_type)}`}>
                          {orderDetails.order_type}
                        </span>
                      </p>
                      <p><strong className="text-gray-700">Payment Method:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getPaymentMethodColor(orderDetails.payment_method)}`}>
                          {orderDetails.payment_method}
                        </span>
                      </p>
                      <p><strong className="text-gray-700">Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(orderDetails.status)}`}>
                          {orderDetails.status}
                        </span>
                      </p>
                      <p><strong className="text-gray-700">Order Date:</strong> {formatDate(orderDetails.created_at)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Order Items</h4>
                  <div className="space-y-3">
                    {orderDetails.order_items.map((item) => (
                      <div key={item._id} className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#EF5350]/40">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={item.item_id.imageUrl || "/placeholder-food.jpg"}
                            alt={item.item_id.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800">{item.item_id.name}</h5>
                          <p className="text-sm text-gray-600">Category: {item.item_id.category}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#EF5350]">${item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">${item.item_id.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-[#EF5350]/40">
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Order Summary</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                    <span className="text-2xl font-bold text-[#EF5350]">
                      ${orderDetails.total_price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
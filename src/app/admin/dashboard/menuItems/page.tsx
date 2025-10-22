
// "use client";

// import { useEffect, useState, FormEvent, ChangeEvent } from "react";
// import axios from "axios";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
// import { motion } from "framer-motion";
// import Image from "next/image";

// // Reusable Components
// import CardGrid from "@/components/DashboardComponents/CardGrid/CardGrid";
// import FormModal from "@/components/DashboardComponents/FormModal/FormModal";
// import DeleteConfirmationModal from "@/components/DashboardComponents/DeleteConfirmationModal/DeleteConfirmationModal";
// import PaginationControls from "@/components/DashboardComponents/PaginationControls/PaginationControls";
// import ImageUpload from "@/components/DashboardComponents/ImageUpload/ImageUpload";

// const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// interface MenuItem {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   category: "sushi" | "sashimi" | "drinks" | "appetizers" | "desserts";
//   image: string;
//   is_available: boolean;
//   created_at: string;
//   updated_at: string;
// }

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// export default function MenuItemsAdmin() {
//   const [items, setItems] = useState<MenuItem[]>([]);
//   const [form, setForm] = useState<{
//     name: string;
//     description: string;
//     price: string;
//     quantity: string;
//     category: string;
//     is_available: boolean;
//     imageFile: File | null;
//   }>({
//     name: "",
//     description: "",
//     price: "",
//     quantity: "",
//     category: "",
//     is_available: true,
//     imageFile: null,
//   });
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const itemsPerPage = 10;

//   // optional filters
//   const [filterCategory, setFilterCategory] = useState<string>("");
//   const [filterAvailability, setFilterAvailability] = useState<string>("");

//   // Authorization if needed
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

//   const axiosConfigMultipart = {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//       "Content-Type": "multipart/form-data",
//     },
//     timeout: 30000, // 30 second timeout
//   };

//   const fetchItems = async () => {
//     try {
//       const res = await axios.get<ApiResponse<MenuItem[]>>(`${API}/menu`, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//         timeout: 10000,
//       });
//       if (res.data.success) {
//         setItems(res.data.data);
//       } else {
//         console.error("Fetch items error:", res.data.message);
//       }
//     } catch (err) {
//       console.error("Error fetching menu items:", err);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const openAddModal = () => {
//     resetForm();
//     setShowModal(true);
//   };

//   const openEditModal = (item: MenuItem) => {
//     setForm({
//       name: item.name,
//       description: item.description,
//       price: item.price.toString(),
//       quantity: item.quantity.toString(),
//       category: item.category,
//       is_available: item.is_available,
//       imageFile: null,
//     });
//     setPreviewImage(item.image);
//     setEditId(item._id);
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       description: "",
//       price: "",
//       quantity: "",
//       category: "",
//       is_available: true,
//       imageFile: null,
//     });
//     setPreviewImage(null);
//     setEditId(null);
//     setError("");
//     setLoading(false);
//   };

//   const handleFormChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setForm((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleImageChange = (file: File) => {
//     setForm((prev) => ({ ...prev, imageFile: file }));
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // Validation
//     if (
//       !form.name.trim() ||
//       !form.description.trim() ||
//       !form.price ||
//       !form.quantity ||
//       !form.category
//     ) {
//       setError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }

//     const priceNum = parseFloat(form.price);
//     const quantityNum = Number(form.quantity);

//     if (isNaN(priceNum) || priceNum < 0) {
//       setError("Price must be a non-negative number.");
//       setLoading(false);
//       return;
//     }

//     if (
//       isNaN(quantityNum) ||
//       quantityNum < 0 ||
//       !Number.isInteger(quantityNum)
//     ) {
//       setError("Quantity must be a non-negative integer.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const fd = new FormData();
//       fd.append("name", form.name);
//       fd.append("description", form.description);
//       fd.append("price", priceNum.toString());
//       fd.append("quantity", quantityNum.toString());
//       fd.append("category", form.category);
//       fd.append("is_available", form.is_available.toString());

//       if (form.imageFile) {
//         fd.append("image", form.imageFile);
//       }

//       if (editId) {
//         // Update - FIXED: Using correct endpoint
//         const res = await axios.put<ApiResponse<MenuItem>>(
//           `${API}/menu/${editId}`,
//           fd,
//           axiosConfigMultipart
//         );
//         if (res.data.success) {
//           await fetchItems();
//           setShowModal(false);
//           resetForm();
//         } else {
//           setError(res.data.message || "Update failed");
//         }
//       } else {
//         // Create
//         const res = await axios.post<ApiResponse<MenuItem>>(
//           `${API}/menu`,
//           fd,
//           axiosConfigMultipart
//         );
//         if (res.data.success) {
//           await fetchItems();
//           setShowModal(false);
//           resetForm();
//         } else {
//           setError(res.data.message || "Creation failed");
//         }
//       }
//     } catch (err: any) {
//       console.error("Submit error:", err.response?.data || err.message);
//       if (err.code === "ECONNABORTED" || err.name === "TimeoutError") {
//         setError("Request timed out. Please try again.");
//       } else {
//         setError(err.response?.data?.message || "Server error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     try {
//       // FIXED: Using correct endpoint - consistent with your API calls
//       const res = await axios.delete<ApiResponse<null>>(
//         `${API}/menu/${deleteId}`,
//         {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//           timeout: 10000,
//         }
//       );
//       if (res.data.success) {
//         await fetchItems();
//       } else {
//         console.error("Delete failed:", res.data.message);
//         setError("Delete failed: " + (res.data.message || "Unknown error"));
//       }
//     } catch (err: any) {
//       console.error("Delete error:", err);
//       if (err.code === "ECONNABORTED" || err.name === "TimeoutError") {
//         setError("Delete request timed out. Please try again.");
//       } else {
//         setError(
//           "Delete error: " + (err.response?.data?.message || "Server error")
//         );
//       }
//     } finally {
//       setShowDeleteModal(false);
//       setDeleteId(null);
//     }
//   };

//   // Filtering & pagination
//   const filteredItems = items.filter((item) => {
//     let ok = true;
//     if (filterCategory) {
//       ok = ok && item.category === filterCategory;
//     }
//     if (filterAvailability) {
//       ok = ok && item.is_available.toString() === filterAvailability;
//     }
//     return ok;
//   });

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const start = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredItems.slice(start, start + itemsPerPage);

//   const categoryOptions = [
//     "sushi",
//     "sashimi",
//     "drinks",
//     "appetizers",
//     "desserts",
//   ];

//   // Custom image loader to handle Cloudinary images better
//   const cloudinaryLoader = ({
//     src,
//     width,
//     quality,
//   }: {
//     src: string;
//     width: number;
//     quality?: number;
//   }) => {
//     const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || 75}`];
//     return `https://res.cloudinary.com/dzjwfsjek/image/upload/${params.join(
//       ","
//     )}${src.replace("https://res.cloudinary.com/dzjwfsjek/image/upload", "")}`;
//   };

//   return (
//     <div className="p-6 bg-[#FFEBEE] min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
//           <h3 className="text-2xl font-semibold">
//             <span className="text-[#EF5350]">Menu</span>{" "}
//             <span className="text-gray-700">Items</span>
//           </h3>

//           <div className="flex space-x-4">
//             <select
//               name="filterCategory"
//               value={filterCategory}
//               onChange={(e) => {
//                 setFilterCategory(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="px-3 py-2 border border-[#EF5350] rounded-md focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent"
//             >
//               <option value="">All Categories</option>
//               {categoryOptions.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                 </option>
//               ))}
//             </select>
//             <select
//               name="filterAvailability"
//               value={filterAvailability}
//               onChange={(e) => {
//                 setFilterAvailability(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="px-3 py-2 border border-[#EF5350] rounded-md focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent"
//             >
//               <option value="">All</option>
//               <option value="true">Available</option>
//               <option value="false">Not Available</option>
//             </select>
//           </div>

//           <button
//             onClick={openAddModal}
//             className="flex items-center gap-2 bg-[#EF5350] hover:bg-[#E57373] text-white px-5 py-2 rounded-xl shadow-lg transition-colors"
//           >
//             <FiPlus /> Add Item
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//             <button
//               onClick={() => setError("")}
//               className="float-right font-bold"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         <CardGrid
//           items={currentItems}
//           renderItem={(item: MenuItem) => (
//             <motion.div
//               key={item._id}
//               className="relative bg-white rounded-2xl shadow-md p-6 pt-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 border border-[#EF5350]/40"
//               whileHover={{ scale: 1.02 }}
//             >
//               <div className="absolute top-4 right-4 flex gap-2 z-10">
//                 <FiEdit
//                   className="text-[#EF5350] cursor-pointer hover:text-[#E57373] transition-colors"
//                   onClick={() => openEditModal(item)}
//                 />
//                 <FiTrash2
//                   className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
//                   onClick={() => {
//                     setDeleteId(item._id);
//                     setShowDeleteModal(true);
//                   }}
//                 />
//               </div>

//               <div className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden border-4 border-[#EF5350] mb-4">
//                 {item.image ? (
//                   // Use regular img tag instead of Next.js Image for Cloudinary URLs
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement;
//                       target.style.display = "none";
//                       const fallback = target.nextElementSibling as HTMLElement;
//                       if (fallback) {
//                         fallback.classList.remove("hidden");
//                       }
//                     }}
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                     <span>No Image</span>
//                   </div>
//                 )}
//                 {/* Fallback div */}
//                 <div className=" absolute inset-0 bg-gray-200 flex items-center justify-center">
//                   <span>Image failed to load</span>
//                 </div>
//               </div>

//               <h4 className="text-lg font-semibold text-gray-800">
//                 {item.name}
//               </h4>
//               <p className="text-sm text-gray-600 mt-1 capitalize">
//                 {item.category}
//               </p>
//               <p className="text-sm text-[#EF5350] font-semibold">₨ {item.price.toFixed(2)}</p>
//               <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//               <p
//                 className={`text-sm mt-1 ${
//                   item.is_available ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {item.is_available ? "Available" : "Not Available"}
//               </p>
//             </motion.div>
//           )}
//           emptyMessage="No menu items found."
//           gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//         />

//         <PaginationControls
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* Modal for Add / Edit */}
//       <FormModal
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           resetForm();
//         }}
//         title={editId ? "Edit Menu Item" : "Add Menu Item"}
//         onSubmit={handleSubmit}
//         isLoading={loading}
//         error={error}
//         isEdit={!!editId}
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="font-medium">Name*</label>
//             <input
//               name="name"
//               type="text"
//               placeholder="Name"
//               value={form.name}
//               onChange={handleFormChange}
//               required
//               className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
//             />
//           </div>

//           <div>
//             <label className="font-medium">Description*</label>
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={form.description}
//               onChange={handleFormChange}
//               required
//               rows={3}
//               className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="font-medium">Price (Rs.)*</label>
//               <input
//                 name="price"
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 placeholder="0.00"
//                 value={form.price}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
//               />
//             </div>

//             <div>
//               <label className="font-medium">Quantity*</label>
//               <input
//                 name="quantity"
//                 type="number"
//                 min="0"
//                 step="1"
//                 placeholder="0"
//                 value={form.quantity}
//                 onChange={handleFormChange}
//                 required
//                 className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="font-medium">Category*</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleFormChange}
//               required
//               className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
//             >
//               <option value="">Select Category</option>
//               {categoryOptions.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center space-x-2">
//             <input
//               name="is_available"
//               type="checkbox"
//               checked={form.is_available}
//               onChange={handleFormChange}
//               className="w-4 h-4 text-[#EF5350] bg-gray-100 border-gray-300 rounded focus:ring-[#EF9A9A]"
//             />
//             <label className="font-medium">Is Available</label>
//           </div>

//           <div>
//             <ImageUpload
//               previewImage={previewImage}
//               onImageChange={handleImageChange}
//               onImageRemove={() => {
//                 setForm((prev) => ({ ...prev, imageFile: null }));
//                 setPreviewImage(null);
//               }}
//               label="Menu Item Image"
//               aspectRatio="aspect-square"
//               className="h-[300px]"
//             />
//           </div>
//         </div>
//       </FormModal>

//       {/* Delete Confirmation */}
//       <DeleteConfirmationModal
//         isOpen={showDeleteModal}
//         onConfirm={handleDelete}
//         onCancel={() => {
//           setShowDeleteModal(false);
//           setDeleteId(null);
//         }}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this menu item? This action cannot be undone."
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

// Reusable Components
import CardGrid from "@/components/DashboardComponents/CardGrid/CardGrid";
import FormModal from "@/components/DashboardComponents/FormModal/FormModal";
import DeleteConfirmationModal from "@/components/DashboardComponents/DeleteConfirmationModal/DeleteConfirmationModal";
import PaginationControls from "@/components/DashboardComponents/PaginationControls/PaginationControls";
import ImageUpload from "@/components/DashboardComponents/ImageUpload/ImageUpload";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: "sushi" | "sashimi" | "drinks" | "appetizers" | "desserts";
  image: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function MenuItemsAdmin() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<{
    name: string;
    description: string;
    price: string;
    quantity: string;
    category: string;
    is_available: boolean;
    imageFile: File | null;
  }>({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    is_available: true,
    imageFile: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // optional filters
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterAvailability, setFilterAvailability] = useState<string>("");

  // Authorization if needed
  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const axiosConfigMultipart = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "multipart/form-data",
    },
    timeout: 30000, // 30 second timeout
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get<ApiResponse<MenuItem[]>>(`${API}/menu`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        timeout: 10000,
      });
      if (res.data.success) {
        setItems(res.data.data);
      } else {
        console.error("Fetch items error:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item: MenuItem) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      quantity: item.quantity.toString(),
      category: item.category,
      is_available: item.is_available,
      imageFile: null,
    });
    setPreviewImage(item.image);
    setEditId(item._id);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      is_available: true,
      imageFile: null,
    });
    setPreviewImage(null);
    setEditId(null);
    setError("");
    setLoading(false);
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Fixed: Type guard for checkbox inputs
    if (type === "checkbox") {
      const inputElement = e.target as HTMLInputElement;
      setForm((prev) => ({ ...prev, [name]: inputElement.checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (file: File) => {
    setForm((prev) => ({ ...prev, imageFile: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.price ||
      !form.quantity ||
      !form.category
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const priceNum = parseFloat(form.price);
    const quantityNum = Number(form.quantity);

    if (isNaN(priceNum) || priceNum < 0) {
      setError("Price must be a non-negative number.");
      setLoading(false);
      return;
    }

    if (
      isNaN(quantityNum) ||
      quantityNum < 0 ||
      !Number.isInteger(quantityNum)
    ) {
      setError("Quantity must be a non-negative integer.");
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("price", priceNum.toString());
      fd.append("quantity", quantityNum.toString());
      fd.append("category", form.category);
      fd.append("is_available", form.is_available.toString());

      if (form.imageFile) {
        fd.append("image", form.imageFile);
      }

      if (editId) {
        // Update - FIXED: Using correct endpoint
        const res = await axios.put<ApiResponse<MenuItem>>(
          `${API}/menu/${editId}`,
          fd,
          axiosConfigMultipart
        );
        if (res.data.success) {
          await fetchItems();
          setShowModal(false);
          resetForm();
        } else {
          setError(res.data.message || "Update failed");
        }
      } else {
        // Create
        const res = await axios.post<ApiResponse<MenuItem>>(
          `${API}/menu`,
          fd,
          axiosConfigMultipart
        );
        if (res.data.success) {
          await fetchItems();
          setShowModal(false);
          resetForm();
        } else {
          setError(res.data.message || "Creation failed");
        }
      }
    } catch (err: any) {
      console.error("Submit error:", err.response?.data || err.message);
      if (err.code === "ECONNABORTED" || err.name === "TimeoutError") {
        setError("Request timed out. Please try again.");
      } else {
        setError(err.response?.data?.message || "Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      // FIXED: Using correct endpoint - consistent with your API calls
      const res = await axios.delete<ApiResponse<null>>(
        `${API}/menu/${deleteId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          timeout: 10000,
        }
      );
      if (res.data.success) {
        await fetchItems();
      } else {
        console.error("Delete failed:", res.data.message);
        setError("Delete failed: " + (res.data.message || "Unknown error"));
      }
    } catch (err: any) {
      console.error("Delete error:", err);
      if (err.code === "ECONNABORTED" || err.name === "TimeoutError") {
        setError("Delete request timed out. Please try again.");
      } else {
        setError(
          "Delete error: " + (err.response?.data?.message || "Server error")
        );
      }
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // Filtering & pagination
  const filteredItems = items.filter((item) => {
    let ok = true;
    if (filterCategory) {
      ok = ok && item.category === filterCategory;
    }
    if (filterAvailability) {
      ok = ok && item.is_available.toString() === filterAvailability;
    }
    return ok;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(start, start + itemsPerPage);

  const categoryOptions = [
    "sushi",
    "sashimi",
    "drinks",
    "appetizers",
    "desserts",
  ];

  // Custom image loader to handle Cloudinary images better
  const cloudinaryLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || 75}`];
    return `https://res.cloudinary.com/dzjwfsjek/image/upload/${params.join(
      ","
    )}${src.replace("https://res.cloudinary.com/dzjwfsjek/image/upload", "")}`;
  };

  return (
    <div className="p-6 bg-[#FFEBEE] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl font-semibold">
            <span className="text-[#EF5350]">Menu</span>{" "}
            <span className="text-gray-700">Items</span>
          </h3>

          <div className="flex space-x-4">
            <select
              name="filterCategory"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-[#EF5350] rounded-md focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <select
              name="filterAvailability"
              value={filterAvailability}
              onChange={(e) => {
                setFilterAvailability(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-[#EF5350] rounded-md focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent"
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#EF5350] hover:bg-[#E57373] text-white px-5 py-2 rounded-xl shadow-lg transition-colors"
          >
            <FiPlus /> Add Item
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={() => setError("")}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <CardGrid
          items={currentItems}
          renderItem={(item: MenuItem) => (
            <motion.div
              key={item._id}
              className="relative bg-white rounded-2xl shadow-md p-6 pt-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 border border-[#EF5350]/40"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <FiEdit
                  className="text-[#EF5350] cursor-pointer hover:text-[#E57373] transition-colors"
                  onClick={() => openEditModal(item)}
                />
                <FiTrash2
                  className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
                  onClick={() => {
                    setDeleteId(item._id);
                    setShowDeleteModal(true);
                  }}
                />
              </div>

              <div className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden border-4 border-[#EF5350] mb-4">
                {item.image ? (
                  // Use regular img tag instead of Next.js Image for Cloudinary URLs
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.classList.remove("hidden");
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
                {/* Fallback div */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center ">
                  <span>Image failed to load</span>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h4>
              <p className="text-sm text-gray-600 mt-1 capitalize">
                {item.category}
              </p>
              <p className="text-sm text-[#EF5350] font-semibold">₨ {item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              <p
                className={`text-sm mt-1 ${
                  item.is_available ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.is_available ? "Available" : "Not Available"}
              </p>
            </motion.div>
          )}
          emptyMessage="No menu items found."
          gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal for Add / Edit */}
      <FormModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editId ? "Edit Menu Item" : "Add Menu Item"}
        onSubmit={handleSubmit}
        isLoading={loading}
        error={error}
        isEdit={!!editId}
      >
        <div className="space-y-4">
          <div>
            <label className="font-medium">Name*</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
            />
          </div>

          <div>
            <label className="font-medium">Description*</label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleFormChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Price (Rs.)*</label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form.price}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
              />
            </div>

            <div>
              <label className="font-medium">Quantity*</label>
              <input
                name="quantity"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={form.quantity}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Category*</label>
            <select
              name="category"
              value={form.category}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
            >
              <option value="">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              name="is_available"
              type="checkbox"
              checked={form.is_available}
              onChange={handleFormChange}
              className="w-4 h-4 text-[#EF5350] bg-gray-100 border-gray-300 rounded focus:ring-[#EF9A9A]"
            />
            <label className="font-medium">Is Available</label>
          </div>

          <div>
            <ImageUpload
              previewImage={previewImage}
              onImageChange={handleImageChange}
              onImageRemove={() => {
                setForm((prev) => ({ ...prev, imageFile: null }));
                setPreviewImage(null);
              }}
              label="Menu Item Image"
              aspectRatio="aspect-square"
              className="h-[300px]"
            />
          </div>
        </div>
      </FormModal>

      {/* Delete Confirmation */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        title="Confirm Delete"
        message="Are you sure you want to delete this menu item? This action cannot be undone."
      />
    </div>
  );
}
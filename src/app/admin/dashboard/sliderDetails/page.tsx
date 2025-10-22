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

// interface Slider {
//   _id: string;
//   name: string;
//   image: string;
//   created_at: string;
//   updated_at: string;
// }

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// export default function SlidersAdmin() {
//   const [sliders, setSliders] = useState<Slider[]>([]);
//   const [form, setForm] = useState<{
//     name: string;
//     imageFile: File | null;
//   }>({
//     name: "",
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

//   const fetchSliders = async () => {
//     try {
//       const res = await axios.get<ApiResponse<Slider[]>>(`${API}/sliders`, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//         timeout: 10000,
//       });
//       if (res.data.success) {
//         setSliders(res.data.data);
//       } else {
//         console.error("Fetch sliders error:", res.data.message);
//       }
//     } catch (err) {
//       console.error("Error fetching sliders:", err);
//     }
//   };

//   useEffect(() => {
//     fetchSliders();
//   }, []);

//   const openAddModal = () => {
//     resetForm();
//     setShowModal(true);
//   };

//   const openEditModal = (slider: Slider) => {
//     setForm({
//       name: slider.name,
//       imageFile: null,
//     });
//     setPreviewImage(slider.image);
//     setEditId(slider._id);
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
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
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
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
//     if (!form.name.trim()) {
//       setError("Please enter a slider name.");
//       setLoading(false);
//       return;
//     }

//     if (!editId && !form.imageFile) {
//       setError("Please select an image for the slider.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const fd = new FormData();
//       fd.append("name", form.name);

//       if (form.imageFile) {
//         fd.append("image", form.imageFile);
//       }

//       if (editId) {
//         // Update slider
//         const res = await axios.put<ApiResponse<Slider>>(
//           `${API}/sliders/${editId}`,
//           fd,
//           axiosConfigMultipart
//         );
//         if (res.data.success) {
//           await fetchSliders();
//           setShowModal(false);
//           resetForm();
//         } else {
//           setError(res.data.message || "Update failed");
//         }
//       } else {
//         // Create slider
//         const res = await axios.post<ApiResponse<Slider>>(
//           `${API}/sliders`,
//           fd,
//           axiosConfigMultipart
//         );
//         if (res.data.success) {
//           await fetchSliders();
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
//       const res = await axios.delete<ApiResponse<null>>(
//         `${API}/sliders/${deleteId}`,
//         {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//           timeout: 10000,
//         }
//       );
//       if (res.data.success) {
//         await fetchSliders();
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

//   // Pagination
//   const totalPages = Math.ceil(sliders.length / itemsPerPage);
//   const start = (currentPage - 1) * itemsPerPage;
//   const currentSliders = sliders.slice(start, start + itemsPerPage);

//   // Format date for display
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
//           <h3 className="text-2xl font-semibold">
//             <span className="text-blue-600">Slider</span>{" "}
//             <span className="text-gray-700">Management</span>
//           </h3>

//           <button
//             onClick={openAddModal}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-lg transition-colors"
//           >
//             <FiPlus /> Add Slider
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
//           items={currentSliders}
//           renderItem={(slider: Slider) => (
//             <motion.div
//               key={slider._id}
//               className="relative bg-white rounded-2xl shadow-md p-6 pt-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200"
//               whileHover={{ scale: 1.02 }}
//             >
//               <div className="absolute top-4 right-4 flex gap-2 z-10">
//                 <FiEdit
//                   className="text-blue-600 cursor-pointer hover:text-blue-800"
//                   onClick={() => openEditModal(slider)}
//                 />
//                 <FiTrash2
//                   className="text-red-600 cursor-pointer hover:text-red-800"
//                   onClick={() => {
//                     setDeleteId(slider._id);
//                     setShowDeleteModal(true);
//                   }}
//                 />
//               </div>

//               <div className="relative w-full h-[200px] rounded-2xl overflow-hidden border-4 border-blue-500 mb-4">
//                 {slider.image ? (
//                   <img
//                     src={slider.image}
//                     alt={slider.name}
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
//                 <div className="hidden absolute inset-0 bg-gray-200 flex items-center justify-center">
//                   <span>Image failed to load</span>
//                 </div>
//               </div>

//               <h4 className="text-lg font-semibold text-gray-800 mb-2">
//                 {slider.name}
//               </h4>
              
//               <div className="text-xs text-gray-500 space-y-1 mt-auto">
//                 <p>Created: {formatDate(slider.created_at)}</p>
//                 <p>Updated: {formatDate(slider.updated_at)}</p>
//               </div>
//             </motion.div>
//           )}
//           emptyMessage="No sliders found. Add your first slider to get started!"
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
//         title={editId ? "Edit Slider" : "Add Slider"}
//         onSubmit={handleSubmit}
//         isLoading={loading}
//         error={error}
//         isEdit={!!editId}
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="font-medium">Slider Name*</label>
//             <input
//               name="name"
//               type="text"
//               placeholder="Enter slider name"
//               value={form.name}
//               onChange={handleFormChange}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <ImageUpload
//               previewImage={previewImage}
//               onImageChange={handleImageChange}
//               onImageRemove={() => {
//                 setForm((prev) => ({ ...prev, imageFile: null }));
//                 setPreviewImage(null);
//               }}
//               label="Slider Image"
//               aspectRatio="aspect-video"
//               className="h-[250px]"
//               required={!editId} // Required only for new sliders
//             />
//             {editId && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Leave empty to keep current image
//               </p>
//             )}
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
//         message="Are you sure you want to delete this slider? This action cannot be undone."
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

interface Slider {
  _id: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function SlidersAdmin() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [form, setForm] = useState<{
    name: string;
    imageFile: File | null;
  }>({
    name: "",
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

  const fetchSliders = async () => {
    try {
      const res = await axios.get<ApiResponse<Slider[]>>(`${API}/sliders`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        timeout: 10000,
      });
      if (res.data.success) {
        setSliders(res.data.data);
      } else {
        console.error("Fetch sliders error:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching sliders:", err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (slider: Slider) => {
    setForm({
      name: slider.name,
      imageFile: null,
    });
    setPreviewImage(slider.image);
    setEditId(slider._id);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    if (!form.name.trim()) {
      setError("Please enter a slider name.");
      setLoading(false);
      return;
    }

    if (!editId && !form.imageFile) {
      setError("Please select an image for the slider.");
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", form.name);

      if (form.imageFile) {
        fd.append("image", form.imageFile);
      }

      if (editId) {
        // Update slider
        const res = await axios.put<ApiResponse<Slider>>(
          `${API}/sliders/${editId}`,
          fd,
          axiosConfigMultipart
        );
        if (res.data.success) {
          await fetchSliders();
          setShowModal(false);
          resetForm();
        } else {
          setError(res.data.message || "Update failed");
        }
      } else {
        // Create slider
        const res = await axios.post<ApiResponse<Slider>>(
          `${API}/sliders`,
          fd,
          axiosConfigMultipart
        );
        if (res.data.success) {
          await fetchSliders();
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
      const res = await axios.delete<ApiResponse<null>>(
        `${API}/sliders/${deleteId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          timeout: 10000,
        }
      );
      if (res.data.success) {
        await fetchSliders();
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

  // Pagination
  const totalPages = Math.ceil(sliders.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentSliders = sliders.slice(start, start + itemsPerPage);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 bg-[#FFEBEE] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl font-semibold">
            <span className="text-[#EF5350]">Slider</span>{" "}
            <span className="text-gray-700">Management</span>
          </h3>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#EF5350] hover:bg-[#E57373] text-white px-5 py-2 rounded-xl shadow-lg transition-colors"
          >
            <FiPlus /> Add Slider
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
          items={currentSliders}
          renderItem={(slider: Slider) => (
            <motion.div
              key={slider._id}
              className="relative bg-white rounded-2xl shadow-md p-6 pt-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 border border-[#EF5350]/40"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <FiEdit
                  className="text-[#EF5350] cursor-pointer hover:text-[#E57373] transition-colors"
                  onClick={() => openEditModal(slider)}
                />
                <FiTrash2
                  className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
                  onClick={() => {
                    setDeleteId(slider._id);
                    setShowDeleteModal(true);
                  }}
                />
              </div>

              <div className="relative w-full h-[200px] rounded-2xl overflow-hidden border-4 border-[#EF5350] mb-4">
                {slider.image ? (
                  <img
                    src={slider.image}
                    alt={slider.name}
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
                <div className="hidden absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span>Image failed to load</span>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {slider.name}
              </h4>
              
              <div className="text-xs text-gray-500 space-y-1 mt-auto">
                <p>Created: {formatDate(slider.created_at)}</p>
                <p>Updated: {formatDate(slider.updated_at)}</p>
              </div>
            </motion.div>
          )}
          emptyMessage="No sliders found. Add your first slider to get started!"
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
        title={editId ? "Edit Slider" : "Add Slider"}
        onSubmit={handleSubmit}
        isLoading={loading}
        error={error}
        isEdit={!!editId}
      >
        <div className="space-y-4">
          <div>
            <label className="font-medium">Slider Name*</label>
            <input
              name="name"
              type="text"
              placeholder="Enter slider name"
              value={form.name}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-[#EF5350] rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF9A9A]"
            />
          </div>

          <div>
            <ImageUpload
              previewImage={previewImage}
              onImageChange={handleImageChange}
              onImageRemove={() => {
                setForm((prev) => ({ ...prev, imageFile: null }));
                setPreviewImage(null);
              }}
              label="Slider Image"
              aspectRatio="aspect-video"
              className="h-[250px]"
              required={!editId} // Required only for new sliders
            />
            {editId && (
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to keep current image
              </p>
            )}
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
        message="Are you sure you want to delete this slider? This action cannot be undone."
      />
    </div>
  );
}
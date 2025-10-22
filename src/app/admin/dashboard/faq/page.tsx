// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FiEdit, FiSave, FiX, FiTrash2, FiPlus } from "react-icons/fi";

// const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// interface FAQ {
//   id: string;
//   question: string;
//   answer: string;
//   order: number;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function FAQManagement() {
//   const [faqs, setFaqs] = useState<FAQ[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [newFAQ, setNewFAQ] = useState({
//     question: "",
//     answer: "",
//   });
//   const [editData, setEditData] = useState<Partial<FAQ>>({});

//   const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

//   const fetchFAQs = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await axios.get(`${API}/faq/faqs`);
//       if (res.data.success) {
//         setFaqs(res.data.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching FAQs:", err);
//       setError("Failed to load FAQs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createFAQ = async () => {
//     try {
//       setSaving(true);
//       setError("");
//       const res = await axios.post(
//         `${API}/faq/faqs`,
//         newFAQ,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
      
//       if (res.data.success) {
//         setIsAdding(false);
//         setNewFAQ({ question: "", answer: "" });
//         fetchFAQs();
//       }
//     } catch (err: any) {
//       console.error("Error creating FAQ:", err);
//       setError(err.response?.data?.message || "Failed to create FAQ");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const updateFAQ = async (id: string) => {
//     try {
//       setSaving(true);
//       setError("");
//       const res = await axios.put(
//         `${API}/faq/faqs/${id}`,
//         editData,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
      
//       if (res.data.success) {
//         setEditingId(null);
//         setEditData({});
//         fetchFAQs();
//       }
//     } catch (err: any) {
//       console.error("Error updating FAQ:", err);
//       setError(err.response?.data?.message || "Failed to update FAQ");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const deleteFAQ = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this FAQ?")) return;
    
//     try {
//       await axios.delete(`${API}/faq/faqs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchFAQs();
//     } catch (err: any) {
//       console.error("Error deleting FAQ:", err);
//       setError(err.response?.data?.message || "Failed to delete FAQ");
//     }
//   };

//   const startEdit = (faq: FAQ) => {
//     setEditingId(faq.id);
//     setEditData({ ...faq });
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditData({});
//   };

//   const cancelAdd = () => {
//     setIsAdding(false);
//     setNewFAQ({ question: "", answer: "" });
//   };

//   useEffect(() => {
//     fetchFAQs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="space-y-3">
//             <div className="h-4 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//             <div className="h-4 bg-gray-200 rounded w-4/6"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           FAQ Management
//         </h2>
        
//         <button
//           onClick={() => setIsAdding(true)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           <FiPlus size={16} />
//           Add FAQ
//         </button>
//       </div>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {/* Add FAQ Form */}
//       {isAdding && (
//         <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
//           <h3 className="text-lg font-semibold mb-3">Add New FAQ</h3>
//           <div className="space-y-3">
//             <input
//               type="text"
//               placeholder="Question"
//               value={newFAQ.question}
//               onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <textarea
//               placeholder="Answer"
//               value={newFAQ.answer}
//               onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
//             />
//             <div className="flex gap-4">
//               <button
//                 onClick={createFAQ}
//                 disabled={saving}
//                 className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
//               >
//                 <FiSave size={16} />
//                 {saving ? "Saving..." : "Save"}
//               </button>
//               <button
//                 onClick={cancelAdd}
//                 className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
//               >
//                 <FiX size={16} />
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* FAQs List */}
//       <div className="space-y-4">
//         {faqs.length === 0 ? (
//           <p className="text-gray-500 italic text-center py-8">No FAQs found.</p>
//         ) : (
//           faqs.map((faq) => (
//             <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
//               {editingId === faq.id ? (
//                 <div className="space-y-3">
//                   <input
//                     type="text"
//                     value={editData.question || ""}
//                     onChange={(e) => setEditData({ ...editData, question: e.target.value })}
//                     className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
//                   />
//                   <textarea
//                     value={editData.answer || ""}
//                     onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
//                     className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => updateFAQ(faq.id)}
//                       disabled={saving}
//                       className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded text-sm"
//                     >
//                       <FiSave size={14} />
//                       Save
//                     </button>
//                     <button
//                       onClick={cancelEdit}
//                       className="flex items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       <FiX size={14} />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-semibold text-gray-800 flex-1">{faq.question}</h3>
//                     <div className="flex gap-2 ml-4">
//                       <button
//                         onClick={() => startEdit(faq)}
//                         className="text-blue-600 hover:text-blue-800"
//                         title="Edit"
//                       >
//                         <FiEdit size={16} />
//                       </button>
//                       <button
//                         onClick={() => deleteFAQ(faq.id)}
//                         className="text-red-600 hover:text-red-800"
//                         title="Delete"
//                       >
//                         <FiTrash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mb-2">{faq.answer}</p>
//                 </>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       <div className="mt-4 text-sm text-gray-600">
//         <p>Total FAQs: {faqs.length}</p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiSave, FiX, FiTrash2, FiPlus } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
  });
  const [editData, setEditData] = useState<Partial<FAQ>>({});

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API}/faq/faqs`);
      if (res.data.success) {
        setFaqs(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      setError("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const createFAQ = async () => {
    try {
      setSaving(true);
      setError("");
      const res = await axios.post(
        `${API}/faq/faqs`,
        newFAQ,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (res.data.success) {
        setIsAdding(false);
        setNewFAQ({ question: "", answer: "" });
        fetchFAQs();
      }
    } catch (err: any) {
      console.error("Error creating FAQ:", err);
      setError(err.response?.data?.message || "Failed to create FAQ");
    } finally {
      setSaving(false);
    }
  };

  const updateFAQ = async (id: string) => {
    try {
      setSaving(true);
      setError("");
      const res = await axios.put(
        `${API}/faq/faqs/${id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (res.data.success) {
        setEditingId(null);
        setEditData({});
        fetchFAQs();
      }
    } catch (err: any) {
      console.error("Error updating FAQ:", err);
      setError(err.response?.data?.message || "Failed to update FAQ");
    } finally {
      setSaving(false);
    }
  };

  const deleteFAQ = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    
    try {
      await axios.delete(`${API}/faq/faqs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFAQs();
    } catch (err: any) {
      console.error("Error deleting FAQ:", err);
      setError(err.response?.data?.message || "Failed to delete FAQ");
    }
  };

  const startEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setEditData({ ...faq });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setNewFAQ({ question: "", answer: "" });
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-[#FFEBEE] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFEBEE] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-[#EF5350]/40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              <span className="text-[#EF5350]">FAQ</span> Management
            </h2>
            
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-[#EF5350] text-white px-4 py-2 rounded-lg hover:bg-[#E57373] transition-colors"
            >
              <FiPlus size={16} />
              Add FAQ
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Add FAQ Form */}
          {isAdding && (
            <div className="mb-6 p-4 border border-[#EF5350]/40 rounded-lg bg-[#FFEBEE]">
              <h3 className="text-lg font-semibold mb-3 text-[#EF5350]">Add New FAQ</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Question"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                  className="w-full p-2 border border-[#EF5350] rounded focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent"
                />
                <textarea
                  placeholder="Answer"
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                  className="w-full p-2 border border-[#EF5350] rounded focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent h-20"
                />
                <div className="flex gap-4">
                  <button
                    onClick={createFAQ}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#EF5350] text-white px-4 py-2 rounded hover:bg-[#E57373] transition-colors disabled:opacity-50"
                  >
                    <FiSave size={16} />
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={cancelAdd}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    <FiX size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FAQs List */}
          <div className="space-y-4">
            {faqs.length === 0 ? (
              <div className="text-center py-8 bg-[#FFEBEE] rounded-lg border border-[#EF5350]/40">
                <p className="text-gray-500 italic">No FAQs found.</p>
              </div>
            ) : (
              faqs.map((faq) => (
                <div key={faq.id} className="border border-[#EF5350]/40 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  {editingId === faq.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editData.question || ""}
                        onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                        className="w-full p-2 border border-[#EF5350] rounded focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent font-semibold"
                      />
                      <textarea
                        value={editData.answer || ""}
                        onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                        className="w-full p-2 border border-[#EF5350] rounded focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent h-20"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateFAQ(faq.id)}
                          disabled={saving}
                          className="flex items-center gap-2 bg-[#EF5350] text-white px-3 py-1 rounded text-sm hover:bg-[#E57373] transition-colors"
                        >
                          <FiSave size={14} />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-2 bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                        >
                          <FiX size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 flex-1">{faq.question}</h3>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => startEdit(faq)}
                            className="text-[#EF5350] hover:text-[#E57373] transition-colors"
                            title="Edit"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteFAQ(faq.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{faq.answer}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Order: {faq.order}</span>
                        <span>Last updated: {new Date(faq.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600 bg-[#FFEBEE] p-3 rounded-lg border border-[#EF5350]/40">
            <p>Total FAQs: <span className="font-semibold text-[#EF5350]">{faqs.length}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
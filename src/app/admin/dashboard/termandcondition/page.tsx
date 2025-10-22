// // components/DashboardComponents/TermsAndConditionsManagement.jsx
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FiEdit, FiSave, FiX } from "react-icons/fi";

// const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// export default function TermsAndConditionsManagement() {
//   const [terms, setTerms] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

//   const fetchTerms = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       // FIXED: Correct endpoint path
//       const res = await axios.get(`${API}/termsandconditions/terms`);
//       if (res.data.success) {
//         setTerms(res.data.data.description || "");
//       }
//     } catch (err) {
//       console.error("Error fetching terms:", err);
//       setError("Failed to load terms and conditions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveTerms = async () => {
//     try {
//       setSaving(true);
//       setError("");
//       // FIXED: Correct endpoint path
//       const res = await axios.post(
//         `${API}/termsandconditions/terms`,
//         { description: terms },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       if (res.data.success) {
//         setIsEditing(false);
//         fetchTerms(); // Refresh to get latest
//       }
//     } catch (err) {
//       console.error("Error saving terms:", err);
//       setError(err.response?.data?.message || "Failed to save terms and conditions");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const cancelEdit = () => {
//     setIsEditing(false);
//     fetchTerms(); // Reset to original content
//   };

//   useEffect(() => {
//     fetchTerms();
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
//           Terms and Conditions
//         </h2>

//         {!isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <FiEdit size={16} />
//             Edit Terms
//           </button>
//         ) : (
//           <div className="flex gap-2">
//             <button
//               onClick={cancelEdit}
//               className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               <FiX size={16} />
//               Cancel
//             </button>
//             <button
//               onClick={saveTerms}
//               disabled={saving}
//               className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
//             >
//               <FiSave size={16} />
//               {saving ? "Saving..." : "Save"}
//             </button>
//           </div>
//         )}
//       </div>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {isEditing ? (
//         <textarea
//           value={terms}
//           onChange={(e) => setTerms(e.target.value)}
//           className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="Enter terms and conditions content..."
//         />
//       ) : (
//         <div className="prose max-w-none p-4 border border-gray-200 rounded-lg bg-gray-50">
//           {terms ? (
//             <div className="whitespace-pre-line">{terms}</div>
//           ) : (
//             <p className="text-gray-500 italic">No terms and conditions set yet.</p>
//           )}
//         </div>
//       )}

//       <div className="mt-4 text-sm text-gray-600">
//         <p>Character count: {terms.length}</p>
//         <p>Last updated: {terms ? new Date().toLocaleDateString() : 'Never'}</p>
//       </div>
//     </div>
//   );
// }
// components/DashboardComponents/TermsAndConditionsManagement.jsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiSave, FiX } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function TermsAndConditionsManagement() {
  const [terms, setTerms] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const fetchTerms = async () => {
    try {
      setLoading(true);
      setError("");
      // FIXED: Correct endpoint path
      const res = await axios.get(`${API}/termsandconditions/terms`);
      if (res.data.success) {
        setTerms(res.data.data.description || "");
      }
    } catch (err) {
      console.error("Error fetching terms:", err);
      setError("Failed to load terms and conditions");
    } finally {
      setLoading(false);
    }
  };

  const saveTerms = async () => {
    try {
      setSaving(true);
      setError("");
      // FIXED: Correct endpoint path
      const res = await axios.post(
        `${API}/termsandconditions/terms`,
        { description: terms },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setIsEditing(false);
        fetchTerms(); // Refresh to get latest
      }
    } catch (err) {
      console.error("Error saving terms:", err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to save terms and conditions"
        );
      } else {
        setError("Failed to save terms and conditions");
      }
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    fetchTerms(); // Reset to original content
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-[#FFEBEE] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading terms and conditions...</p>
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
              <span className="text-[#EF5350]">Terms and</span> Conditions
            </h2>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-[#EF5350] text-white px-4 py-2 rounded-lg hover:bg-[#E57373] transition-colors"
              >
                <FiEdit size={16} />
                Edit Terms
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FiX size={16} />
                  Cancel
                </button>
                <button
                  onClick={saveTerms}
                  disabled={saving}
                  className="flex items-center gap-2 bg-[#EF5350] text-white px-4 py-2 rounded-lg hover:bg-[#E57373] transition-colors disabled:opacity-50"
                >
                  <FiSave size={16} />
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {isEditing ? (
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full h-96 p-4 border border-[#EF5350] rounded-lg focus:ring-2 focus:ring-[#EF9A9A] focus:border-transparent"
              placeholder="Enter terms and conditions content..."
            />
          ) : (
            <div className="prose max-w-none p-4 border border-[#EF5350]/40 rounded-lg bg-[#FFEBEE]">
              {terms ? (
                <div className="whitespace-pre-line">{terms}</div>
              ) : (
                <p className="text-gray-500 italic">
                  No terms and conditions set yet.
                </p>
              )}
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600 bg-[#FFEBEE] p-3 rounded-lg border border-[#EF5350]/40">
            <p>
              Character count:{" "}
              <span className="font-semibold text-[#EF5350]">
                {terms.length}
              </span>
            </p>
            <p>
              Last updated: {terms ? new Date().toLocaleDateString() : "Never"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

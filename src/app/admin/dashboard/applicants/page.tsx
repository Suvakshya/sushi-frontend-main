// "use client";

// import { useState, useEffect } from 'react';
// import { FiEye, FiTrash2, FiMail, FiPhone, FiMapPin, FiUser, FiArrowLeft } from 'react-icons/fi';
// import Link from 'next/link';

// interface Applicant {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   position: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// export default function ApplicantsListPage() {
//   const [applicants, setApplicants] = useState<Applicant[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const fetchApplicants = async () => {
//     try {
//       const API = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const response = await fetch(`${API}/applicants/applications`);
//       const result: ApiResponse<Applicant[]> = await response.json();
      
//       if (result.success) {
//         setApplicants(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching applicants:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteApplicant = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this application?')) return;

//     try {
//       const API = process.env.NEXT_PUBLIC_API_BASE_URL;
//       const response = await fetch(`${API}/applicants/${id}`, {
//         method: 'DELETE'
//       });

//       const result: ApiResponse<null> = await response.json();

//       if (result.success) {
//         setApplicants(applicants.filter(app => app._id !== id));
//         if (selectedApplicant?._id === id) {
//           setShowModal(false);
//         }
//       }
//     } catch (error) {
//       console.error('Error deleting applicant:', error);
//     }
//   };

//   const viewApplicant = (applicant: Applicant) => {
//     setSelectedApplicant(applicant);
//     setShowModal(true);
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

//   useEffect(() => {
//     fetchApplicants();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div className="flex items-center">
//               <Link
//                 href="/admin"
//                 className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
//               >
//                 <FiArrowLeft className="w-5 h-5 mr-2" />
//                 Back to Dashboard
//               </Link>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
//                 <p className="text-gray-600 mt-1">
//                   Manage and review all job applications submitted through the website
//                 </p>
//               </div>
//             </div>
//             <div className="text-sm text-gray-500">
//               Total: <span className="font-semibold text-green-600">{applicants.length}</span> applications
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-800">Applications List</h2>
//               <button
//                 onClick={fetchApplicants}
//                 className="text-sm text-green-600 hover:text-green-700 font-medium"
//               >
//                 Refresh
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Applicant
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Position
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Applied Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {applicants.map((applicant) => (
//                   <tr key={applicant._id} className="hover:bg-gray-50 transition-colors duration-150">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
//                           <FiUser className="h-5 w-5 text-green-600" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {applicant.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {applicant.email}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 font-medium">{applicant.position}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{applicant.phone}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(applicant.createdAt)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-3">
//                         <button
//                           onClick={() => viewApplicant(applicant)}
//                           className="text-blue-600 hover:text-blue-900 transition-colors duration-200 flex items-center"
//                           title="View Details"
//                         >
//                           <FiEye className="h-4 w-4 mr-1" />
//                           View
//                         </button>
//                         <button
//                           onClick={() => deleteApplicant(applicant._id)}
//                           className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center"
//                           title="Delete Application"
//                         >
//                           <FiTrash2 className="h-4 w-4 mr-1" />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {applicants.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 text-lg mb-2">No applications found</div>
//                 <div className="text-gray-500 text-sm">
//                   Applications will appear here when candidates apply through the website.
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* View Applicant Modal */}
//       {showModal && selectedApplicant && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//             <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold">Application Details</h2>
//                   <p className="text-green-100 mt-1">Submitted on {formatDate(selectedApplicant.createdAt)}</p>
//                 </div>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
            
//             <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
//               {/* Personal Information */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                   <FiUser className="w-5 h-5 text-green-500" />
//                   <div>
//                     <p className="text-sm text-gray-600">Full Name</p>
//                     <p className="font-semibold text-gray-900">{selectedApplicant.name}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                   <FiMail className="w-5 h-5 text-green-500" />
//                   <div>
//                     <p className="text-sm text-gray-600">Email Address</p>
//                     <p className="font-semibold text-gray-900">{selectedApplicant.email}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                   <FiPhone className="w-5 h-5 text-green-500" />
//                   <div>
//                     <p className="text-sm text-gray-600">Phone Number</p>
//                     <p className="font-semibold text-gray-900">{selectedApplicant.phone}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                   <div className="w-5 h-5 flex items-center justify-center">
//                     <span className="text-green-500 text-lg">💼</span>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600">Desired Position</p>
//                     <p className="font-semibold text-gray-900">{selectedApplicant.position}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Address */}
//               <div className="p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <FiMapPin className="w-5 h-5 text-green-500" />
//                   <p className="text-sm font-medium text-gray-700">Address</p>
//                 </div>
//                 <p className="text-gray-900">{selectedApplicant.address}</p>
//               </div>

//               {/* Description */}
//               <div className="p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center space-x-3 mb-3">
//                   <div className="w-5 h-5 flex items-center justify-center">
//                     <span className="text-green-500 text-lg">📝</span>
//                   </div>
//                   <p className="text-sm font-medium text-gray-700">Motivation & Interest</p>
//                 </div>
//                 <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
//                   {selectedApplicant.description}
//                 </p>
//               </div>
//             </div>

//             <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
//               <div className="text-sm text-gray-500">
//                 Application ID: <span className="font-mono">{selectedApplicant._id}</span>
//               </div>
//               <div className="flex space-x-3">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => deleteApplicant(selectedApplicant._id)}
//                   className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
//                 >
//                   <FiTrash2 className="w-4 h-4" />
//                   <span>Delete Application</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from 'react';
import { FiEye, FiTrash2, FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi';

interface Applicant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  position: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function ApplicantsListPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchApplicants = async () => {
    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API}/applicants/applications`);
      const result: ApiResponse<Applicant[]> = await response.json();
      
      if (result.success) {
        setApplicants(result.data);
      }
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplicant = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API}/applicants/${id}`, {
        method: 'DELETE'
      });

      const result: ApiResponse<null> = await response.json();

      if (result.success) {
        setApplicants(applicants.filter(app => app._id !== id));
        if (selectedApplicant?._id === id) {
          setShowModal(false);
        }
      }
    } catch (error) {
      console.error('Error deleting applicant:', error);
    }
  };

  const viewApplicant = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
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

  useEffect(() => {
    fetchApplicants();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFEBEE] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFEBEE]">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Job <span className="text-[#EF5350]">Applications</span>
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and review all job applications submitted through the website
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Total: <span className="font-semibold text-[#EF5350]">{applicants.length}</span> applications
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Applications List</h2>
              <button
                onClick={fetchApplicants}
                className="text-sm text-[#EF5350] hover:text-[#E57373] font-medium"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicants.map((applicant) => (
                  <tr key={applicant._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-[#FFEBEE] rounded-full flex items-center justify-center">
                          <FiUser className="h-5 w-5 text-[#EF5350]" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {applicant.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {applicant.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{applicant.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{applicant.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(applicant.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => viewApplicant(applicant)}
                          className="text-[#EF5350] hover:text-[#E57373] transition-colors duration-200 flex items-center"
                          title="View Details"
                        >
                          <FiEye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => deleteApplicant(applicant._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center"
                          title="Delete Application"
                        >
                          <FiTrash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {applicants.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No applications found</div>
                <div className="text-gray-500 text-sm">
                  Applications will appear here when candidates apply through the website.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Applicant Modal */}
      {showModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#EF5350] to-[#E57373] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Application Details</h2>
                  <p className="text-red-100 mt-1">Submitted on {formatDate(selectedApplicant.createdAt)}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FiUser className="w-5 h-5 text-[#EF5350]" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-900">{selectedApplicant.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FiMail className="w-5 h-5 text-[#EF5350]" />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-semibold text-gray-900">{selectedApplicant.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FiPhone className="w-5 h-5 text-[#EF5350]" />
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-semibold text-gray-900">{selectedApplicant.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-[#EF5350] text-lg">💼</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Desired Position</p>
                    <p className="font-semibold text-gray-900">{selectedApplicant.position}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <FiMapPin className="w-5 h-5 text-[#EF5350]" />
                  <p className="text-sm font-medium text-gray-700">Address</p>
                </div>
                <p className="text-gray-900">{selectedApplicant.address}</p>
              </div>

              {/* Description */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-[#EF5350] text-lg">📝</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Motivation & Interest</p>
                </div>
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                  {selectedApplicant.description}
                </p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Application ID: <span className="font-mono">{selectedApplicant._id}</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => deleteApplicant(selectedApplicant._id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#EF5350] text-white rounded-lg hover:bg-[#E57373] transition-colors duration-200"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete Application</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState, FormEvent } from "react";
// import axios from "axios";
// import type { AxiosError } from "axios";
// import { FiUser, FiLock, FiLogOut, FiEye, FiEyeOff } from "react-icons/fi";

// const API = process.env.NEXT_PUBLIC_API_BASE_URL;

// interface AdminProfile {
//   id: string;
//   username: string;
//   last_login: string;
//   created_at: string;
// }

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// export default function AdminDashboard() {
//   const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  
//   // Password visibility states
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   // Password change form state
//   const [passwordForm, setPasswordForm] = useState({
//     current_password: "",
//     new_password: "",
//     confirm_password: ""
//   });

//   const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  
//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   // Fetch admin profile - Improved error handling
//   const fetchAdminProfile = async () => {
//     try {
//       setLoading(true);
//       setError(""); // Clear previous errors
      
//       if (!token) {
//         setError("No authentication token found");
//         return;
//       }

//       const response = await axios.get<ApiResponse<AdminProfile>>(
//         `${API}/admin/profile`,
//         axiosConfig
//       );
      
//       if (response.data.success) {
//         setAdminProfile(response.data.data);
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       console.error('Profile fetch error:', axiosError.response?.data || axiosError.message);
      
//       // Handle different error response structures
//       const errorData = axiosError.response?.data as any;
//       const errorMessage = errorData?.message || 
//                           errorData?.error || 
//                           axiosError.message || 
//                           "Failed to fetch profile";
      
//       setError(errorMessage);
      
//       // If token is invalid, redirect to login
//       if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
//         localStorage.removeItem("adminToken");
//         window.location.href = "/admin/login";
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Change admin password
//   const handleChangePassword = async (e: FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (passwordForm.new_password !== passwordForm.confirm_password) {
//       setError("New passwords do not match");
//       return;
//     }

//     if (passwordForm.new_password.length < 6) {
//       setError("New password must be at least 6 characters long");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.patch<ApiResponse<null>>(
//         `${API}admin/change-password`,
//         {
//           current_password: passwordForm.current_password,
//           new_password: passwordForm.new_password
//         },
//         axiosConfig
//       );

//       if (response.data.success) {
//         setSuccess("Password changed successfully");
//         setPasswordForm({
//           current_password: "",
//           new_password: "",
//           confirm_password: ""
//         });
//         // Reset visibility states
//         setShowCurrentPassword(false);
//         setShowNewPassword(false);
//         setShowConfirmPassword(false);
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError<{ message: string }>;
//       setError(axiosError.response?.data?.message || "Failed to change password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/admin/login";
//   };

//   useEffect(() => {
//     if (token) {
//       fetchAdminProfile();
//     }
//   }, [token]);

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswordForm(prev => ({ ...prev, [name]: value }));
//   };

//   // Toggle password visibility functions
//   const toggleCurrentPasswordVisibility = () => {
//     setShowCurrentPassword(!showCurrentPassword);
//   };

//   const toggleNewPasswordVisibility = () => {
//     setShowNewPassword(!showNewPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   if (loading && !adminProfile) {
//     return (
//       <div className="min-h-screen bg-[#EAFDF6] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06AB86] mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading admin profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#EAFDF6] p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Admin <span className="text-[#06AB86]">Dashboard</span>
//           </h1>
          
//           {/* <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
//           >
//             <FiLogOut size={18} />
//             Logout
//           </button> */}

          
//         </div>

//         {/* Alert Messages */}
//         {error && (
//           <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//             {success}
//           </div>
//         )}

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-lg shadow mb-6">
//           <div className="flex border-b">
//             <button
//               onClick={() => setActiveTab("profile")}
//               className={`flex items-center gap-2 px-6 py-4 font-medium ${
//                 activeTab === "profile"
//                   ? "text-[#06AB86] border-b-2 border-[#06AB86]"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               <FiUser size={18} />
//               Profile Information
//             </button>
//             <button
//               onClick={() => setActiveTab("password")}
//               className={`flex items-center gap-2 px-6 py-4 font-medium ${
//                 activeTab === "password"
//                   ? "text-[#06AB86] border-b-2 border-[#06AB86]"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               <FiLock size={18} />
//               Change Password
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === "profile" && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
                
//                 {adminProfile ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600">Username</label>
//                         <p className="mt-1 text-lg text-gray-800">{adminProfile.username}</p>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600">Admin ID</label>
//                         <p className="mt-1 text-sm text-gray-600 font-mono">{adminProfile.id}</p>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600">Last Login</label>
//                         <p className="mt-1 text-sm text-gray-600">
//                           {new Date(adminProfile.last_login).toLocaleString()}
//                         </p>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600">Account Created</label>
//                         <p className="mt-1 text-sm text-gray-600">
//                           {new Date(adminProfile.created_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">No profile data available.</p>
//                 )}
//               </div>
//             )}

//             {activeTab === "password" && (
//               <div className="max-w-md">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h2>
                
//                 <form onSubmit={handleChangePassword} className="space-y-4">
//                   <div>
//                     <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
//                       Current Password
//                     </label>
//                     <div className="relative mt-1">
//                       <input
//                         type={showCurrentPassword ? "text" : "password"}
//                         name="current_password"
//                         value={passwordForm.current_password}
//                         onChange={handlePasswordChange}
//                         required
//                         className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#06AB86] focus:border-[#06AB86]"
//                         placeholder="Enter current password"
//                       />
//                       <button
//                         type="button"
//                         onClick={toggleCurrentPasswordVisibility}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                       >
//                         {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
//                       New Password
//                     </label>
//                     <div className="relative mt-1">
//                       <input
//                         type={showNewPassword ? "text" : "password"}
//                         name="new_password"
//                         value={passwordForm.new_password}
//                         onChange={handlePasswordChange}
//                         required
//                         minLength={6}
//                         className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#06AB86] focus:border-[#06AB86]"
//                         placeholder="Enter new password (min. 6 characters)"
//                       />
//                       <button
//                         type="button"
//                         onClick={toggleNewPasswordVisibility}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                       >
//                         {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
//                       Confirm New Password
//                     </label>
//                     <div className="relative mt-1">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirm_password"
//                         value={passwordForm.confirm_password}
//                         onChange={handlePasswordChange}
//                         required
//                         minLength={6}
//                         className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#06AB86] focus:border-[#06AB86]"
//                         placeholder="Confirm new password"
//                       />
//                       <button
//                         type="button"
//                         onClick={toggleConfirmPasswordVisibility}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                       >
//                         {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-[#06AB86] hover:bg-[#04856d] text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
//                   >
//                     {loading ? "Changing Password..." : "Change Password"}
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-800">Welcome Back</h3>
//             <p className="text-2xl font-bold text-[#06AB86] mt-2">
//               {adminProfile?.username || "Admin"}
//             </p>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-800">Last Activity</h3>
//             <p className="text-sm text-gray-600 mt-2">
//               {adminProfile?.last_login 
//                 ? `Last login: ${new Date(adminProfile.last_login).toLocaleString()}`
//                 : "No recent activity"
//               }
//             </p>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold text-gray-800">Account Status</h3>
//             <p className="text-green-600 font-medium mt-2">Active</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { FiUser, FiLock, FiLogOut, FiEye, FiEyeOff } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AdminProfile {
  id: string;
  username: string;
  last_login: string;
  created_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function AdminDashboard() {
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Password change form state
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch admin profile - Improved error handling
  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      setError(""); // Clear previous errors
      
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await axios.get<ApiResponse<AdminProfile>>(
        `${API}/admin/profile`,
        axiosConfig
      );
      
      if (response.data.success) {
        setAdminProfile(response.data.data);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Profile fetch error:', axiosError.response?.data || axiosError.message);
      
      // Handle different error response structures
      const errorData = axiosError.response?.data as any;
      const errorMessage = errorData?.message || 
                          errorData?.error || 
                          axiosError.message || 
                          "Failed to fetch profile";
      
      setError(errorMessage);
      
      // If token is invalid, redirect to login
      if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // Change admin password
  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setError("New passwords do not match");
      return;
    }

    if (passwordForm.new_password.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch<ApiResponse<null>>(
        `${API}admin/change-password`,
        {
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password
        },
        axiosConfig
      );

      if (response.data.success) {
        setSuccess("Password changed successfully");
        setPasswordForm({
          current_password: "",
          new_password: "",
          confirm_password: ""
        });
        // Reset visibility states
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  useEffect(() => {
    if (token) {
      fetchAdminProfile();
    }
  }, [token]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility functions
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (loading && !adminProfile) {
    return (
      <div className="min-h-screen bg-[#FFEBEE] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EF5350] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFEBEE] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin <span className="text-[#EF5350]">Dashboard</span>
          </h1>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#EF5350] hover:bg-[#E57373] text-white px-4 py-2 rounded-lg transition"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-6 py-4 font-medium ${
                activeTab === "profile"
                  ? "text-[#EF5350] border-b-2 border-[#EF5350]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiUser size={18} />
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`flex items-center gap-2 px-6 py-4 font-medium ${
                activeTab === "password"
                  ? "text-[#EF5350] border-b-2 border-[#EF5350]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiLock size={18} />
              Change Password
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
                
                {adminProfile ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Username</label>
                        <p className="mt-1 text-lg text-gray-800">{adminProfile.username}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Admin ID</label>
                        <p className="mt-1 text-sm text-gray-600 font-mono">{adminProfile.id}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Last Login</label>
                        <p className="mt-1 text-sm text-gray-600">
                          {new Date(adminProfile.last_login).toLocaleString()}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Account Created</label>
                        <p className="mt-1 text-sm text-gray-600">
                          {new Date(adminProfile.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No profile data available.</p>
                )}
              </div>
            )}

            {activeTab === "password" && (
              <div className="max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h2>
                
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="relative mt-1">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="current_password"
                        value={passwordForm.current_password}
                        onChange={handlePasswordChange}
                        required
                        className="block w-full px-3 py-2 pr-10 border border-[#EF5350] rounded-md shadow-sm focus:outline-none focus:ring-[#EF9A9A] focus:border-[#EF9A9A]"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={toggleCurrentPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative mt-1">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="new_password"
                        value={passwordForm.new_password}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                        className="block w-full px-3 py-2 pr-10 border border-[#EF5350] rounded-md shadow-sm focus:outline-none focus:ring-[#EF9A9A] focus:border-[#EF9A9A]"
                        placeholder="Enter new password (min. 6 characters)"
                      />
                      <button
                        type="button"
                        onClick={toggleNewPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="relative mt-1">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        value={passwordForm.confirm_password}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                        className="block w-full px-3 py-2 pr-10 border border-[#EF5350] rounded-md shadow-sm focus:outline-none focus:ring-[#EF9A9A] focus:border-[#EF9A9A]"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#EF5350] hover:bg-[#E57373] text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
                  >
                    {loading ? "Changing Password..." : "Change Password"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Welcome Back</h3>
            <p className="text-2xl font-bold text-[#EF5350] mt-2">
              {adminProfile?.username || "Admin"}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Last Activity</h3>
            <p className="text-sm text-gray-600 mt-2">
              {adminProfile?.last_login 
                ? `Last login: ${new Date(adminProfile.last_login).toLocaleString()}`
                : "No recent activity"
              }
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Account Status</h3>
            <p className="text-green-600 font-medium mt-2">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
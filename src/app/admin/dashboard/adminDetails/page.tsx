"use client";

import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { FiUser, FiLock, FiLogOut, FiEye, FiEyeOff, FiPhone, FiMail, FiImage, FiFacebook, FiInstagram } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AdminProfile {
  id: string;
  username: string;
  last_login: string;
  created_at: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  updated_at: string;
}

interface LogoLinkData {
  id?: string;
  logo: string | null;
  facebook: string | null;
  instagram: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function AdminDashboard() {
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [logoLinkData, setLogoLinkData] = useState<LogoLinkData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "contact" | "logo">("profile");
  
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

  // Contact form state
  const [contactForm, setContactForm] = useState({
    phone: "",
    email: ""
  });

  // Logo & Links form state
  const [logoForm, setLogoForm] = useState({
    facebook: "",
    instagram: ""
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch admin profile
  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
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
      
      const errorData = axiosError.response?.data as any;
      const errorMessage = errorData?.message || 
                          errorData?.error || 
                          axiosError.message || 
                          "Failed to fetch profile";
      
      setError(errorMessage);
      
      if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch contact information
  const fetchContactInfo = async () => {
    try {
      const response = await axios.get<ApiResponse<ContactInfo>>(
        `${API}/admincontact`
      );
      
      if (response.data.success) {
        setContactInfo(response.data.data);
        setContactForm({
          phone: response.data.data.phone,
          email: response.data.data.email
        });
      }
    } catch (err) {
      console.error('Contact info fetch error:', err);
      // Set default values
      setContactInfo({
        phone: "+1 (555) 123-4567",
        email: "contact@sushimaster.com",
        updated_at: new Date().toISOString()
      });
      setContactForm({
        phone: "+1 (555) 123-4567",
        email: "contact@sushimaster.com"
      });
    }
  };

  // Fetch logo and social links
  const fetchLogoLink = async () => {
    try {
      const response = await axios.get<ApiResponse<LogoLinkData>>(
        `${API}/logo/logo-link`
      );
      
      if (response.data.success) {
        setLogoLinkData(response.data.data);
        setLogoForm({
          facebook: response.data.data.facebook || "",
          instagram: response.data.data.instagram || ""
        });
        if (response.data.data.logo) {
          setLogoPreview(response.data.data.logo);
        }
      }
    } catch (err) {
      console.error('Logo link fetch error:', err);
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
        `${API}/admin/change-password`,
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

  // Update contact information (no authentication required)
  const handleUpdateContact = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!contactForm.phone || !contactForm.email) {
      setError("Phone and email are required");
      return;
    }

    try {
      setLoading(true);
      
      // No authentication token needed
      const response = await axios.put(
        `${API}/admincontact/update`,
        contactForm
      );

      if (response.data.success) {
        setSuccess("Contact information updated successfully");
        setContactInfo(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update contact information");
    } finally {
      setLoading(false);
    }
  };

  // Update logo and social links
  const handleUpdateLogoLink = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const formDataToSend = new FormData();

      // Append logo file if selected
      if (logoFile) {
        formDataToSend.append('logo', logoFile);
      }

      // Append social links (only if they have values)
      if (logoForm.facebook) {
        formDataToSend.append('facebook', logoForm.facebook);
      }
      if (logoForm.instagram) {
        formDataToSend.append('instagram', logoForm.instagram);
      }

      const response = await axios.post<ApiResponse<LogoLinkData>>(
        `${API}/logo/logo-link`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setSuccess("Logo and social links updated successfully!");
        setLogoLinkData(response.data.data);
        // Clear the file input after successful upload
        setLogoFile(null);
        // Update preview with the new logo URL from response
        if (response.data.data.logo) {
          setLogoPreview(response.data.data.logo);
        }
        // Refresh the data
        fetchLogoLink();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update logo and social links");
    } finally {
      setLoading(false);
    }
  };

  // Delete logo only
  const handleDeleteLogo = async () => {
    if (!confirm('Are you sure you want to delete the logo?')) return;

    try {
      const response = await axios.delete<ApiResponse<LogoLinkData>>(
        `${API}/logo/logo-link/logo`
      );

      if (response.data.success) {
        setSuccess("Logo deleted successfully!");
        setLogoPreview(null);
        setLogoLinkData(prev => prev ? { ...prev, logo: null } : null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete logo");
    }
  };

  // Delete social link
  const handleDeleteSocialLink = async (platform: 'facebook' | 'instagram') => {
    if (!confirm(`Are you sure you want to delete the ${platform} link?`)) return;

    try {
      const response = await axios.delete<ApiResponse<LogoLinkData>>(
        `${API}/logo/logo-link/social/${platform}`
      );

      if (response.data.success) {
        setSuccess(`${platform} link deleted successfully!`);
        setLogoForm(prev => ({ ...prev, [platform]: '' }));
        setLogoLinkData(prev => prev ? { ...prev, [platform]: null } : null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to delete ${platform} link`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  // Handle file change for logo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogoForm(prev => ({ ...prev, [name]: value }));
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

  useEffect(() => {
    if (token) {
      fetchAdminProfile();
      fetchContactInfo();
      fetchLogoLink();
    }
  }, [token]);

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
      <div className="max-w-6xl mx-auto">
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
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap ${
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
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === "password"
                  ? "text-[#EF5350] border-b-2 border-[#EF5350]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiLock size={18} />
              Change Password
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === "contact"
                  ? "text-[#EF5350] border-b-2 border-[#EF5350]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiPhone size={18} />
              Contact Information
            </button>
            <button
              onClick={() => setActiveTab("logo")}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap ${
                activeTab === "logo"
                  ? "text-[#EF5350] border-b-2 border-[#EF5350]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiImage size={18} />
              Logo & Social Links
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

            {activeTab === "contact" && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <FiPhone className="w-5 h-5 text-[#EF5350]" />
                      <div>
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="font-semibold">{contactInfo?.phone || "Not set"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiMail className="w-5 h-5 text-[#EF5350]" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-semibold">{contactInfo?.email || "Not set"}</p>
                      </div>
                    </div>
                  </div>
                  {contactInfo?.updated_at && (
                    <p className="text-xs text-gray-500 mt-2">
                      Last updated: {new Date(contactInfo.updated_at).toLocaleString()}
                    </p>
                  )}
                </div>

                <form onSubmit={handleUpdateContact} className="space-y-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        required
                        className="block w-full px-3 py-2 border border-[#EF5350] rounded-md shadow-sm focus:outline-none focus:ring-[#EF9A9A] focus:border-[#EF9A9A]"
                        placeholder="Enter phone number (e.g., +1 (555) 123-4567)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                        className="block w-full px-3 py-2 border border-[#EF5350] rounded-md shadow-sm focus:outline-none focus:ring-[#EF9A9A] focus:border-[#EF9A9A]"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#EF5350] hover:bg-[#E57373] text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
                  >
                    {loading ? "Updating Contact Info..." : "Update Contact Information"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "logo" && (
              <div className="max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Logo & Social Links Management</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Current Settings Display */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-700">Current Settings</h3>
                    
                    <div className="space-y-4">
                      {/* Logo Display */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <FiImage className="w-5 h-5 text-[#EF5350]" />
                          Logo
                        </h4>
                        {logoLinkData?.logo ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={logoLinkData.logo} 
                                alt="Current Logo" 
                                className="w-20 h-20 object-contain border rounded-lg"
                              />
                              <div>
                                <p className="text-sm text-gray-600">Current Logo</p>
                                <p className="text-xs text-gray-500">Click to view full size</p>
                              </div>
                            </div>
                            <button
                              onClick={handleDeleteLogo}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No logo uploaded</p>
                        )}
                      </div>

                      {/* Facebook Link Display */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <FiFacebook className="w-5 h-5 text-[#EF5350]" />
                          Facebook
                        </h4>
                        {logoLinkData?.facebook ? (
                          <div className="flex items-center justify-between">
                            <a 
                              href={logoLinkData.facebook} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 truncate max-w-xs"
                            >
                              {logoLinkData.facebook}
                            </a>
                            <button
                              onClick={() => handleDeleteSocialLink('facebook')}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No Facebook link set</p>
                        )}
                      </div>

                      {/* Instagram Link Display */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <FiInstagram className="w-5 h-5 text-[#EF5350]" />
                          Instagram
                        </h4>
                        {logoLinkData?.instagram ? (
                          <div className="flex items-center justify-between">
                            <a 
                              href={logoLinkData.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 truncate max-w-xs"
                            >
                              {logoLinkData.instagram}
                            </a>
                            <button
                              onClick={() => handleDeleteSocialLink('instagram')}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No Instagram link set</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Update Form */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-700">Update Settings</h3>
                    
                    <form onSubmit={handleUpdateLogoLink} className="space-y-6">
                      {/* Logo Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Logo (Optional)
                        </label>
                        <div className="space-y-4">
                          {logoPreview && (
                            <div className="flex justify-center">
                              <img 
                                src={logoPreview} 
                                alt="Logo Preview" 
                                className="w-32 h-32 object-contain border rounded-lg"
                              />
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF5350] focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500">
                            Supported formats: JPEG, PNG, GIF, WEBP. Max size: 100MB
                          </p>
                        </div>
                      </div>

                      {/* Facebook Link */}
                      <div>
                        <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
                          Facebook Link (Optional)
                        </label>
                        <input
                          type="url"
                          id="facebook"
                          name="facebook"
                          value={logoForm.facebook}
                          onChange={handleLogoFormChange}
                          placeholder="https://facebook.com/yourpage"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF5350] focus:border-transparent"
                        />
                      </div>

                      {/* Instagram Link */}
                      <div>
                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram Link (Optional)
                        </label>
                        <input
                          type="url"
                          id="instagram"
                          name="instagram"
                          value={logoForm.instagram}
                          onChange={handleLogoFormChange}
                          placeholder="https://instagram.com/yourpage"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EF5350] focus:border-transparent"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#EF5350] hover:bg-[#E57373] text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
                      >
                        {loading ? "Updating Settings..." : "Update Logo & Social Links"}
                      </button>
                    </form>

                    {/* Instructions */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-lg font-medium text-blue-800 mb-2">Instructions</h4>
                      <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• All fields are optional - update only what you need</li>
                        <li>• Upload a logo image to set or replace the current logo</li>
                        <li>• Enter full URLs for social links</li>
                        <li>• Use delete buttons to remove individual items</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
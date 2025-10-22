'use client';

import { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const API =process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      //  const { data } = await axios.post<{ data:{ token: string } }>(
      const { data } = await axios.post<{  token: string}>(
        `${API}/admin/login`,
        { username, password }
      );

      localStorage.setItem('adminToken', data.token);
      router.replace('/admin/dashboard/menuItems');
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMsg = axiosError.response?.data?.message || 'Login failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-white px-8 lg:px-16 py-12">
        {/* <img src="/logo.png" alt="SushiMaster Logo" className="w-32 md:w-40 mb-6" /> */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#EF5350] text-center mb-2">
          Welcome to SushiMaster Dashboard
        </h1>
        <p className="text-base md:text-lg text-gray-700 text-center">
          Please login to continue
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 justify-center items-center bg-[#FFEBEE] px-6 sm:px-8 md:px-12 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#EF5350]">
            Admin Login
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-6 text-sm font-semibold shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold mb-1 text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full border border-[#EF5350] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EF9A9A] text-gray-900"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-1 text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full border border-[#EF5350] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EF9A9A] text-gray-900"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-4 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  role="button"
                  tabIndex={0}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EF5350] hover:bg-[#E57373] text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 shadow-md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

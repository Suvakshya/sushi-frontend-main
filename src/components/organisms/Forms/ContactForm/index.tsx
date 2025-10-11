"use client";

import axios from "axios";
import React, { useState, FormEvent } from "react";

type ContactFormProps = {
  padding?: number | string;
  width?: "full" | string;
  primaryButton?: string;
  secondaryButton?: string;
  formTitle?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const ContactForm: React.FC<ContactFormProps> = ({
  padding = 30,
  width = "full",
  formTitle,
  secondaryButton = "Send Enquiry",
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      message: formData.additionalInfo,
    };

    const API = process.env.NEXT_PUBLIC_API_BASE_URL

    try {
      const response = await fetch(`${API}/Contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setModalMessage("Failed to submit form: " + (errorData.message || "Unknown error"));
        setModalVisible(true);
        setLoading(false);
        return;
      }

      await response.json();
      setModalMessage("✅ Thank you for contacting us!");
      setModalVisible(true);

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        additionalInfo: "",
      });
    } catch (error) {
      // setModalMessage("⚠️ An error occurred. Please try again later.");
      if (axios.isAxiosError(error)) {
      // Type-safe Axios error handling
      setModalMessage(
        error.response?.data?.message || 
        "⚠️ An error occurred. Please try again later."
      );
    } else {
      // Non-Axios errors
      setModalMessage("⚠️ An unexpected error occurred");
    }
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items- px-4">
          <div
            className={`bg-white max-w-7xl w-full rounded-3xl shadow-md border border-gray-200 flex flex-col gap-7 ${
              width === "full" ? "w-full" : "w-full md:w-[800px]"
            }`}
            style={{ padding }}
          >
            {formTitle && (
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                {formTitle}
              </h2>
            )}

            {/* First Name & Last Name */}
            <div className="w-full flex flex-col md:flex-row gap-6">
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your First Name"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="border border-blue-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="border border-blue-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                required
                type="tel"
                placeholder="Your Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="border border-blue-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border rounded-md border-blue-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            {/* Additional Info */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 font-medium mb-1">
                Additional Necessity
              </label>
              <textarea
                placeholder="e.g. We'd like to travel to three temples: Pashupatinath, Muktinath & Manakamana."
                value={formData.additionalInfo}
                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                className="border border-blue-500 rounded-md px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center mb-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : secondaryButton}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Stylish Modal popup */}
      {modalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onClick={closeModal}
        >
          <div
            className="bg-[#DFF9EE] rounded-2xl shadow-xl w-full max-w-sm p-6 relative animate-fadeIn"

            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <p className="text-gray-900 text-lg mb-6 whitespace-pre-wrap">{modalMessage}</p>

            <button
              onClick={closeModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md w-full transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Tailwind animation (you can add this to your global css/tailwind.config if you want) */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease forwards;
        }
      `}</style>
    </>
  );
};

export default ContactForm;


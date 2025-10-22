"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/organisms/Navbar/page";
import Footer from "../../../components/organisms/Footer/page";
import { useLanguage } from "../../../context/LanguageContext";

interface TermsAndConditions {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function TermsAndConditionsPage() {
  const [terms, setTerms] = useState<TermsAndConditions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useLanguage();

  // Fetch terms and conditions from backend
  const fetchTermsAndConditions = async () => {
    try {
      setLoading(true);
      setError(null);
      const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

      const response = await fetch(`${API}/termsandconditions/terms`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setTerms(result.data);
      } else {
        throw new Error(result.message || t("Failed to fetch terms and conditions"));
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
      setError(
        error instanceof Error ? error.message : t("Failed to load terms and conditions")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTermsAndConditions();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="relative bg-gradient-to-br from-gray-900 to-black py-16 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {t("Terms and Conditions")}
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  {t("Please read these terms and conditions carefully before using our services.")}
                </p>
              </div>
            </div>
          </section>

          {/* Terms Content */}
          <section className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                  <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    {t("Error Loading Terms")}
                  </h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={fetchTermsAndConditions}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    {t("Try Again")}
                  </button>
                </div>
              </div>
            ) : terms ? (
              <div className="prose prose-lg max-w-none">
                {/* Last Updated */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">
                      {t("Last Updated")}: {formatDate(terms.updatedAt)}
                    </span>
                  </div>
                </div>

                {/* Terms Description */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div 
                    className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ 
                      __html: terms.description.replace(/\n/g, '<br/>') 
                    }}
                  />
                </div>

                {/* Terms Metadata */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        <strong>{t("Created")}:</strong> {formatDate(terms.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                      <span>
                        <strong>{t("Terms ID")}:</strong> {terms.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
                  <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    {t("No Terms Available")}
                  </h3>
                  <p className="text-yellow-600">
                    {t("No terms and conditions have been published yet. Please check back later.")}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Additional Information */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t("Agreement")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("By using our services, you agree to be bound by these terms and conditions and our privacy policy.")}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t("Legal Compliance")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("Our terms are designed to ensure compliance with applicable laws and protect both our customers and our business.")}
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/organisms/Navbar/page";
import Footer from "../../../components/organisms/Footer/page";
import { useLanguage } from "../../../context/LanguageContext";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const { t, language } = useLanguage();

  // Fetch FAQs from backend
  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);
      const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

      const response = await fetch(`${API}/faq/faqs`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setFaqs(result.data);
      } else {
        throw new Error(result.message || t("Failed to fetch FAQs"));
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setError(
        error instanceof Error ? error.message : t("Failed to load FAQs")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  // Toggle FAQ answer
  const toggleFAQ = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  // Format date based on current language
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US');
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
                  {t("FAQ")}
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  {t("Find answers to the most commonly asked questions about our sushi restaurant and services.")}
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Content */}
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
                    {t("Error Loading FAQs")}
                  </h3>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={fetchFAQs}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    {t("Try Again")}
                  </button>
                </div>
              </div>
            ) : faqs.length > 0 ? (
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                          openQuestion === faq.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`px-6 overflow-hidden transition-all duration-300 ${
                        openQuestion === faq.id ? "max-h-96 py-4" : "max-h-0"
                      }`}
                    >
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-500">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                          {t("Last updated")}: {formatDate(faq.updatedAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
                  <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    {t("No FAQs Available")}
                  </h3>
                  <p className="text-yellow-600">
                    {t("No frequently asked questions have been published yet. Please check back later.")}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
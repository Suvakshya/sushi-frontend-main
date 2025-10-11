"use client";

import { useState } from 'react';
import Navbar from '../../../components/organisms/Navbar/page';
import Footer from '../../../components/organisms/Footer/page';

interface ContactFormData {
  name: string;
  email: string;
  mobileNumber: string;
  description: string;
}

export default function SushiBoatPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    mobileNumber: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005/api/v1';
      const response = await fetch(`${API}/contact/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Thank you! Your Sushi Boat reservation request has been submitted successfully.' });
        setFormData({
          name: '',
          email: '',
          mobileNumber: '',
          description: ''
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: result.errors?.[0] || result.message || 'Failed to submit your request. Please try again.' 
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 to-black py-20">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Sushi<span className="text-red-500">Boat</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The Ultimate Japanese Dining Experience for Special Occasions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('sushi-boat-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Book Your Boat Now
              </button>
              <button 
                onClick={() => document.getElementById('sushi-boat-details')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Sushi Boat Section */}
        <section id="sushi-boat-details" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                We are more than delivery and takeaway
              </h2>
              <div className="w-24 h-1 bg-red-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Big Image */}
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/api/placeholder/800/800" // Replace with your actual sushi boat image
                    alt="Sushi Boat - Premium Japanese Experience"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
              </div>

              {/* Right Side - Content and Form */}
              <div className="space-y-8">
                {/* Sushi Boat Description */}
                <div className="space-y-6">
                  <h3 className="text-4xl font-bold text-gray-900">
                    Sushi Boat
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    It's not just sushi. It's an event. 
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    300 pieces, a boat, and no room for amateurs. 
                    Made to share (or pretend to), with everything included: chopsticks, soy, wasabi, 
                    sauceboats, and envious glances.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our Sushi Boat is the perfect choice for any celebration worth remembering (and sharing). 
                    It serves a large group, or just your most ambitious desires. 
                    It's all about freshness. And about doing things big.
                  </p>
                  
                  {/* Sushi Boat Composition */}
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Sushi Boat Composition
                    </h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• 300 premium sushi pieces</li>
                      <li>• Traditional wooden boat presentation</li>
                      <li>• Assorted nigiri, sashimi, and specialty rolls</li>
                      <li>• Complete with chopsticks, soy sauce, and wasabi</li>
                      <li>• Serves 8-12 people</li>
                      <li>• 48-hour advance booking required</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600 mb-2">
                      Talk to us and book your Sushi Boat now
                    </p>
                    <div className="w-32 h-1 bg-red-500 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="sushi-boat-form" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Book Your Sushi Boat Experience
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours to confirm your reservation
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-3xl shadow-lg">
              {message.text && (
                <div className={`p-4 rounded-lg ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Mobile Number Field */}
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile number *
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  title="Please enter exactly 10 digits"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1">Must be exactly 10 digits</p>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Enter all relevant details such as date, time of delivery and collection, and number of people"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-bold hover:bg-red-600 disabled:bg-red-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </div>
                ) : (
                  'Book My Sushi Boat Experience'
                )}
              </button>

              {/* Additional Info */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  We'll contact you within 24 hours to confirm your Sushi Boat reservation
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⏰</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">48-Hour Notice</h4>
                <p className="text-gray-600 text-lg">Book at least 48 hours in advance for the perfect preparation and fresh ingredients</p>
              </div>

              <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👥</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Serves 8-12 People</h4>
                <p className="text-gray-600 text-lg">Perfect for parties, celebrations, corporate events, and special gatherings</p>
              </div>

              <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Fresh Daily Preparation</h4>
                <p className="text-gray-600 text-lg">Prepared with the freshest ingredients on the day of your event for optimal quality</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to make your event unforgettable?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book your Sushi Boat today and create memories that will last a lifetime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('sushi-boat-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Book Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                Call Us: (555) 123-4567
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
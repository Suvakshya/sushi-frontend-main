"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../../components/organisms/Navbar/page';
import Footer from '../../../components/organisms/Footer/page';

interface Blog {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  postedAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API}/blogs`);
      const result = await res.json();
      if (result.success) {
        setBlogs(result.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              Sushi<span className="text-red-500">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stories, Insights, and News from SushiMaster
            </p>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <div className="space-y-20">
                {blogs.map((blog, index) => (
                  <div
                    key={blog._id}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                    }`}
                  >
                    {/* Image - Alternates sides */}
                    <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-96 lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>

                    {/* Content - Alternates sides */}
                    <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                            Latest
                          </span>
                          <span>{formatDate(blog.postedAt)}</span>
                        </div>
                        
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                          {blog.title}
                        </h2>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {blog.description}
                        </p>
                        
                        <button className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                          Read More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Static Content Sections */}
            {/* Our Story Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
              {/* Content */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Our goal is fresh, freshly made sushi.
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    At Home Sweet Sushi, we believe that sushi can be much more than a meal; it's a way to bring comfort, freshness, and happiness. We started in 2014 in a small kitchen, driven by passion and creativity, and have grown to become your trusted choice, with stores in Lisbon, Seixal, and Porto.
                  </p>
                  <p>
                    Our mission is clear: to bring the best sushi experience to your home, with freshness and flavor in every order. But deliciousness isn't enough—we're committed to doing better for the planet. We've said goodbye to plastic, invested in recyclable packaging, and transformed used oil into biodiesel. We work with local suppliers and optimize every detail because we believe sushi can be both fresh and responsible.
                  </p>
                  <p>
                    And we're not stopping here! We want to continue surprising you, brightening your days, and proving that happiness really can come in the form of sushi. After all, we're here to make a difference—one piece of sushi at a time.
                  </p>
                  <p className="font-semibold text-gray-900">
                    Home Sweet Sushi: It's all about freshness.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/api/placeholder/600/600" // Replace with your story image
                  alt="Our Sushi Story"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>

            {/* Careers Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/api/placeholder/600/600" // Replace with your careers image
                  alt="Join Our Team"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Let's get to work... Or rather, to sushi🍣
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    We're looking for talented people who are passionate about sushi and eager to grow within a relaxed team focused on the art of Japanese cuisine. Here, you'll hone your skills, explore new flavors, and work in a fast-paced, yet always positive environment!
                  </p>
                  <p>
                    If you have knife skills, attention to detail, and a desire to learn (or perfect) the art of sushi, we want to hear from you!
                  </p>
                  <p className="font-semibold text-gray-900">
                    Submit your application and come join our kitchen.🍙
                  </p>
                </div>
                
                <button className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
                  Join Our Team
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Stay Updated with SushiMaster
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for the latest updates, recipes, and special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
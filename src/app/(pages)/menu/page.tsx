"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../../components/organisms/Navbar/page";
import Footer from "../../../components/organisms/Footer/page";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("sushi");

  // Refs for scrolling
  const sushiRef = useRef<HTMLDivElement>(null);
  const sashimiRef = useRef<HTMLDivElement>(null);
  const drinksRef = useRef<HTMLDivElement>(null);
  const appetizersRef = useRef<HTMLDivElement>(null);
  const dessertsRef = useRef<HTMLDivElement>(null);

  // Category data with modern icons and gradients
  const categories = [
    {
      id: "sushi",
      name: "Sushi Rolls",
      icon: "🍣",
      description: "Handcrafted Traditional Rolls",
      gradient: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 to-pink-100",
    },
    {
      id: "sashimi",
      name: "Sashimi",
      icon: "🐟",
      description: "Premium Fresh Seafood",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-100",
    },
    {
      id: "drinks",
      name: "Beverages",
      icon: "🍹",
      description: "Refreshing Drinks & Sake",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100",
    },
    {
      id: "appetizers",
      name: "Appetizers",
      icon: "🥢",
      description: "Perfect Starters",
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-100",
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: "🍰",
      description: "Sweet Finales",
      gradient: "from-purple-500 to-fuchsia-600",
      bgGradient: "from-purple-50 to-fuchsia-100",
    },
  ];

  // Fetch menu items from backend
  const fetchMenuItems = async () => {
    try {
      setMenuLoading(true);
      setMenuError(null);
      const API =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005/api/v1";

      const response = await fetch(`${API}/menu`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setMenuItems(result.data.filter((item: MenuItem) => item.is_available));
      } else {
        throw new Error(result.message || "Failed to fetch menu items");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setMenuError(
        error instanceof Error ? error.message : "Failed to load menu items"
      );
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Scroll to category function
  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
      sushi: sushiRef,
      sashimi: sashimiRef,
      drinks: drinksRef,
      appetizers: appetizersRef,
      desserts: dessertsRef,
    };

    const ref = refs[category];
    if (ref?.current) {
      const offset = 180; // Increased offset to account for navbar + category navbar
      const elementPosition = ref.current.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  // Filter menu items by category
  const getItemsByCategory = (category: string) => {
    return menuItems.filter((item) => item.category === category);
  };

  // Format price to display with dollar sign
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Modern Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 to-black py-16">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Sushi<span className="text-red-500">Master</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              Experience authentic Japanese cuisine crafted with precision and
              passion. Fresh ingredients, traditional techniques, modern
              flavors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Order Online Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                View Full Menu
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Sticky Category Navigation */}
        <section className="sticky top-0 z-50 bg-white shadow-2xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`flex flex-col items-center px-6 py-4 rounded-2xl transition-all duration-300 min-w-[140px] mx-2 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.gradient} text-white transform scale-105 shadow-lg`
                      : `bg-gradient-to-r ${category.bgGradient} text-gray-700 hover:scale-105 hover:shadow-md`
                  }`}
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <span className="font-bold text-lg whitespace-nowrap">
                    {category.name}
                  </span>
                  <span className="text-xs opacity-90 mt-1 whitespace-nowrap">
                    {category.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Sushi Section */}
          <section ref={sushiRef} className="mb-24 scroll-mt-40">
            <div className="mb-12 pt-8">
              {" "}
              {/* Changed from text-center to left aligned */}
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Sushi Rolls
              </h2>
            </div>

            {menuLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {getItemsByCategory("sushi").map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-red-100 to-pink-200 flex items-center justify-center">
                        <span className="text-5xl">🍣</span>
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          {item.name}
                        </h3>
                        <span className="text-xl font-bold text-red-500 whitespace-nowrap ml-2">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <button className="w-full bg-red-500 text-white py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!menuLoading && getItemsByCategory("sushi").length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No sushi rolls available at the moment.
                </p>
              </div>
            )}
          </section>

          {/* Sashimi Section */}
          <section ref={sashimiRef} className="mb-24 scroll-mt-40">
            <div className="mb-12 pt-8">
              {" "}
              {/* Changed from text-center to left aligned */}
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Sashimi</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getItemsByCategory("sashimi").map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-cyan-200 flex items-center justify-center">
                      <span className="text-5xl">🐟</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-xl font-bold text-red-500 whitespace-nowrap ml-2">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <button className="w-full bg-red-500 text-white py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!menuLoading && getItemsByCategory("sashimi").length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No sashimi available at the moment.
                </p>
              </div>
            )}
          </section>

          {/* Drinks Section */}
          <section ref={drinksRef} className="mb-24 scroll-mt-40">
            <div className="mb-12 pt-8">
              {" "}
              {/* Changed from text-center to left aligned */}
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Beverages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getItemsByCategory("drinks").map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                      <span className="text-5xl">🍹</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-xl font-bold text-red-500 whitespace-nowrap ml-2">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <button className="w-full bg-red-500 text-white py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!menuLoading && getItemsByCategory("drinks").length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No beverages available at the moment.
                </p>
              </div>
            )}
          </section>

          {/* Appetizers Section */}
          <section ref={appetizersRef} className="mb-24 scroll-mt-40">
            <div className="mb-12 pt-8">
              {" "}
              {/* Changed from text-center to left aligned */}
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Appetizers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getItemsByCategory("appetizers").map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                      <span className="text-5xl">🥢</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-xl font-bold text-red-500 whitespace-nowrap ml-2">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <button className="w-full bg-red-500 text-white py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!menuLoading && getItemsByCategory("appetizers").length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No appetizers available at the moment.
                </p>
              </div>
            )}
          </section>

          {/* Desserts Section */}
          <section ref={dessertsRef} className="mb-24 scroll-mt-40">
            <div className="mb-12 pt-8">
              {" "}
              {/* Changed from text-center to left aligned */}
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Desserts
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getItemsByCategory("desserts").map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-purple-100 to-fuchsia-200 flex items-center justify-center">
                      <span className="text-5xl">🍰</span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {item.name}
                      </h3>
                      <span className="text-xl font-bold text-red-500 whitespace-nowrap ml-2">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <button className="w-full bg-red-500 text-white py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!menuLoading && getItemsByCategory("desserts").length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No desserts available at the moment.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Why Choose SushiMaster? Section */}
        {/* <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Why Choose SushiMaster?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl text-white">🎣</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Fresh Daily Delivery</h3>
                <p className="text-gray-600 text-lg">We source the freshest fish daily from trusted local and international suppliers</p>
              </div>
              
              <div className="text-center p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl text-white">👨‍🍳</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Master Chefs</h3>
                <p className="text-gray-600 text-lg">Our chefs trained in Tokyo with over 20 years of authentic Japanese experience</p>
              </div>
              
              <div className="text-center p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl text-white">🚀</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600 text-lg">Quick 30-minute delivery to keep your sushi fresh and delicious every time</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to experience the best sushi?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Order online now or visit us for an authentic Japanese dining
              experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Order Now
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

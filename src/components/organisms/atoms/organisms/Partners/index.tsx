'use client';

import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import axios from 'axios';

interface Company {
  _id?: string;
  title: string;
  imageUrl: string;
}

// const API = 'http://localhost:3000/api/v1';
const API = process.env.NEXT_PUBLIC_API_BASE_URL;

const PartnersSection = () => {
  const [partners, setPartners] = useState<Company[]>([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get<{ data: Company[] }>(`${API}/companiesworked`);
        setPartners(res.data.data || []); // Ensure we always have an array
      } catch (error) {
        console.error('Failed to fetch partners:', error);
        setPartners([]); // Set to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading partners...</div>;
  }

  // Create a duplicated array for the marquee effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-10 md:py-10 lg:py-15">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Text */}
        <div className="text-left text-xl md:text-2xl text-gray-800 font-semibold mb-4 md:mb-0 md:mr-1 leading-snug">
          Partnered with trusted<br />
          industry leaders<br />
          innovators
        </div>

        {/* Right Section - Marquee */}
        <div className="w-[200px] relative md:flex-[1.2] mt-4 ml-10 md:mt-0">
          <Marquee speed={60} gradient={false} pauseOnHover={true}>
            <div className="flex items-center space-x-3 hover:opacity-70 px-4 gap-2">
              {duplicatedPartners.map((partner, index) => (
                <div key={`${partner._id}-${index}`} className="flex-shrink-0">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.title}
                    height={56}
                    width={120}
                    className="object-contain hover:grayscale-0 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
import React from "react";
import Button from "../atoms/Buttons"; 
import Image from "next/image";
import InfoHeader from "../atoms/Headings/infoHeader";
import Link from "next/link";
const HeroSection: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 mt-3 sm:mt-4 md:mt-3 lg:mt-6">

  
      
      {/* Content Section */}
       <div className="text-left flex flex-col justify-center pt-6 lg:pt-0 sm:pt-0">
       
        <InfoHeader text="  Development Agency" />
        {/* Main Heading with reduced width */}
        <h1 className="text-[#06171f]   text-3xl sm:text-4xl md:text-6xl font-semibold leading-[42px] md:leading-[72px] mb-2 max-w-[600px]">
        Ascending to Innovative Growth
        </h1>

        {/* Description Text */}
        <div className=" opacity-90  text-lg sm:text-md ">
          <span className="text-[#06171f]  font-normal whitespace-pre-line text-justify ">
          We bring visionary ideas to life as high‑impact innovative solutions, anchoring creativity and technology for remarkable results.
          </span>
        </div>

        {/* Optional Button */}
        <div className="mt-8"> 
          <Link href="/contact"> 
          <Button
            text="Contact us"
            variant="primary"
            color="primary"
            className=" hover:bg-green-700"
          />
          </Link>
        </div>
      </div>

      {/* Image Section  ds*/}
      <div className="flex justify-center items-center">
        <Image
          src={"/images/herobanner.gif"}  // Replace with your image path
          width={1000}  // Increased width
          height={600}  // Increased height
          alt="Hero Banner Image"
          className=""
        />
      </div>
    </section>
  );
};

export default HeroSection;

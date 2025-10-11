import React from "react";

interface HeaderProps {
  text: string;
  width?: string; // Optional width prop
  
}

const Header: React.FC<HeaderProps> = ({ text, width = "w-1/5" }) => {
  return (
    <h2 className={`text-[#06171f] ${width} text-[38px] font-bold leading-[44px] mb-6`}>
      {text}
    </h2>
  );
};

export default Header;

import React from "react";
import Image from "next/image";

// Define button variants and colors
type ButtonVariants = "primary" | "secondary" | "tertiary" | "transparent"; //githubb

interface ButtonProps {
  text: string;
  variant?: ButtonVariants;
  color?: string; // optional color prop
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = "primary",
  color = "blue",
  className = "",
  onClick,
}) => {
  // Set variant classes and color dynamically based on the variant and color props
  const variantClasses = {
    primary: `bg-primary hover:bg-${color}-700`,
    secondary: "bg-gray-600 hover:bg-gray-700",
    tertiary: "bg-transparent hover:bg-gray-200",
    transparent: "bg-white text-[#008ED4]  hover:bg-gray-700 border border-[#008ED4]",
  };

  return (
    <button
    onClick={onClick}
    className={`w-[180px] h-[60px] text-[16px] font-bold text-white rounded-[30px] px-[12px] py-[10px] gap-[8px]  
                ${variantClasses[variant]} flex items-center justify-center transition duration-300 ${className}`}
  >
  
      {text}
      <Image
        src={"/images/arrowright.png"} //changes
        alt="icon"
        width={14}
        height={7}
        className="ml-2"
      />
    </button>
  );
};

export default Button;

import React from "react";

interface InfoHeaderProps {
  text: string;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({ text }) => {
  return (
    <div className="text-[#008ed4] text-xl font-semibold capitalize leading-loose">
      {text}
    </div>
  );
};

export default InfoHeader;

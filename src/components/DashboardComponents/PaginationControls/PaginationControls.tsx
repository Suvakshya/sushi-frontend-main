"use client";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  color?: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  color = "#06AB86",
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 border rounded ${
            currentPage === number
              ? "bg-[#06AB86] text-white"
              : "text-[#06AB86] bg-white"
          }`}
          style={{ 
            borderColor: color,
            ...(currentPage === number ? { backgroundColor: color } : {})
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
}
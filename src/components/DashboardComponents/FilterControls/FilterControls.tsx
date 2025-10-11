"use client";

interface FilterControlsProps {
  filters: Array<{
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
  }>;
  selectedValues: Record<string, string>;
  onFilterChange: (name: string, value: string) => void;
  className?: string;
}

export default function FilterControls({
  filters,
  selectedValues,
  onFilterChange,
  className = "",
}: FilterControlsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${filters.length} gap-4 ${className}`}>
      {filters.map((filter) => (
        <div key={filter.value}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {filter.label}
          </label>
          <select
            value={selectedValues[filter.value] || ""}
            onChange={(e) => onFilterChange(filter.value, e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-[#06AB86] focus:border-[#04856d] transition"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
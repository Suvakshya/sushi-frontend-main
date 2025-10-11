// "use client";

// interface CardGridProps {
//   items: any[];
//   renderItem: (item: any) => React.ReactNode;
//   emptyMessage?: string;
//   className?: string;
//   gridClassName?: string;
// }

// export default function CardGrid({
//   items,
//   renderItem,
//   emptyMessage = "No items found",
//   className = "",
//   gridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
// }: CardGridProps) {
//   return (
//     <div className={className}>
//       {items.length === 0 ? (
//         <p className="text-gray-500 text-center">{emptyMessage}</p>
//       ) : (
//         <div className={`grid gap-6 ${gridClassName}`}>
//           {items.map((item) => renderItem(item))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

interface CardGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
  gridClassName?: string;
}

export default function CardGrid<T>({
  items,
  renderItem,
  emptyMessage = "No items found",
  className = "",
  gridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}: CardGridProps<T>) {
  return (
    <div className={className}>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">{emptyMessage}</p>
      ) : (
        <div className={`grid gap-6 ${gridClassName}`}>
          {items.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
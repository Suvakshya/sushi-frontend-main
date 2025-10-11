// "use client";

// import { FiX } from "react-icons/fi";

// interface ViewDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   data: Record<string, any>;
//   fields: Array<{
//     label: string;
//     key: string;
//     render?: (value: any) => React.ReactNode;
//     colSpan?: number;
//   }>;
// }

// export default function ViewDetailsModal({
//   isOpen,
//   onClose,
//   title,
//   data,
//   fields,
// }: ViewDetailsModalProps) {
//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose}></div>
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4 ml-60">
//         <div
//           className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative flex flex-col"
//           onClick={(e) => e.stopPropagation()}
//           style={{ maxHeight: "90vh" }}
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
//           >
//             <FiX size={24} />
//           </button>

//           <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-5">
//             <h2 className="text-xl font-bold text-center text-[#06AB86]">{title}</h2>
//           </div>

//           <div className="overflow-y-auto flex-1 p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
//               {fields.map((field) => (
//                 <div key={field.key} className={field.colSpan ? `sm:col-span-${field.colSpan}` : ""}>
//                   <p className="font-semibold">{field.label}:</p>
//                   {field.render ? (
//                     field.render(data[field.key])
//                   ) : (
//                     <p>{data[field.key] || 'Not specified'}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import { FiX } from "react-icons/fi";

interface FieldDefinition<T> {
  label: string;
  key: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode;
  colSpan?: number;
}

interface ViewDetailsModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: T;
  fields: Array<FieldDefinition<T>>;
}

export default function ViewDetailsModal<T extends Record<string, unknown>>({
  isOpen,
  onClose,
  title,
  data,
  fields,
}: ViewDetailsModalProps<T>) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 ml-60">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: "90vh" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
          >
            <FiX size={24} />
          </button>

          <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-5">
            <h2 className="text-xl font-bold text-center text-[#06AB86]">{title}</h2>
          </div>

          <div className="overflow-y-auto flex-1 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              {fields.map((field) => (
                <div key={field.key as string} className={field.colSpan ? `sm:col-span-${field.colSpan}` : ""}>
                  <p className="font-semibold">{field.label}:</p>
                  {field.render ? (
                    field.render(data[field.key])
                  ) : (
                    <p>{(data[field.key] as string) || 'Not specified'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
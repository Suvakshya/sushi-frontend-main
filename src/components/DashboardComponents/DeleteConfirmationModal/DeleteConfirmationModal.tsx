"use client";

import { FiX } from "react-icons/fi";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  // message?: string;
  message?: React.ReactNode;
  cancelText?: string;
  isLoading?: boolean;
  confirmText?: string;
  confirmButtonClass?: string; 
}

export default function DeleteConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  title = "Confirm Delete?",
  message = "Are you sure you want to delete this item?",
  cancelText = "Cancel",
  confirmText = "Delete",
  
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-transparent backdrop-blur-sm z-40"
        onClick={onCancel}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 ml-60">
        <div
          className="bg-[#DFF9EE] rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          >
            <FiX size={20} />
          </button>
          <h2 className="text-xl font-bold mb-3 text-center text-gray-800">
            {title}
          </h2>
          <p className="text-center text-sm text-gray-700 mb-5">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-1.5 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition text-sm"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white transition text-sm shadow"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
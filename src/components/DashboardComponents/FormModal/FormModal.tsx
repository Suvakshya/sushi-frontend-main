"use client";

import { FiX } from "react-icons/fi";
import { ReactNode } from "react";
import React from "react";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "warning";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit?: (e: React.FormEvent) => void;
  children: ReactNode;
  isLoading?: boolean;
  isEdit?: boolean;
  error?: ReactNode;
  success?: ReactNode;
  maxWidth?: MaxWidth;
  showCancel?: boolean;
  cancelText?: string;
  submitText?: string;
  submitVariant?: ButtonVariant;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  disableSubmit?: boolean;
  scrollable?: boolean;
  className?: string;
  overlayClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const maxWidthClasses: Record<MaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  full: "max-w-full",
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
};

export default function FormModal({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  isLoading = false,
  isEdit = false,
  error,
  success,
  maxWidth = "2xl",
  showCancel = true,
  cancelText = "Cancel",
  submitText,
  submitVariant = "primary",
  customHeader,
  customFooter,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  disableSubmit = false,
  scrollable = true,
  className = "",
  overlayClassName = "bg-black/30 backdrop-blur-sm",
  headerClassName = "p-6 border-b border-gray-200 sticky top-0 bg-white z-10",
  bodyClassName = "space-y-4",
  footerClassName = "flex justify-end gap-3 pt-2",
}: FormModalProps) {
  // Handle escape key press
  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 ${overlayClassName}`}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className={`bg-white rounded-2xl shadow-xl w-full ${maxWidthClasses[maxWidth]} relative flex flex-col ${className}`}
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: "90vh" }}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
            aria-label="Close modal"
          >
            <FiX size={24} />
          </button>

          {/* Header */}
          {customHeader ? (
            customHeader
          ) : title ? (
            <div className={headerClassName}>
              <h2 className="text-xl font-bold text-center">
                {isEdit ? `Edit ${title}` : `Add ${title}`}
              </h2>
            </div>
          ) : null}

          {/* Body */}
          <div className={`${scrollable ? "overflow-y-auto flex-1" : ""} p-6`}>
            {/* Error message */}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm font-semibold shadow-sm">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm font-semibold shadow-sm">
                {success}
              </div>
            )}

            {onSubmit ? (
              <form onSubmit={onSubmit} className={bodyClassName}>
                {children}

                {customFooter ? (
                  customFooter
                ) : (
                  <div className={footerClassName}>
                    {showCancel && (
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        disabled={isLoading}
                      >
                        {cancelText}
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-md disabled:opacity-50 ${buttonVariants[submitVariant]}`}
                      disabled={isLoading || disableSubmit}
                    >
                      {isLoading
                        ? "Processing..."
                        : submitText
                        ? submitText
                        : isEdit
                        ? "Update"
                        : "Submit"}
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <div className={bodyClassName}>
                {children}
                {customFooter && customFooter}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
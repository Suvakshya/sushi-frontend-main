"use client";

import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { useCart } from "../../context/CartContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { setRequiresAuth } = useCart();

  useEffect(() => {
    if (!isOpen) {
      setIsLogin(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setRequiresAuth(false);
    onClose();
  };

  const handleSuccess = () => {
    setRequiresAuth(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleClose}></div>

        <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {isLogin ? (
            <Login 
              onSwitchToRegister={() => setIsLogin(false)} 
              onClose={handleSuccess}
            />
          ) : (
            <Register 
              onSwitchToLogin={() => setIsLogin(true)} 
              onClose={handleSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
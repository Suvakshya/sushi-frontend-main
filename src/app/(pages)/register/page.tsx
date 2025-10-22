"use client";

import { useRouter } from "next/navigation";
import Register from "../../../components/auth/Register";

export default function RegisterPage() {
  const router = useRouter();

  const handleSwitchToLogin = () => {
    router.push("/login");
  };

  return (
    <Register 
      onSwitchToLogin={handleSwitchToLogin}
    />
  );
}
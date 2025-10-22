"use client";

import { useRouter } from "next/navigation";
import Login from "../../../components/auth/Login";

export default function LoginPage() {
  const router = useRouter();

  const handleSwitchToRegister = () => {
    router.push("/register");
  };

  return (
    <Login 
      onSwitchToRegister={handleSwitchToRegister}
    />
  );
}
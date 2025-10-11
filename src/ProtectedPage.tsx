// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ProtectedPage({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');

//     if (!token) {
//       // If no token, redirect to your login page
//       router.push('/admin/login');  // Or external URL if you want
//     } else {
//       setCheckingAuth(false);
//     }
//   }, [router]);

//   if (checkingAuth) {
//     return <div className="text-center mt-20">Checking authentication...</div>;
//   }

//   return <>{children}</>;
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const currentPath = window.location.pathname;

    // Prevent redirect loop if already on login page
    const isOnLoginPage = currentPath === '/admin/login';

    if (!token && !isOnLoginPage) {
      router.push('/admin/login');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return <div className="text-center mt-20">Checking authentication...</div>;
  }

  return <>{children}</>;
}

import Sidebar from '@/components/DashboardComponents/Sidebar/Sidebar';
import '../../globals.css'; // ✅ Make sure global styles are included
import ProtectedPage from '@/ProtectedPage';

export const metadata = {
  title: 'Dashboard',
  description: 'Admin Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage>
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-[#EAFDF6] min-h-screen text-gray-900">
        {children}
      </main>
    </div>
    </ProtectedPage>
  );
}

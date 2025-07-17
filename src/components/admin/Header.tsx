'use client';

import { LogOut } from 'lucide-react'; // ✅ Icon mũi tên đăng xuất
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // ✅ useAuth để lấy logout

export default function Header() {
  const router = useRouter();
  const { logout, user } = useAuth(); // ✅ Gọi logout và user

  const handleLogout = () => {
    logout();         // 👉 Gọi logout
    router.push('/'); // 👉 Chuyển về trang chủ
  };

  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-blue-700">
        Hệ thống quản lý phòng khám
      </div>

      {/* 👉 Mũi tên đăng xuất nếu đã đăng nhập */}
      {user && (
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-blue-600 hover:text-red-800"
          title="Đăng xuất"
        >
          <LogOut size={20} />
          {/* <span className="hidden sm:inline text-sm">Đăng xuất</span> */}
        </button>
      )}
    </header>
  );
}


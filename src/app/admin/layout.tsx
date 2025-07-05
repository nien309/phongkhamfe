'use client';
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.loai_taikhoan !== 'admin' && user?.loai_taikhoan !== 'nhanvien') {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user?.loai_taikhoan !== 'admin' && user?.loai_taikhoan !== 'nhanvien') {
    // Show loading state while redirecting
    return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar bên trái */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Header bên trên */}
        <Header />

        {/* Nội dung chính */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
// src/app/admin/layout.tsx

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

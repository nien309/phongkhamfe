"use client";

import { Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow p-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-blue-700">Hệ thống quản lý phòng khám</div>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <UserCircle className="w-8 h-8 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
}

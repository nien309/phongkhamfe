"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CalendarDays, FileText, UserCog, Stethoscope, ClipboardList, FilePlus2, Receipt } from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Tài khoản", icon: UserCog, href: "/admin/tai-khoan" },
  { label: "Nhân viên", icon: Users, href: "/admin/nhan-vien" },
  { label: "Khách hàng", icon: Users, href: "/admin/khach-hang" },
  { label: "Lịch làm việc", icon: CalendarDays, href: "/admin/lich-lam-viec" },
  { label: "Khoa", icon: Stethoscope, href: "/admin/khoa" },
  { label: "Ca khám", icon: ClipboardList, href: "/admin/ca-kham" },
  { label: "Toa thuốc", icon: FilePlus2, href: "/admin/toa-thuoc" },
  { label: "Hóa đơn", icon: Receipt, href: "/admin/hoa-don" },
  { label: "Dịch vụ", icon: Receipt, href: "/admin/dich-vu" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Đông Dương Admin</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${
                isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`}>
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

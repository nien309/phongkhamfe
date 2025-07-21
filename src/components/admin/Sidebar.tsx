"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CalendarDays, FileText, UserCog, Stethoscope, ClipboardList, FilePlus2, Receipt } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Tài khoản", icon: UserCog, href: "/admin/tai-khoan", restrictedTo: ['bacsi', 'letan', 'thungan', 'kythuatvien', 'dieuduong', 'khachhang'] }, // restrictedTo: là khi điền actor vào những qly nào thì khi truy cập vào sẽ không hiện những cái đó
  { label: "Nhân viên", icon: Users, href: "/admin/nhan-vien", restrictedTo: ['bacsi', 'letan', 'thungan', 'kythuatvien', 'dieuduong', 'khachhang'] },
  { label: "Khách hàng", icon: Users, href: "/admin/khach-hang", restrictedTo: ['bacsi', 'thungan', 'kythuatvien', 'dieuduong', 'khachhang'] },
  { label: "Lịch làm việc", icon: CalendarDays, href: "/admin/lich-lam-viec", restrictedTo: ['khachhang ']},
  { label: "Lịch hẹn", icon: CalendarDays, href: "/admin/lich-hen", restrictedTo: ['thungan', 'kythuatvien', 'dieuduong', 'khachhang']},
  { label: "Duyệt lịch làm việc", icon: CalendarDays, href: "/admin/duyet-lich-lam-viec", restrictedTo: ['bacsi','letan', 'thungan', 'kythuatvien', 'dieuduong', 'khachhang' ] },
  { label: "Lịch đăng ký làm việc", icon: CalendarDays, href: "/admin/lich-dky-lamviec", restrictedTo: ['letan', 'thungan', 'kythuatvien', 'dieuduong', 'khachhang'] },
  { label: "Hồ sơ bệnh án", icon: FileText, href: "/admin/ho-so-benh-an", restrictedTo: ['thungan', 'kythuatvien', 'letan']},
  { label: "Tạo hồ sơ bệnh án", icon: FileText, href: "/admin/tao-ho-so-benh-an", restrictedTo: ['thungan', 'kythuatvien', 'bacsi']},
  { label: "Khoa", icon: Stethoscope, href: "/admin/khoa", restrictedTo: ['bacsi', 'letan', 'thungan', 'kythuatvien', 'dieuduong', 'khachhang'] },
  { label: "Ca khám", icon: ClipboardList, href: "/admin/ca-kham" ,restrictedTo: ['bacsi', 'letan', 'thungan', 'kythuatvien', 'dieuduong', 'khachhang']},
  { label: "Hóa đơn", icon: Receipt, href: "/admin/hoa-don", restrictedTo: ['bacsi', 'letan', 'kythuatvien', 'dieuduong', 'khachhang'] },
  { label: "Tạo hóa đơn", icon: Receipt, href: "/admin/tao-hoa-don", restrictedTo: ['bacsi', 'letan', 'kythuatvien', 'dieuduong', 'khachhang'] },
  { label: "Dịch vụ", icon: Receipt, href: "/admin/dich-vu", restrictedTo: ['bacsi', 'letan', 'thungan', 'kythuatvien', 'dieuduong', 'khachhang'] },
  { label: "Quản lý chỉ định", icon: Receipt, href: "/admin/chi-dinh", restrictedTo: ['letan', 'thungan', 'dieuduong', 'khachhang'] },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.restrictedTo) return true;
    if (!user?.nhanvien?.chucvu) return true;
    return !item.restrictedTo.includes(user.nhanvien.chucvu);
  });

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Đông Dương Admin</h1>
      <nav className="space-y-2">
        {filteredMenuItems.map((item) => {
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

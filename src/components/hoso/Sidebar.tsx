import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, FileText, CalendarDays, Receipt, Settings } from "lucide-react";

const menuItems = [
  { label: "Thông tin cá nhân", icon: User, href: "/ho-so" },
  { label: "Hồ sơ bệnh án", icon: FileText, href: "/ho-so/ho-so-benh-an" },
  { label: "Lịch hẹn", icon: CalendarDays, href: "/ho-so/lich-hen" },
//   { label: "Hóa đơn", icon: Receipt, href: "/ho-so/hoa-don" },
//   { label: "Cài đặt", icon: Settings, href: "/ho-so/cai-dat" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Hồ Sơ Cá Nhân</h1>
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

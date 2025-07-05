"use client"
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

// src/app/admin/page.tsx
// export const metadata = {
//     title: "Trang Quản trị | Phòng khám Đông Dương",
//     description: "Trang quản lý dành cho admin phòng khám Đông Dương.",
//   };
  
  export default function AdminDashboardPage() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Chào mừng đến với trang Quản trị</h1>
        <p className="mt-2 text-gray-600">
          Tại đây bạn có thể quản lý hệ thống phòng khám, bao gồm tài khoản, nhân viên, lịch làm việc, hóa đơn và nhiều nội dung khác.
        </p>
       <Button onClick={() => {
        toast.success("Hello");
       }}>
        Click me
       </Button>
      </div>
    );
  }
  
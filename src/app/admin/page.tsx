
"use client";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-700">Xin chào, Quản trị viên!</h1>
        <p className="mt-3 text-gray-700 text-base">
          Chào mừng bạn đến với hệ thống quản lý <strong>Phòng khám Đông Dương</strong>. <br />
          Hãy sử dụng thanh điều hướng bên trái để quản lý tài khoản, nhân viên, khách hàng, lịch làm việc, nhiều nội dung khác.
        </p>

        {/* <Button
          onClick={() => toast.success("Chúc bạn làm việc hiệu quả!")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          Bắt đầu quản lý
        </Button> */}
        
      </div>
    </div>
  );
}

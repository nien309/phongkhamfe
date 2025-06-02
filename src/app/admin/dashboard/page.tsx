"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  { name: "Khám tổng quát", value: 300 },
  { name: "Xét nghiệm", value: 200 },
  { name: "Chẩn đoán hình ảnh", value: 100 },
];

const barData = [
  { name: "Thứ 2", khách: 10 },
  { name: "Thứ 3", khách: 15 },
  { name: "Thứ 4", khách: 8 },
  { name: "Thứ 5", khách: 20 },
  { name: "Thứ 6", khách: 13 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Thống kê tổng quan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500">Khách hàng</p>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500">Lịch hẹn hôm nay</p>
          <p className="text-2xl font-bold">87</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500">Hóa đơn tháng này</p>
          <p className="text-2xl font-bold">5,620,000₫</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium mb-2">Tỷ lệ dịch vụ sử dụng</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium mb-2">Số lượt khám theo ngày</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="khách" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

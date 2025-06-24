"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type Employee = {
  id: number;
  name: string;
  phone: string;
  role: "Bác sĩ" | "Điều dưỡng" | "Kỹ thuật viên" | "Lễ tân" | "Thu ngân";
  department?: string;
  sex: "Nam" | "Nữ";
  email: string;
};

const DUMMY_EMPLOYEES: Employee[] = [
  { id: 1, name: "BS. Nguyễn Văn A", phone: "0901234567", role: "Bác sĩ", department: "Nội tổng quát", sex:"Nam", email:"a@gmail.com" },
  { id: 2, name: "DS. Trần Thị B", phone: "0912345678", role: "Điều dưỡng", department: "Khoa khám",sex:"Nữ", email:"b@gmail.com" },
  { id: 3, name: "KS. Lê Văn C", phone: "0923456789", role: "Kỹ thuật viên", department: "Xét nghiệm", sex:"Nam", email:"c@gmail.com" },
  { id: 4, name: "Nguyễn Thị D", phone: "0934567890", role: "Lễ tân", department: "Tiếp đón",sex:"Nữ", email:"d@gmail.com" },
  { id: 5, name: "Phạm Văn E", phone: "0945678901", role: "Thu ngân", department: "Tài chính", sex:"Nam", email:"e@gmail.com"},
];

export default function EmployeePage() {
  const [activeTab, setActiveTab] = useState<"Tất cả" | Employee["role"]>("Tất cả");
  const [modal, setModal] = useState<null | { type: string; employee?: Employee }>(null);

  const filteredEmployees =
    activeTab === "Tất cả"
      ? DUMMY_EMPLOYEES
      : DUMMY_EMPLOYEES.filter((emp) => emp.role === activeTab);

  const openModal = (type: string, employee?: Employee) => {
    setModal({ type, employee });
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
            
          {["Tất cả", "Bác sĩ", "Điều dưỡng", "Kỹ thuật viên", "Lễ tân", "Thu ngân"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => openModal("add")}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm nhân viên
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Tên</th>
              <th className="px-4 py-3 text-left">SĐT</th>
              <th className="px-4 py-3 text-left">Chức vụ</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có nhân viên nào.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="px-4 py-3">{emp.id}</td>
                  <td className="px-4 py-3">{emp.name}</td>
                  <td className="px-4 py-3">{emp.phone}</td>
                  <td className="px-4 py-3">{emp.role}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openModal("detail", emp)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => openModal("edit", emp)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => openModal("delete", emp)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* Detail */}
            {modal.type === "detail" && modal.employee && (
              <>
                <h2 className="text-xl font-semibold mb-4">Chi tiết nhân viên</h2>
                <div className="space-y-2 text-sm">
                  <p><strong>ID:</strong> {modal.employee.id}</p>
                  <p><strong>Tên:</strong> {modal.employee.name}</p>
                  <p><strong>SĐT:</strong> {modal.employee.phone}</p>
                  <p><strong>Chức vụ:</strong> {modal.employee.role}</p>
                  <p><strong>Khoa:</strong> {modal.employee.department ?? "Chưa cập nhật"}</p>
                  <p><strong>Giới tính:</strong> {modal.employee.sex}</p>
                  <p><strong>Email:</strong> {modal.employee.email}</p>
                  
                
                </div>
              </>
            )}

            {/* Add / Edit logic giống ví dụ của bạn, có thể tái sử dụng hoặc mở rộng thêm */}
            {modal.type === "add" && (
  <>
    <h2 className="text-xl font-semibold mb-4">Thêm tài khoản</h2>
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Đã thêm tài khoản (demo)");
        closeModal();
      }}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Tên</label>
        <input
          type="text"
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập tên"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">SĐT</label>
        <input
          type="tel"
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập sđt"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Giới tính</label>
        <select
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Chọn giới tính --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          
        
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Chức vụ</label>
        <select
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Chọn chức vụ --</option>
          <option value="bacsi">Bác sĩ</option>
          <option value="dieuduong">Điều dưỡng</option>
          <option value="ktv">Kỹ thuật viên</option>
          <option value="letan">Lễ tân</option>
          <option value="thungan">Thu ngân</option>
        
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ảnh đại diện</label>
        <input
            type="file"
            accept="image/*"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>

      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Lưu
        </button>
      </div>
    </form>
  </>
)}

{modal.type === "edit" && modal.employee && (
  <>
    <h2 className="text-xl font-semibold mb-4">Sửa tài khoản</h2>
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Đã cập nhật tài khoản (demo)");
        closeModal();
      }}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Tên</label>
        <input
          type="text"
          defaultValue={modal.employee.name}
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          defaultValue={modal.employee.email}
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Chức vụ</label>
        <select
          defaultValue={modal.employee.role}
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
         <option value="bacsi">Bác sĩ</option>
          <option value="dieuduong">Điều dưỡng</option>
          <option value="ktv">Kỹ thuật viên</option>
          <option value="letan">Lễ tân</option>
          <option value="thungan">Thu ngân</option>
        
        </select>
      </div>
      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Cập nhật
        </button>
      </div>
    </form>
  </>
)}

            {modal.type === "delete" && modal.employee && (
              <>
                <h2 className="text-xl font-semibold mb-4">Xoá tài khoản</h2>
                <p>Bạn có chắc chắn muốn xoá tài khoản <strong>{modal.employee.name}</strong>?</p>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => {
                      alert("Tài khoản đã bị xoá (demo)");
                      closeModal();
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Xoá
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type Department = {
  id: number;
  name: string;
  status: "Hoạt động" | "Ngừng hoạt động";
  createdAt: string;
};

const DUMMY_DEPARTMENTS: Department[] = [
  { 
    id: 1, 
    name: "Khoa Nội tổng quát", 
    status: "Hoạt động",
    createdAt: "15/03/2022"
  },
  { 
    id: 2, 
    name: "Khoa Ngoại", 
    status: "Hoạt động",
    createdAt: "20/04/2022"
  },
  { 
    id: 3, 
    name: "Khoa Sản", 
    status: "Ngừng hoạt động",
    createdAt: "05/05/2022"
  },
  { 
    id: 4, 
    name: "Khoa Nhi", 
    status: "Hoạt động",
    createdAt: "12/06/2022"
  },
  { 
    id: 5, 
    name: "Khoa Xét nghiệm", 
    status: "Ngừng hoạt động",
    createdAt: "22/07/2022"
  },
];

export default function DepartmentPage() {
  const [modal, setModal] = useState<null | { type: string; department?: Department }>(null);

  const openModal = (type: string, department?: Department) => {
    setModal({ type, department });
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý khoa</h1>
        
        <button
          onClick={() => openModal("add")}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm khoa
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Tên khoa</th>
              <th className="px-4 py-3 text-left">Trạng thái</th>
              <th className="px-4 py-3 text-left">Ngày tạo</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_DEPARTMENTS.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có khoa nào.
                </td>
              </tr>
            ) : (
              DUMMY_DEPARTMENTS.map((dept) => (
                <tr key={dept.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{dept.id}</td>
                  <td className="px-4 py-3 font-medium">{dept.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      dept.status === "Hoạt động" 
                        ? "bg-green-100 text-green-800" 
                        : dept.status === "Ngừng hoạt động" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {dept.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{dept.createdAt}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openModal("edit", dept)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => openModal("delete", dept)}
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

            {/* Add Modal */}
            {modal.type === "add" && (
              <>
                <h2 className="text-xl font-semibold mb-4">Thêm khoa mới</h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Đã thêm khoa mới (demo)");
                    closeModal();
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Tên khoa*</label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập tên khoa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Trạng thái*</label>
                    <select
                      required
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Chọn trạng thái --</option>
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                      <option value="Bảo trì">Bảo trì</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ngày tạo*</label>
                    <input
                      type="date"
                      required
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

            {/* Edit Modal */}
            {modal.type === "edit" && modal.department && (
              <>
                <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin khoa</h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Đã cập nhật thông tin khoa (demo)");
                    closeModal();
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">Tên khoa*</label>
                    <input
                      type="text"
                      defaultValue={modal.department.name}
                      required
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Trạng thái*</label>
                    <select
                      defaultValue={modal.department.status}
                      required
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                      <option value="Bảo trì">Bảo trì</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ngày tạo*</label>
                    <input
                      type="text"
                      defaultValue={modal.department.createdAt}
                      required
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
                      Cập nhật
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Delete Modal */}
            {modal.type === "delete" && modal.department && (
              <>
                <h2 className="text-xl font-semibold mb-4">Xóa khoa</h2>
                <p className="mb-4">
                  Bạn có chắc chắn muốn xóa khoa <strong>{modal.department.name}</strong>? Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => {
                      alert(`Đã xóa khoa ${modal.department?.name} (demo)`);
                      closeModal();
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Xác nhận xóa
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
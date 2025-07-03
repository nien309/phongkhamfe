"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { NhanVien } from "@/types/nhanvien";
import { nhanvienApi } from "@/lib/api/nhanvien";
import { toast } from "react-hot-toast";
import NhanVienFormDialog from "@/components/nhanvien/NhanVienFormDialog";

export default function EmployeePage() {
  const [activeTab, setActiveTab] = useState<"Tất cả" | string>("Tất cả");
  const [modal, setModal] = useState<null | { type: string; employee?: NhanVien }>(null);
  const [employees, setEmployees] = useState<NhanVien[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await nhanvienApi.getAll();
      setEmployees(data);
    } catch (error) {
      toast.error("Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await nhanvienApi.delete(id);
      toast.success("Xóa nhân viên thành công");
      fetchEmployees();
      setModal(null);
    } catch (error) {
      console.log(error)
      toast.error("Không thể xóa nhân viên");
    }
  };

  const filteredEmployees =
    activeTab === "Tất cả"
      ? employees
      : employees.filter((emp) => emp.chucvu === activeTab);

  const openModal = (type: string, employee?: NhanVien) => {
    setModal({ type, employee });
  };

  const closeModal = () => {
    setModal(null);
    fetchEmployees();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {["Tất cả", "Bác sĩ", "Điều dưỡng", "Kỹ thuật viên", "Lễ tân", "Thu ngân"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có nhân viên nào.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id_nhanvien} className="border-t">
                  <td className="px-4 py-3">{emp.id_nhanvien}</td>
                  <td className="px-4 py-3">{emp.taikhoan.hoten}</td>
                  <td className="px-4 py-3">{emp.taikhoan.sdt}</td>
                  <td className="px-4 py-3">{emp.chucvu}</td>
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

            {(modal.type === "add" || modal.type === "edit") && (
              <NhanVienFormDialog
                closeModal={closeModal}
                employee={modal.type === "edit" && modal.employee ? modal.employee : null}
              />
            )}

            {modal.type === "delete" && modal.employee && (
              <>
                <h2 className="text-xl font-semibold mb-4">Xoá nhân viên</h2>
                <p>
                  Bạn có chắc chắn muốn xoá nhân viên{" "}
                  <strong>{modal.employee.taikhoan.hoten}</strong>?
                </p>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleDelete(modal.employee?.id_nhanvien || 0)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Xoá
                  </button>
                </div>
              </>
            )}

            {modal.type === "detail" && modal.employee && (
              <>
                <h2 className="text-xl font-semibold mb-4">Chi tiết nhân viên</h2>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {modal.employee.id_nhanvien}</p>
                  <p><strong>Tên:</strong> {modal.employee.taikhoan.hoten}</p>
                  <p><strong>Email:</strong> {modal.employee.taikhoan.email}</p>
                  <p><strong>Giới tính:</strong> {modal.employee.taikhoan.gioitinh}</p>
                  <p><strong>Ngày sinh:</strong> {modal.employee.taikhoan.ngaysinh}</p>
                  <p><strong>Địa chỉ:</strong> {modal.employee.taikhoan.diachi}</p>
                  <p><strong>Số điện thoại:</strong> {modal.employee.taikhoan.sdt}</p>
                  <p><strong>Chức vụ:</strong> {modal.employee.chucvu}</p>
                  <p><strong>Lương:</strong> {modal.employee.luong.toLocaleString('vi-VN')} VNĐ</p>
                  <p><strong>Khoa:</strong> {modal.employee.id_khoa}</p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    {modal.employee.taikhoan.trangthai === "active" ? "Hoạt động" : "Không hoạt động"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

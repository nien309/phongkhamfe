"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Khoa } from "@/types/khoa";
import { khoaApi } from "@/lib/api/khoa";
import { toast } from "react-hot-toast";
import KhoaFormDialog from "@/components/khoa/KhoaFormDialog";

export default function DepartmentPage() {
  const [modal, setModal] = useState<null | { type: string; khoa?: Khoa }>(null);
  const [khoas, setKhoas] = useState<Khoa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKhoas();
  }, []);

  const fetchKhoas = async () => {
    try {
      const data = await khoaApi.getAll();
      setKhoas(data);
    } catch (error) {
      console.log(error)
      toast.error("Không thể tải danh sách khoa");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await khoaApi.delete(id);
      toast.success("Xóa khoa thành công");
      fetchKhoas();
      setModal(null);
    } catch (error) {
      console.log(error)
      toast.error("Không thể xoá khoa này vì vẫn còn nhân viên hoặc dịch vụ liên quan");
    }
  };

 
  

  const openModal = (type: string, khoa?: Khoa) => {
    setModal({ type, khoa });
  };

  const closeModal = () => {
    setModal(null);
    fetchKhoas();
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
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : khoas.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có khoa nào.
                </td>
              </tr>
            ) : (
              khoas.map((khoa) => (
                <tr key={khoa.id_khoa} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{khoa.id_khoa}</td>
                  <td className="px-4 py-3 font-medium">{khoa.tenkhoa}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      khoa.trangthai === "hoatdong"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {khoa.trangthai === "hoatdong" ? "Hoạt động" : "Tạm ngưng"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{new Date(khoa.created_at).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openModal("edit", khoa)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => openModal("delete", khoa)}
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
              <KhoaFormDialog 
                closeModal={closeModal} 
                khoa={modal.type === "edit" ? modal.khoa || null : null} 
              />
            )}

            {modal.type === "delete" && modal.khoa && (
              <>
                <h2 className="text-xl font-semibold mb-4">Xóa khoa</h2>
                <p className="mb-4">
                  Bạn có chắc chắn muốn xóa khoa <strong>{modal.khoa.tenkhoa}</strong>? Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleDelete(modal.khoa?.id_khoa || 0)}
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
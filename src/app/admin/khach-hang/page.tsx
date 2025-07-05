"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { KhachHang } from "@/types/khachhang";
import { khachhangApi } from "@/lib/api/khachhang";
import { toast } from "react-hot-toast";
import KhachHangFormDialog from "@/components/khachhang/KhachHangFormDialog";

export default function CustomerPage() {
  const [modal, setModal] = useState<null | { type: string; khachhang?: KhachHang }>(null);
  const [khachhangs, setKhachhangs] = useState<KhachHang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKhachhangs();
  }, []);

  const fetchKhachhangs = async () => {
    try {
      const data = await khachhangApi.getAll();
      setKhachhangs(data);
    } catch (error) {
      console.error("Error fetching khachhangs:", error);
      toast.error("Không thể tải danh sách khách hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await khachhangApi.delete(id);
      toast.success("Xóa khách hàng thành công");
      fetchKhachhangs();
      setModal(null);
    } catch (error) {
      console.error("Error deleting khachhang:", error);
      toast.error("Không thể xóa khách hàng");
    }
  };

  const openModal = (type: string, khachhang?: KhachHang) => {
    setModal({ type, khachhang });
  };

  const closeModal = () => {
    setModal(null);
    fetchKhachhangs();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quản lý khách hàng</h1>
        <button
          onClick={() => openModal("add")}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm khách hàng
        </button>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Tên</th>
              <th className="px-4 py-3 text-left">SĐT</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Nghề nghiệp</th>
              <th className="px-4 py-3 text-left">Trạng thái</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : khachhangs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Không có khách hàng nào.
                </td>
              </tr>
            ) : (
              khachhangs.map((kh) => (
                <tr key={kh.id_khachhang} className="border-t">
                  <td className="px-4 py-3">{kh.id_khachhang}</td>
                  <td className="px-4 py-3">{kh.taikhoan.hoten}</td>
                  <td className="px-4 py-3">{kh.taikhoan.sdt}</td>
                  <td className="px-4 py-3">{kh.taikhoan.email}</td>
                  <td className="px-4 py-3">{kh.nghenghiep}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        kh.taikhoan.trangthai === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {kh.taikhoan.trangthai === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openModal("detail", kh)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => openModal("edit", kh)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => openModal("delete", kh)}
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
              <KhachHangFormDialog
                closeModal={closeModal}
                khachhang={modal.type === "edit" && modal.khachhang ? modal.khachhang : null}
              />
            )}

            {modal.type === "delete" && modal.khachhang && (
              <>
                <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
                <p className="text-gray-700">
                  Bạn có chắc chắn muốn xóa khách hàng này không?
                </p>
                <div className="flex justify-end mt-6 space-x-3">
                <button
                    onClick={() => handleDelete(modal.khachhang?.id_khachhang || 0)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Có
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                  >
                    Không
                  </button>
                  
                </div>
              </>
            )}

            {modal.type === "detail" && modal.khachhang && (
              <>
                <h2 className="text-xl font-semibold mb-4">Chi tiết khách hàng</h2>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {modal.khachhang.id_khachhang}</p>
                  <p><strong>Tên:</strong> {modal.khachhang.taikhoan.hoten}</p>
                  <p><strong>Email:</strong> {modal.khachhang.taikhoan.email}</p>
                  <p><strong>Giới tính:</strong> {modal.khachhang.taikhoan.gioitinh}</p>
                  <p><strong>Ngày sinh:</strong> {modal.khachhang.taikhoan.ngaysinh}</p>
                  <p><strong>Địa chỉ:</strong> {modal.khachhang.taikhoan.diachi}</p>
                  <p><strong>Số điện thoại:</strong> {modal.khachhang.taikhoan.sdt}</p>
                  <p><strong>Nghề nghiệp:</strong> {modal.khachhang.nghenghiep}</p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        modal.khachhang.taikhoan.trangthai === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {modal.khachhang.taikhoan.trangthai === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
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

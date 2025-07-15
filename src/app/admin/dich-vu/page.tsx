"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { DichVu, DichVuResponse } from "@/types/dichvu";
import { dichVuApi } from "@/lib/api/dichvu";
import { toast } from "react-hot-toast";
import DichVuFormDialog from "@/components/dichvu/DichVuFormDialog";
import { khoaApi } from "@/lib/api/khoa";
import { Khoa } from "@/types/khoa";

export default function DichVuPage() {
  const [modal, setModal] = useState<null | { type: string; dichvu?: DichVu }>(null);
  const [dichvus, setDichVus] = useState<DichVu[]>([]);
  const [khoas, setKhoas] = useState<Khoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) { // Only trigger on pagination changes after initial load
      handlePaginationChange();
    }
  }, [currentPage, perPage]);

  const handlePaginationChange = async () => {
    setPaginationLoading(true);
    try {
      const dichvuData = await dichVuApi.getAll(currentPage, perPage);
      setDichVus(dichvuData.data);
      setTotalItems(dichvuData.total);
      setTotalPages(Math.ceil(dichvuData.total / dichvuData.per_page));
    } catch (error) {
      toast.error("Không thể tải danh sách dịch vụ");
    } finally {
      setPaginationLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dichvuData, khoaData] = await Promise.all([
        dichVuApi.getAll(currentPage, perPage),
        khoaApi.getAll()
      ]);
      setDichVus(dichvuData.data);
      setTotalItems(dichvuData.total);
      setTotalPages(Math.ceil(dichvuData.total / dichvuData.per_page));
      setKhoas(khoaData);
    } catch (error) {
      toast.error("Không thể tải danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(event.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDelete = async (id: number) => {
    try {
      await dichVuApi.delete(id);
      toast.success("Xóa dịch vụ thành công");
      fetchData();
      setModal(null);
    } catch (error) {
      toast.error("Không thể xóa dịch vụ");
    }
  };

  const getKhoaName = (id_khoa: number) => {
    return khoas.find(k => k.id_khoa === id_khoa)?.tenkhoa || "N/A";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const openModal = (type: string, dichvu?: DichVu) => {
    setModal({ type, dichvu });
  };

  const closeModal = () => {
    setModal(null);
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý dịch vụ</h1>
        
        <button
          onClick={() => openModal("add")}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm dịch vụ
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Tên dịch vụ</th>
              <th className="px-4 py-3 text-left">Đơn giá</th>
              <th className="px-4 py-3 text-left">Khoa</th>
              <th className="px-4 py-3 text-left">Trạng thái</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className={paginationLoading ? 'opacity-50' : ''}>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                    <span className="ml-2 text-gray-500">Đang tải...</span>
                  </div>
                </td>
              </tr>
            ) : dichvus.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Không có dịch vụ nào.
                </td>
              </tr>
            ) : (
              dichvus.map((dichvu) => (
                <tr key={dichvu.id_dichvu} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{dichvu.id_dichvu}</td>
                  <td className="px-4 py-3 font-medium">{dichvu.tendichvu}</td>
                  <td className="px-4 py-3">{formatCurrency(dichvu.dongia)}</td>
                  <td className="px-4 py-3">{getKhoaName(dichvu.id_khoa)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      dichvu.trangthai === "hoatdong"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {dichvu.trangthai === "hoatdong" ? "Hoạt động" : "Tạm ngưng"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openModal("edit", dichvu)}
                      className="text-yellow-500 hover:text-yellow-600"
                      disabled={paginationLoading}
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => openModal("delete", dichvu)}
                      className="text-red-500 hover:text-red-600"
                      disabled={paginationLoading}
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

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Hiển thị</span>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border rounded px-2 py-1 text-sm"
            disabled={paginationLoading}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-700">mục mỗi trang</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            {totalItems > 0 ? `${(currentPage - 1) * perPage + 1} - ${Math.min(currentPage * perPage, totalItems)} của ${totalItems}` : '0 kết quả'}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || paginationLoading}
              className={`p-2 rounded ${(currentPage === 1 || paginationLoading) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || paginationLoading}
              className={`p-2 rounded ${(currentPage === totalPages || paginationLoading) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {paginationLoading && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500 mr-2" />
          <span className="text-sm text-gray-600">Đang tải...</span>
        </div>
      )}

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
              <DichVuFormDialog 
                closeModal={closeModal} 
                dichvu={modal.type === "edit" ? modal.dichvu || null : null} 
              />
            )}

            {modal.type === "delete" && modal.dichvu && (
              <>
                <h2 className="text-xl font-semibold mb-4">Xóa dịch vụ</h2>
                <p className="mb-4">
                  Bạn có chắc chắn muốn xóa dịch vụ <strong>{modal.dichvu.tendichvu}</strong>? Hành động này không thể hoàn tác.
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleDelete(modal.dichvu?.id_dichvu || 0)}
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

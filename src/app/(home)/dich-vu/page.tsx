"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { DichVu, DichVuResponse } from "@/types/dichvu";
import { dichVuApi } from "@/lib/api/dichvu";
import { toast } from "react-hot-toast";
import { khoaApi } from "@/lib/api/khoa";
import { Khoa } from "@/types/khoa";

export default function DichVuPage() {
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
    if (!loading) {
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
    setCurrentPage(1);
  };

  const getKhoaName = (id_khoa: number) => {
    return khoas.find(k => k.id_khoa === id_khoa)?.tenkhoa || "N/A";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center">Danh Sách Dịch Vụ</h1>
        <p className="text-gray-600 text-center mt-2">
          Các dịch vụ y tế chất lượng cao tại phòng khám của chúng tôi
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Tên dịch vụ</th>
              <th className="px-4 py-3 text-left">Đơn giá</th>
              <th className="px-4 py-3 text-left">Khoa</th>
            </tr>
          </thead>
          <tbody className={paginationLoading ? 'opacity-50' : ''}>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                    <span className="ml-2 text-gray-500">Đang tải...</span>
                  </div>
                </td>
              </tr>
            ) : dichvus.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  Không có dịch vụ nào.
                </td>
              </tr>
            ) : (
              dichvus.map((dichvu) => (
                dichvu.trangthai === "hoatdong" && (
                  <tr key={dichvu.id_dichvu} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{dichvu.tendichvu}</td>
                    <td className="px-4 py-3">{formatCurrency(dichvu.dongia)}</td>
                    <td className="px-4 py-3">{getKhoaName(dichvu.id_khoa)}</td>
                  </tr>
                )
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
    </div>
  );
}

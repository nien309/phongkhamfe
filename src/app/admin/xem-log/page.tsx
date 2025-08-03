"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Log, LogResponse } from "@/types/log";
import { logApi } from "@/lib/api/log";
import { toast } from "react-hot-toast";
import { nhanvienApi } from "@/lib/api/nhanvien";
import { NhanVien } from "@/types/nhanvien";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LogPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [nhanviens, setNhanViens] = useState<NhanVien[]>([]);

  // Add state for filters
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    fetchNhanVien();
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [currentPage, perPage, selectedTable, fromDate, toDate, selectedUserId]);

  const fetchNhanVien = async () => {
    try {
      const data = await nhanvienApi.getAll();
      setNhanViens(data);
    } catch (error) {
      toast.error("Không thể tải danh sách nhân viên");
    }
  };

  const fetchData = async () => {
    setPaginationLoading(true);
    try {
      const logData = await logApi.getAllLog(
        selectedTable,
        fromDate,
        toDate,
        selectedUserId ? parseInt(selectedUserId) : 0,
        currentPage,
        perPage
      );
      setLogs(logData.data);
      setTotalItems(logData.total);
      setTotalPages(Math.ceil(logData.total / logData.per_page));
    } catch (error) {
      toast.error("Không thể tải danh sách log");
    } finally {
      setLoading(false);
      setPaginationLoading(false);
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

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Xem log hệ thống</h1>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bảng</label>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Tất cả</option>
            <option value="dich_vus">Dịch vụ</option>
            <option value="benhan">Bệnh án</option>
            <option value="cakham">Ca khám</option>
            <option value="chi_tiet_toa_thuoc">Chi tiết toa thuốc</option>
            <option value="chidinh">Chỉ định</option>
            <option value="hoadon">Hóa đơn</option>
            <option value="hosobenhan">Hồ sơ bệnh án</option>
            <option value="khach_hangs">Khách hàng</option>
            <option value="khoas">Khoa</option>
            <option value="lich_dang_ky_lam_viec">Lịch đăng ký làm việc</option>
            <option value="lich_lam_viec">Lịch làm việc</option>
            <option value="lichhen">Lịch hẹn</option>
            <option value="nhan_viens">Nhân viên</option>
            <option value="taikhoan">Tài khoản</option>
            <option value="thongtinkhambenh">Thông tin khám bệnh</option>
            <option value="toathuoc">Toa thuốc</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nhân viên</label>
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn nhân viên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Tất cả</SelectItem>
              {nhanviens.map((nv) => (
                <SelectItem key={nv.id_nhanvien} value={nv.taikhoan.id_taikhoan}>
                  {nv.taikhoan.hoten}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID Log</th>
              <th className="px-4 py-3 text-left">Tên người thực hiện</th>
              <th className="px-4 py-3 text-left">Hành động </th>
              <th className="px-4 py-3 text-left">Bảng thực hiện</th>
              <th className="px-4 py-3 text-left">Thời gian thực hiện</th>
            </tr>
          </thead>
          <tbody className={paginationLoading ? 'opacity-50' : ''}>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                    <span className="ml-2 text-gray-500">Đang tải...</span>
                  </div>
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Không có log nào.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id_log} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{log.id_log}</td>
                  <td className="px-4 py-3">{log.taikhoan.hoten}</td>
                  <td className="px-4 py-3">{log.tenhanhdong}</td>
                  <td className="px-4 py-3">{log.tenbangthuchien}</td>
                  <td className="px-4 py-3">{formatDateTime(log.thoigianthuchien)}</td>
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
    </div>
  );
}

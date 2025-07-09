"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react"; 
import TaiKhoanFormDialog from "@/components/taikhoan/TaiKhoanFormDialog";
import { User } from "@/types/user";
import { userApi } from "@/lib/api/user";
import { toast } from "react-hot-toast";
import TaiKhoanEditFormDialog from "@/components/taikhoan/TaiKhoanEditFormDialog";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"all" | "nhanvien" | "khachhang">("all");
  const [modal, setModal] = useState<null | { type: string; account?: User }>(null);
  const [accounts, setAccounts] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await userApi.getAll();
      setAccounts(data);
    } catch (error) {
      toast.error("Không thể tải danh sách tài khoản");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userApi.delete(id);
      toast.success("Xóa tài khoản thành công");
      fetchAccounts();
      setModal(null);
    } catch (error) {
      toast.error("Không thể xóa tài khoản");
    }
  };

  const filteredAccounts =
    activeTab === "all"
      ? accounts
      : accounts.filter((acc) => acc.loai_taikhoan === activeTab);
  const openModal = (type: string, account?: User) => {
    setModal({ type, account });
  };

  const closeModal = () => {
    setModal(null);
    fetchAccounts();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {[
            { label: "Tất cả", value: "all" },
            { label: "Nhân viên", value: "nhanvien" },
            { label: "Khách hàng", value: "khachhang" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* <button
          onClick={() => openModal("add")}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm transition"
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm
        </button> */}


      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Tên</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Loại</th>
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
            ) : filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có tài khoản nào.
                </td>
              </tr>
            ) : (
              filteredAccounts.map((acc) => (
                <tr key={acc.id_taikhoan} className="border-t">
                  <td className="px-4 py-3">{acc.id_taikhoan}</td>
                  <td className="px-4 py-3">{acc.hoten}</td>
                  <td className="px-4 py-3">{acc.email}</td>
                  <td className="px-4 py-3">
                    {acc.loai_taikhoan === "nhanvien" ? "Nhân viên" : "Khách hàng"}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => openModal("detail", acc)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => openModal("edit", acc)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => openModal("delete", acc)}
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

            {modal.type === "add" && (
              <TaiKhoanFormDialog closeModal={closeModal} account={null} />
            )}

            {modal.type === "edit" && modal.account && (
              <TaiKhoanEditFormDialog  account={modal.account} closeModal={closeModal} />
            )}

            {modal.type === "delete" && modal.account && (
              <>
                <h2 className="text-xl font-semibold mb-4">Xoá tài khoản</h2>
                <p>
                  Bạn có chắc chắn muốn xoá tài khoản{" "}
                  <strong>{modal.account.hoten}</strong>?
                </p>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleDelete(modal.account?.id_taikhoan || "")}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Xoá
                  </button>
                </div>
              </>
            )}

            {modal.type === "detail" && modal.account && (
              <>
                <h2 className="text-xl font-semibold mb-4">Chi tiết tài khoản</h2>
                <div className="space-y-2">
                  <p><strong>ID:</strong> {modal.account.id_taikhoan}</p>
                  <p><strong>Tên:</strong> {modal.account.hoten}</p>
                  <p><strong>Email:</strong> {modal.account.email}</p>
                  <p><strong>Giới tính:</strong> {modal.account.gioitinh}</p>
                  <p><strong>Ngày sinh:</strong> {modal.account.ngaysinh}</p>
                  <p><strong>Địa chỉ:</strong> {modal.account.diachi}</p>
                  <p><strong>Số điện thoại:</strong> {modal.account.sdt}</p>
                  <p>
                    <strong>Loại:</strong>{" "}
                    {modal.account.loai_taikhoan === "employee"
                      ? "Nhân viên"
                      : "Khách hàng"}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    {modal.account.trangthai === "active" ? "Hoạt động" : "Không hoạt động"}
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

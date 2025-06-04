"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react"; 

type Account = {
  id: number;
  name: string;
  email: string;
  type: "employee" | "customer";
};

const DUMMY_ACCOUNTS: Account[] = [
  { id: 1, name: "Nguyễn Văn A", email: "a@example.com", type: "employee" },
  { id: 2, name: "Trần Thị B", email: "b@example.com", type: "customer" },
  { id: 3, name: "Lê Văn C", email: "c@example.com", type: "employee" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"all" | "employee" | "customer">("all");
  const [modal, setModal] = useState<null | { type: string; account?: Account }>(null);

  const filteredAccounts =
    activeTab === "all"
      ? DUMMY_ACCOUNTS
      : DUMMY_ACCOUNTS.filter((acc) => acc.type === activeTab);

  const openModal = (type: string, account?: Account) => {
    setModal({ type, account });
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {[
            { label: "Tất cả", value: "all" },
            { label: "Nhân viên", value: "employee" },
            { label: "Khách hàng", value: "customer" },
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

        {/* Nút thêm */}
        <button
          onClick={() => openModal("add")}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm transition"
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm
        </button>
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
            {filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có tài khoản nào.
                </td>
              </tr>
            ) : (
              filteredAccounts.map((acc) => (
                <tr key={acc.id} className="border-t">
                  <td className="px-4 py-3">{acc.id}</td>
                  <td className="px-4 py-3">{acc.name}</td>
                  <td className="px-4 py-3">{acc.email}</td>
                  <td className="px-4 py-3">
                    {acc.type === "employee" ? "Nhân viên" : "Khách hàng"}
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
        <label className="block text-sm font-medium mb-1">Loại</label>
        <select
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Chọn loại --</option>
          <option value="employee">Nhân viên</option>
          <option value="customer">Khách hàng</option>
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
          Lưu
        </button>
      </div>
    </form>
  </>
)}

{modal.type === "edit" && modal.account && (
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
          defaultValue={modal.account.name}
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          defaultValue={modal.account.email}
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Loại</label>
        <select
          defaultValue={modal.account.type}
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="employee">Nhân viên</option>
          <option value="customer">Khách hàng</option>
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

            {modal.type === "delete" && modal.account && (
              <>
                <h2 className="text-xl font-semibold mb-4">Xoá tài khoản</h2>
                <p>Bạn có chắc chắn muốn xoá tài khoản <strong>{modal.account.name}</strong>?</p>
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

            {modal.type === "detail" && modal.account && (
              <>
                <h2 className="text-xl font-semibold mb-4">Chi tiết tài khoản</h2>
                <p><strong>ID:</strong> {modal.account.id}</p>
                <p><strong>Tên:</strong> {modal.account.name}</p>
                <p><strong>Email:</strong> {modal.account.email}</p>
                <p>
                  <strong>Loại:</strong>{" "}
                  {modal.account.type === "employee" ? "Nhân viên" : "Khách hàng"}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

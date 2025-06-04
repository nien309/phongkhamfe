"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

type Customer = {
  id: number;
  name: string;
  email: string;
};

type Treatment = {
  id: number;
  symptom: string;
  diagnosis: string;
  startDate: string;
  status: string;
  prescriptions?: string[];
};

type MedicalRecord = {
  id: number;
  diagnosis: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  treatments: Treatment[];
};

const DUMMY_CUSTOMERS: (Customer & { record: MedicalRecord })[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@abc.com",
    record: {
      id: 101,
      diagnosis: "Cảm cúm",
      createdAt: "2024-06-01",
      updatedAt: "2024-06-02",
      status: "Đang điều trị",
      treatments: [
        {
          id: 1,
          symptom: "Sốt, ho",
          diagnosis: "Cúm A",
          startDate: "2024-06-01",
          status: "Đang theo dõi",
          prescriptions: ["Xét nghiệm máu", "Chụp X-quang"]
        }
      ]
    }
  }
];

export default function CustomerPage() {
  const [modal, setModal] = useState<null | { type: string; customer: Customer & { record: MedicalRecord } }>(null);

  const openModal = (type: string, customer: Customer & { record: MedicalRecord }) => {
    setModal({ type, customer });
  };

  const closeModal = () => setModal(null);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => alert("Tính năng thêm khách hàng (demo)")}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
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
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_CUSTOMERS.map((cus) => (
              <tr key={cus.id} className="border-t">
                <td className="px-4 py-3">{cus.id}</td>
                <td className="px-4 py-3">{cus.name}</td>
                <td className="px-4 py-3">{cus.email}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => openModal("detail", cus)}
                    className="text-blue-600 hover:underline"
                  >
                    Xem hồ sơ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >✕</button>
            <h2 className="text-xl font-semibold mb-4">Hồ sơ bệnh án của {modal.customer.name}</h2>

            <div className="space-y-2 text-sm">
              <p><strong>ID hồ sơ:</strong> {modal.customer.record.id}</p>
              <p><strong>Chẩn đoán:</strong> {modal.customer.record.diagnosis}</p>
              <p><strong>Ngày tạo:</strong> {modal.customer.record.createdAt}</p>
              <p><strong>Ngày cập nhật:</strong> {modal.customer.record.updatedAt}</p>
              <p><strong>Trạng thái:</strong> {modal.customer.record.status}</p>
              <h3 className="font-medium mt-4">Các lần điều trị:</h3>
              {modal.customer.record.treatments.map((treat) => (
                <div key={treat.id} className="border p-3 rounded-md bg-gray-50">
                  <p><strong>ID:</strong> {treat.id}</p>
                  <p><strong>Triệu chứng:</strong> {treat.symptom}</p>
                  <p><strong>Chẩn đoán:</strong> {treat.diagnosis}</p>
                  <p><strong>Ngày bắt đầu:</strong> {treat.startDate}</p>
                  <p><strong>Trạng thái:</strong> {treat.status}</p>
                  {treat.prescriptions && (
                    <p><strong>Chỉ định:</strong> {treat.prescriptions.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

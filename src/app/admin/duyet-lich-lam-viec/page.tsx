"use client";

import { useEffect, useState } from "react";
import { DkLichLamViec } from "@/types/lichlamviec";
import { lichlamviecApi } from "@/lib/api/lichlamviec";
import { LichLamViecTable } from "@/components/lichlamviec/LichLamViecTable";

export default function DuyetLichLamViecPage() {
    const [data, setData] = useState<DkLichLamViec[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await lichlamviecApi.getAll();
            setData(response);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        try {
            await lichlamviecApi.updateDuyetLichLamViec(id, { trangthai: "đã duyệt" });
            fetchData();
        } catch (err) {
            console.error("Error approving:", err);
        }
    };

    const handleReject = async (id: number) => {
        try {
            await lichlamviecApi.updateDuyetLichLamViec(id, { trangthai: "từ chối" });
            fetchData();
        } catch (err) {
            console.error("Error rejecting:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-6 h-6 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-600 mb-4">{error}</div>
                <button
                    onClick={fetchData}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Duyệt lịch làm việc</h1>
            <div className="bg-white rounded-lg shadow">
                <LichLamViecTable
                    data={data}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { LichHenResponse } from "@/types/lichhen";
import { lichhenApi } from "@/lib/api/lichhen";
import { LichHenTable } from "@/components/lichhen/LichHenTable";

export default function LichHenPage() {
    const [data, setData] = useState<LichHenResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await lichhenApi.getAll();
            setData(response);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: number, trangthai: string): Promise<void> => {
        try {
            await lichhenApi.updateTrangThai(id, { trangthai });
            await fetchData(); // Refresh data after update
        } catch (err) {
            console.error("Error updating status:", err);
            throw err; // Propagate error to handle loading state in the table component
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
            <h1 className="text-2xl font-bold mb-6">Quản lý lịch hẹn</h1>
            <div className="bg-white rounded-lg shadow">
                <LichHenTable
                    data={data}
                    onUpdateStatus={handleUpdateStatus}
                />
            </div>
        </div>
    );
}

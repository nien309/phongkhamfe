"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LichLamViec } from "@/types/lichlamviec";
import { lichlamviecApi } from "@/lib/api/lichlamviec";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from 'lucide-react';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

interface Shift {
    id: number;
    ten: string;
}

const shifts: Shift[] = [
    { id: 1, ten: "Ca 1 - Sáng" },
    { id: 2, ten: "Ca 2 - Chiều" }
];

export default function LichLamViecDetailPage({ params }: PageProps) {
    const router = useRouter();
    const { id } = use(params);
    const [data, setData] = useState<LichLamViec | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        if (data?.thangnam) {
            const [month, year] = data.thangnam.split('-');
            const daysCount = new Date(parseInt(year), parseInt(month), 0).getDate();
            setDaysInMonth(Array.from({ length: daysCount }, (_, i) => i + 1));
        }
    }, [data?.thangnam]);

    const fetchData = async () => {
        try {
            const response = await lichlamviecApi.getById(Number(id));
            setData(response);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        try {
            await lichlamviecApi.updateDuyetLichLamViec(Number(id), { trangthai: "đã duyệt" });
            await fetchData();
        } catch (err) {
            console.error("Error approving:", err);
            setError("Có lỗi xảy ra khi duyệt lịch làm việc.");
        }
    };

    const handleReject = async () => {
        try {
            await lichlamviecApi.updateDuyetLichLamViec(Number(id), { trangthai: "từ chối" });
            await fetchData();
        } catch (err) {
            console.error("Error rejecting:", err);
            setError("Có lỗi xảy ra khi từ chối lịch làm việc.");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'chờ duyệt':
                return 'bg-yellow-100 text-yellow-800';
            case 'đã duyệt':
                return 'bg-green-100 text-green-800';
            case 'từ chối':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper function to check if a date has shifts registered
    const getRegisteredShifts = (day: number) => {
        if (!data?.thangnam) return null;
        const [month, year] = data.thangnam.split('-');
        const dateString = `${year}-${month.padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return data.thoigiandangky.find(item => item.ngay === dateString);
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
                <Button onClick={fetchData} variant="outline">
                    Thử lại
                </Button>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-gray-600 mb-4">Không tìm thấy dữ liệu</div>
                <Button onClick={() => router.back()} variant="outline">
                    Quay lại
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Chi tiết lịch làm việc</h1>
                <Button onClick={() => router.back()} variant="outline">
                    Quay lại
                </Button>
            </div>

            <div className="grid gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin nhân viên</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">Chức vụ</div>
                            <div>{data.nhanvien?.chucvu || "N/A"}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Khoa</div>
                            <div>{data.nhanvien?.khoa?.tenkhoa || "N/A"}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Tên nhân viên</div>
                            <div>{data.nhanvien?.taikhoan?.hoten || "N/A"}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="w-6 h-6" />
                            Lịch làm việc tháng {data.thangnam}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-2">
                            {daysInMonth.map(day => {
                                const registeredShifts = getRegisteredShifts(day);
                                return (
                                    <div 
                                        key={day} 
                                        className={`border rounded-lg p-2 ${
                                            registeredShifts ? 'bg-blue-50 border-blue-200' : ''
                                        }`}
                                    >
                                        <div className="font-medium mb-1">{day}</div>
                                        {registeredShifts && (
                                            <div className="space-y-1">
                                                {shifts.map(shift => (
                                                    registeredShifts.ca.includes(shift.id) && (
                                                        <div 
                                                            key={shift.id}
                                                            className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded"
                                                        >
                                                            {shift.ten}
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin đăng ký</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">Ngày đăng ký</div>
                            <div>{formatDate(data.created_at)}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Trạng thái</div>
                            <div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(data.trangthai)}`}>
                                    {data.trangthai}
                                </span>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="text-sm font-medium text-gray-500">Ghi chú</div>
                            <div>{data.ghichu || "-"}</div>
                        </div>
                    </CardContent>
                </Card>

                {data.trangthai.toLowerCase() === 'chờ duyệt' && (
                    <div className="flex justify-end space-x-4">
                        <Button
                            onClick={handleReject}
                            variant="outline"
                            className="bg-red-50 text-red-600 hover:bg-red-100"
                        >
                            Từ chối
                        </Button>
                        <Button
                            onClick={handleApprove}
                            variant="outline"
                            className="bg-green-50 text-green-600 hover:bg-green-100"
                        >
                            Duyệt
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

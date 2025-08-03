"use client";

import { useEffect, useState } from "react";
import { LichHenResponse } from "@/types/lichhen";
import { lichhenApi } from "@/lib/api/lichhen";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function LichHenCuaToiPage() {
    const [data, setData] = useState<LichHenResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await lichhenApi.getLichHenCuaToi();
            setData(response);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "cho_xac_nhan":
                return <Badge variant="default">Chờ xác nhận</Badge>;
            case "da_xac_nhan":
                return <Badge variant="success">Đã xác nhận</Badge>;
            case "da_huy":
                return <Badge variant="destructive">Đã hủy</Badge>;
            case "hoan_thanh":
                return <Badge variant="success">Hoàn thành</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
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
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Lịch hẹn của tôi</CardTitle>
                </CardHeader>
                <CardContent>
                    {data.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Bạn chưa có lịch hẹn nào
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ngày hẹn</TableHead>
                                    {/* <TableHead>Thời gian</TableHead> */}
                                    <TableHead>Bác sĩ</TableHead>
                                    <TableHead>Ghi chú</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((lichhen) => (
                                    <TableRow key={lichhen.id_lichhen}>
                                        <TableCell>
                                            {format(new Date(lichhen.ngayhen), "dd/MM/yyyy")}
                                        </TableCell>
                                        {/* <TableCell>
                                            {format(new Date(lichhen.ngayhen), "HH:mm")}
                                        </TableCell> */}
                                        <TableCell>
                                            {lichhen.nhanvien?.taikhoan.hoten || "Chưa phân công"}
                                        </TableCell>
                                        <TableCell>{lichhen.ghichu}</TableCell>
                                        <TableCell>
                                            {getStatusBadge(lichhen.trangthai)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

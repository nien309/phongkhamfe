"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DkLichLamViec } from "@/types/lichlamviec";
import Link from "next/link";

interface LichLamViecTableProps {
    data: DkLichLamViec[];
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
}

export function LichLamViecTable({ data, onApprove, onReject }: LichLamViecTableProps) {
    // Function to format date string
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    // Function to format ca (shift) array
    const formatCa = (ca: number[]) => {
        return ca.map(c => `Ca ${c}`).join(", ");
    };

    // Function to get status badge class
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

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tháng năm</TableHead>
                        <TableHead>Tên nhân viên</TableHead>
                        <TableHead>Chức vụ</TableHead>
                        <TableHead>Ngày đăng ký</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ghi chú</TableHead>
                        {(onApprove || onReject) && <TableHead>Thao tác</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id_dangky}>
                            <TableCell>{item.thangnam}</TableCell>
                            <TableCell>
                                {item.nhanvien?.taikhoan?.hoten || 'N/A'}
                            </TableCell>
                            <TableCell>{item.nhanvien?.chucvu || 'N/A'}</TableCell>
                            <TableCell>
                                {item.created_at ? formatDate(item.created_at) : 'N/A'}
                            </TableCell>
                          
                            <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(item.trangthai)}`}>
                                    {item.trangthai}
                                </span>
                            </TableCell>
                            <TableCell>{item.ghichu || '-'}</TableCell>
                            {(onApprove || onReject) && (
                                <TableCell>
                                    <div className="flex space-x-2">
                                        {onApprove && item.trangthai.toLowerCase() === 'chờ duyệt' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="bg-green-50 text-green-600 hover:bg-green-100"
                                                onClick={() => onApprove(item.id_dangky)}
                                            >
                                                Duyệt
                                            </Button>
                                        )}
                                        {onReject && item.trangthai.toLowerCase() === 'chờ duyệt' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="bg-red-50 text-red-600 hover:bg-red-100"
                                                onClick={() => onReject(item.id_dangky)}
                                            >
                                                Từ chối
                                            </Button>
                                        )}
                                        <Link href={`/admin/duyet-lich-lam-viec/${item.id_dangky}`}>
                                        <Button
                                                size="sm"
                                                variant="outline"
                                                className="bg-green-50 text-green-600 hover:bg-green-100"
                                            
                                            >
                                                Xem chi tiết
                                            </Button>
                                            </Link>
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

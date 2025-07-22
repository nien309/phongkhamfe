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
import { LichHenResponse } from "@/types/lichhen";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UpdateBookingDialog } from "./UpdateBookingDialog";

interface LichHenTableProps {
    data: LichHenResponse[];
    onUpdateStatus: (id: number, status: string) => Promise<void>;
}

export function LichHenTable({ data, onUpdateStatus }: LichHenTableProps) {
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    console.log(data);
    const {user} = useAuth();

    // Function to check if a date is today
    const isDateToday = (dateString: string) => {
        const today = new Date();
        const date = new Date(dateString);
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    // Function to format date string
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    // Function to get status badge class
    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'chờ xác nhận':
                return 'bg-yellow-100 text-yellow-800';
            case 'đã xác nhận':
                return 'bg-blue-100 text-blue-800';
            case 'chuyển đến bác sĩ':
                return 'bg-purple-100 text-purple-800';
            case 'chuyển đến lễ tân':
                return 'bg-indigo-100 text-indigo-800';
            case 'hoàn thành':
                return 'bg-green-100 text-green-800';
            case 'đã huỷ':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Function to handle status update with loading state
    const handleStatusUpdate = async (id: number, newStatus: string) => {
        const loadingKey = `${id}-${newStatus}`;
        setLoadingStates(prev => ({ ...prev, [loadingKey]: true }));
        
        try {
            await onUpdateStatus(id, newStatus);
        } finally {
            setLoadingStates(prev => ({ ...prev, [loadingKey]: false }));
        }
    };

    const handleOpenUpdateDialog = (id: number) => {
        setSelectedBookingId(id);
        setIsUpdateDialogOpen(true);
    };

    // Function to determine which action buttons to show based on current status
    const getActionButtons = (item: LichHenResponse) => {
        const currentStatus = item.trangthai || 'chờ xác nhận';
        
        switch (currentStatus.toLowerCase()) {
            case 'chờ xác nhận':
                return (
                    <>
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                            onClick={() => handleStatusUpdate(item.id_lichhen, 'đã xác nhận')}
                            disabled={loadingStates[`${item.id_lichhen}-đã xác nhận`]}
                        >
                            {loadingStates[`${item.id_lichhen}-đã xác nhận`] ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-t-2 border-b-2 border-blue-600 rounded-full animate-spin mr-2"></div>
                                    Đang xử lý...
                                </div>
                            ) : (
                                'Xác nhận'
                            )}
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-600 hover:bg-red-100"
                            onClick={() => handleStatusUpdate(item.id_lichhen, 'đã huỷ')}
                            disabled={loadingStates[`${item.id_lichhen}-đã huỷ`]}
                        >
                            {loadingStates[`${item.id_lichhen}-đã huỷ`] ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-t-2 border-b-2 border-red-600 rounded-full animate-spin mr-2"></div>
                                    Đang xử lý...
                                </div>
                            ) : (
                                'Huỷ'
                            )}
                        </Button>
                    </>
                );
            case 'đã xác nhận':
                return (
                    <Button
                        size="sm"
                        variant="outline"
                        className="bg-purple-50 text-purple-600 hover:bg-purple-100"
                        onClick={() => handleOpenUpdateDialog(item.id_lichhen)}
                        disabled={loadingStates[`${item.id_lichhen}-chuyển đến bác sĩ`] || user?.nhanvien?.chucvu !== 'letan' || !isDateToday(item.ngayhen)}
                    >
                        {loadingStates[`${item.id_lichhen}-chuyển đến bác sĩ`] ? (
                            <div className="flex items-center">
                                <div className="w-4 h-4 border-t-2 border-b-2 border-purple-600 rounded-full animate-spin mr-2"></div>
                                Đang xử lý...
                            </div>
                        ) : (
                            'Chuyển đến bác sĩ'
                        )}
                    </Button>
                );
            case 'chuyển đến bác sĩ':
                return (
                    <Button
                        size="sm"
                        variant="outline"
                        className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        onClick={() => handleStatusUpdate(item.id_lichhen, 'chuyển đến lễ tân')}
                        disabled={loadingStates[`${item.id_lichhen}-chuyển đến lễ tân`] || !isDateToday(item.ngayhen)}
                    >
                        {loadingStates[`${item.id_lichhen}-chuyển đến lễ tân`] ? (
                            <div className="flex items-center">
                                <div className="w-4 h-4 border-t-2 border-b-2 border-indigo-600 rounded-full animate-spin mr-2"></div>
                                Đang xử lý...
                            </div>
                        ) : (
                            'Chuyển đến lễ tân'
                        )}
                    </Button>
                );
            case 'chuyển đến lễ tân':
                return (
                    <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-50 text-green-600 hover:bg-green-100"
                        onClick={() => handleStatusUpdate(item.id_lichhen, 'hoàn thành')}
                        disabled={loadingStates[`${item.id_lichhen}-hoàn thành`] || !isDateToday(item.ngayhen)}
                    >
                        {loadingStates[`${item.id_lichhen}-hoàn thành`] ? (
                            <div className="flex items-center">
                                <div className="w-4 h-4 border-t-2 border-b-2 border-green-600 rounded-full animate-spin mr-2"></div>
                                Đang xử lý...
                            </div>
                        ) : (
                            'Hoàn thành'
                        )}
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ngày hẹn</TableHead>
                            <TableHead>Ca khám</TableHead>
                            <TableHead>Khách hàng</TableHead>
                            <TableHead>Bác sĩ</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Ghi chú</TableHead>
                            <TableHead>Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id_lichhen}>
                                <TableCell>{formatDate(item.ngayhen)}</TableCell>
                                <TableCell>{item.cakham.khunggio}</TableCell>
                                <TableCell>{item.khachhang?.taikhoan?.hoten || 'N/A'}</TableCell>
                                <TableCell>{item.nhanvien?.taikhoan?.hoten || 'Chưa chọn bác sĩ'}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(item.trangthai || 'chờ xác nhận')}`}>
                                        {item.trangthai || 'Chờ xác nhận'}
                                    </span>
                                </TableCell>
                                <TableCell>{item.ghichu || '-'}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        {getActionButtons(item)}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {selectedBookingId && (
                <UpdateBookingDialog
                    open={isUpdateDialogOpen}
                    onOpenChange={setIsUpdateDialogOpen}
                    bookingId={selectedBookingId}
                    currentBooking={data.find(item => item.id_lichhen === selectedBookingId)}
                    onSuccess={() => {
                        setSelectedBookingId(null);
                        // Refresh the data if needed
                        if (typeof window !== 'undefined') {
                            window.location.reload();
                        }
                    }}
                />
            )}
        </>
    );
}

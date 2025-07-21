"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { lichlamviecApi } from "@/lib/api/lichlamviec";
import { LichLamViec } from "@/types/lichlamviec";

interface Shift {
  id: number;
  ten: string;
}

const shifts: Shift[] = [
  { id: 1, ten: "Ca 1 - Sáng" },
  { id: 2, ten: "Ca 2 - Chiều" }
];

export default function LichLamViecPage() {
  const [data, setData] = useState<LichLamViec[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return format(now, "yyyy-MM");
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await lichlamviecApi.getLichLamViec();
      setData(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
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

  // Get days in selected month
  const getDaysInMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-').map(Number);
    return new Date(year, month, 0).getDate();
  };

  // Get registered shifts for a specific day
  const getRegisteredShifts = (lichlamviec: LichLamViec, day: number) => {
    const [year, month] = selectedMonth.split('-');
    const dateString = `${year}-${month.padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const thoigianlamviec = JSON.parse(lichlamviec.thoigianlamviec as string);
    return thoigianlamviec.find((item: any) => item.ngay === dateString);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10 text-center">
            <div className="flex justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Đang tải...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10 text-center">
            <div className="text-red-600 mb-4">{error}</div>
            <Button onClick={fetchData} variant="outline">
              Thử lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const daysInMonth = Array.from(
    { length: getDaysInMonth(selectedMonth) },
    (_, i) => i + 1
  );

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-6 h-6" />
                Lịch làm việc
              </CardTitle>
              {/* <Select
                value={selectedMonth}
                onValueChange={setSelectedMonth}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    {format(new Date(selectedMonth), "MMMM yyyy", { locale: vi })}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 1 }, (_, i) => {
                    const date = new Date();
                    date.setMonth(date.getMonth() - i);
                    const value = format(date, "yyyy-MM");
                    return (
                      <SelectItem key={value} value={value}>
                        {format(date, "MMMM yyyy", { locale: vi })}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select> */}
            </div>
          </CardHeader>
        </Card>
      </div>

      {data.map((lichlamviec) => (
        <Card key={lichlamviec.id_lichlamviec} className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {lichlamviec.nhanvien.chucvu} - ID: {lichlamviec.id_nhanvien}
              </CardTitle>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(lichlamviec.trangthai)}`}>
                {lichlamviec.trangthai}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map(day => {
                const registeredShifts = getRegisteredShifts(lichlamviec, day);
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

            {lichlamviec.lydothaydoi && (
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-500">Lý do thay đổi</div>
                <div className="text-sm">{lichlamviec.lydothaydoi}</div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

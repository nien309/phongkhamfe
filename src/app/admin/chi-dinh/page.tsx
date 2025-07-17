"use client"

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { chiDinhApi } from "@/lib/api/chidinh"
import { ChiDinh } from "@/types/chidinh"

export default function ChiDinhPage() {
  const [chiDinhs, setChiDinhs] = useState<ChiDinh[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  useEffect(() => {
    fetchChiDinh()
  }, [])

  const fetchChiDinh = async () => {
    try {
      setLoading(true)
      const result = await chiDinhApi.getAll()
      setChiDinhs(result)
    } catch (error: any) {
      toast.error(`Có lỗi xảy ra khi tải danh sách chỉ định: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      cho_thuc_hien: { label: "Chờ thực hiện", variant: "secondary" },
      dang_thuc_hien: { label: "Đang thực hiện", variant: "default" },
      hoan_thanh: { label: "Hoàn thành", variant: "outline" },
    }

    const config = statusConfig[status] || { label: status, variant: "outline" }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredChiDinh = selectedStatus === "all" 
    ? chiDinhs 
    : chiDinhs.filter(cd => cd.trangthai === selectedStatus)

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
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách chỉ định</CardTitle>
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="cho_thuc_hien">Chờ thực hiện</SelectItem>
                <SelectItem value="dang_thuc_hien">Đang thực hiện</SelectItem>
                <SelectItem value="hoan_thanh">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã chỉ định</TableHead>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Đơn giá</TableHead>
                  <TableHead>Ngày chỉ định</TableHead>
                  <TableHead>Ngày thực hiện</TableHead>
                  <TableHead>Kết quả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChiDinh.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                      Không có chỉ định nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredChiDinh.map((chiDinh) => (
                    <TableRow key={chiDinh.id_chidinh}>
                      <TableCell className="font-medium">CD{chiDinh.id_chidinh}</TableCell>
                      <TableCell>{chiDinh.dichvu.tendichvu}</TableCell>
                      <TableCell>{chiDinh.soluong}</TableCell>
                      <TableCell>{chiDinh.dongia.toLocaleString('vi-VN')} đ</TableCell>
                      <TableCell>{new Date(chiDinh.ngaychidinh).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>
                        {chiDinh.ngaythuchien 
                          ? new Date(chiDinh.ngaythuchien).toLocaleDateString('vi-VN')
                          : '-'
                        }
                      </TableCell>
                      <TableCell>{chiDinh.ketqua || '-'}</TableCell>
                      <TableCell>{getStatusBadge(chiDinh.trangthai)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

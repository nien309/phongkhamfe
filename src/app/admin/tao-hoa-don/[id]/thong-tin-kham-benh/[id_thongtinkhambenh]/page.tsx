"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { hoaDonApi } from "@/lib/api/hoadon"
import { ChiTietThongTinKhamBenh } from "@/types/hoadon"

export default function ThongTinKhamBenhDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [thongTinKham, setThongTinKham] = useState<ChiTietThongTinKhamBenh | null>(null)
  const [loading, setLoading] = useState(true)
  const [hinhThucThanhToan, setHinhThucThanhToan] = useState<string>("tien_mat")

  useEffect(() => {
    const fetchThongTinKham = async () => {
      try {
        const id_thongtinkhambenh = Number(params.id_thongtinkhambenh)
        const result = await hoaDonApi.getThongTinKhamBenhDetail(id_thongtinkhambenh)
        setThongTinKham(result)
      } catch (error: any) {
        toast.error(`Có lỗi xảy ra khi tải thông tin khám bệnh: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchThongTinKham()
  }, [params.id_thongtinkhambenh])

  const handleCreateHoaDon = async () => {
    try {
      await hoaDonApi.create({
        id_thongtinkhambenh: Number(params.id_thongtinkhambenh),
        hinhthucthanhtoan: hinhThucThanhToan
      })
      toast.success("Tạo hóa đơn thành công")
      router.push("/admin/hoa-don")
    } catch (error: any) {
      toast.error(`Có lỗi xảy ra khi tạo hóa đơn: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
      console.error(error)
    }
  }

  const calculateTotal = () => {
    if (!thongTinKham) return 0
    return thongTinKham.chidinh.reduce((total, item) => {
      return total + (item.dongia * item.soluong)
    }, 0)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10 text-center">
            Đang tải dữ liệu...
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!thongTinKham) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10 text-center">
            Không tìm thấy thông tin khám bệnh
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết khám bệnh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-medium">Ngày khám:</p>
              <p>{new Date(thongTinKham.ngaykham).toLocaleDateString('vi-VN')}</p>
            </div>
            <div>
              <p className="font-medium">Bác sĩ:</p>
              <p>{thongTinKham.bacsi}</p>
            </div>
          </div>

          <div className="rounded-md border mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Đơn giá</TableHead>
                  <TableHead>Thành tiền</TableHead>
                  <TableHead>Kết quả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {thongTinKham.chidinh.map((item) => (
                  <TableRow key={item.id_chidinh}>
                    <TableCell>{item.dichvu.tendichvu}</TableCell>
                    <TableCell>{item.soluong}</TableCell>
                    <TableCell>{item.dongia.toLocaleString('vi-VN')} đ</TableCell>
                    <TableCell>{(item.dongia * item.soluong).toLocaleString('vi-VN')} đ</TableCell>
                    <TableCell>{item.ketqua || '-'}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Tổng tiền:
                  </TableCell>
                  <TableCell colSpan={2} className="font-medium">
                    {calculateTotal().toLocaleString('vi-VN')} đ
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-medium mb-2">Hình thức thanh toán:</p>
              <Select
                value={hinhThucThanhToan}
                onValueChange={setHinhThucThanhToan}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tien_mat">Tiền mặt</SelectItem>
                  <SelectItem value="chuyen_khoan">Chuyển khoản</SelectItem>
                  <SelectItem value="vi_dien_tu">Ví điện tử</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              onClick={handleCreateHoaDon}
            >
              Tạo hóa đơn
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

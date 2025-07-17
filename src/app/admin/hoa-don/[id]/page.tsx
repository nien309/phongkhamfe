"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Loader2, Printer } from "lucide-react"

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
import { Button } from "@/components/ui/button"

import { hoaDonApi } from "@/lib/api/hoadon"
import { HoaDonDetail } from "@/types/hoadon"

export default function HoaDonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [hoaDon, setHoaDon] = useState<HoaDonDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchHoaDon = async () => {
      try {
        const id = Number(params.id)
        const result = await hoaDonApi.getById(id)
        setHoaDon(result)
      } catch (error: any) {
        toast.error(`Có lỗi xảy ra khi tải thông tin hóa đơn: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchHoaDon()
  }, [params.id])
  
  const handleThanhToan = async () => {
    try {
      await hoaDonApi.updateStatus(Number(params.id), {trangthai: "da_thanh_toan"})
      toast.success("Thanh toán thành công")
      router.push("/admin/hoa-don")
    } catch (error: any) {
      toast.error(`Có lỗi xảy ra khi thanh toán hóa đơn: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
      console.error(error)
    }
  }

  const handlePrint = () => {
    const printContent = document.createElement('div')
    if (printRef.current) {
      printContent.innerHTML = `
        <style>
          @media print {
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              font-family: Arial, sans-serif;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .info-section {
              margin-bottom: 20px;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .total {
              text-align: right;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
            }
          }
        </style>
        <div class="header">
          <h1>HÓA ĐƠN THANH TOÁN</h1>
          <p>Số hóa đơn: ${hoaDon?.id_hoadon}</p>
          <p>Ngày: ${new Date(hoaDon?.ngaytao || '').toLocaleDateString('vi-VN')}</p>
        </div>
        <div class="info-section">
          <h2>Thông tin thanh toán</h2>
          <div class="info-row">
            <span>Hình thức thanh toán:</span>
            <span>${getPaymentMethodLabel(hoaDon?.hinhthucthanhtoan || '')}</span>
          </div>
          <div class="info-row">
            <span>Trạng thái:</span>
            <span>${hoaDon?.trangthai === 'da_thanh_toan' ? 'Đã thanh toán' : 
                   hoaDon?.trangthai === 'cho_thanh_toan' ? 'Chờ thanh toán' : 'Đã hủy'}</span>
          </div>
        </div>
        ${printRef.current.innerHTML}
        <div class="footer">
          <p>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
        </div>
      `
      
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(printContent.innerHTML)
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 250)
      } else {
        toast.error('Không thể mở cửa sổ in. Vui lòng kiểm tra cài đặt trình duyệt.')
      }
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      da_thanh_toan: { label: "Đã thanh toán", variant: "default" },
      cho_thanh_toan: { label: "Chờ thanh toán", variant: "secondary" },
      da_huy: { label: "Đã hủy", variant: "destructive" },
    }

    const config = statusConfig[status] || { label: status, variant: "outline" }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPaymentMethodLabel = (method: string) => {
    const methodLabels: Record<string, string> = {
      tien_mat: "Tiền mặt",
      chuyen_khoan: "Chuyển khoản",
      the: "Thẻ",
    }
    return methodLabels[method] || method
  }

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

  if (!hoaDon) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10 text-center">
            Không tìm thấy thông tin hóa đơn
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Chi tiết hóa đơn #{hoaDon.id_hoadon}</CardTitle>
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Quay lại
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Thông tin hóa đơn */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông tin hóa đơn</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Trạng thái:</span>
                  <span>{getStatusBadge(hoaDon.trangthai)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ngày tạo:</span>
                  <span>{new Date(hoaDon.ngaytao).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hình thức thanh toán:</span>
                  <span>{getPaymentMethodLabel(hoaDon.hinhthucthanhtoan)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tổng tiền:</span>
                  <span className="font-semibold">{hoaDon.tongtien} đ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            {/* Chi tiết dịch vụ */}
            <div ref={printRef}>
              <h3 className="text-lg font-semibold mb-4">Chi tiết dịch vụ</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên dịch vụ</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Đơn giá</TableHead>
                      <TableHead>Thành tiền</TableHead>
                      <TableHead>Kết quả</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hoaDon.thongtinkhambenh.chidinh?.map((item) => (
                      <TableRow key={item.id_chidinh}>
                        <TableCell>{item.dichvu.tendichvu}</TableCell>
                        <TableCell>{item.soluong}</TableCell>
                        <TableCell>{item.dongia.toLocaleString('vi-VN')} đ</TableCell>
                        <TableCell>
                          {(item.dongia * item.soluong).toLocaleString('vi-VN', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })} đ
                        </TableCell>
                        <TableCell>{item.ketqua || '-'}</TableCell>
                        <TableCell>{item.trangthai}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {hoaDon.trangthai === "da_huy" && hoaDon.lydo_huy && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">Lý do hủy</h3>
              <p className="text-red-500">{hoaDon.lydo_huy}</p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {
                hoaDon.trangthai === "cho_thanh_toan" && (
                    <Button variant="destructive">
                        Hủy hóa đơn
                    </Button>
                )
            }
            {
                hoaDon.trangthai === "cho_thanh_toan" && (
                    <Button variant="success" onClick={handleThanhToan}>
                        Thanh toán
                    </Button>
                )
            }
            <Button 
              variant="default"
              onClick={handlePrint}
              className="gap-2"
            >
              <Printer className="h-4 w-4" />
              In hóa đơn
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

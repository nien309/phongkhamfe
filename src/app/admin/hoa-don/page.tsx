"use client"

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

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
import { HoaDon, HoaDonResponse } from "@/types/hoadon"

export default function HoaDonPage() {
  const [hoaDonData, setHoaDonData] = useState<HoaDon[]>([])
  const [loading, setLoading] = useState(true)
  const [paginationLoading, setPaginationLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!loading) {
      handlePaginationChange()
    }
  }, [currentPage])

  const handlePaginationChange = async () => {
    setPaginationLoading(true)
    try {
      const result = await hoaDonApi.getAll(currentPage)
      setHoaDonData(result.data)
      setTotalItems(result.total)
      setTotalPages(Math.ceil(result.total / result.per_page))
    } catch (error: any) {
      toast.error(`Có lỗi xảy ra khi tải danh sách hóa đơn: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
      console.error(error)
    } finally {
      setPaginationLoading(false)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await hoaDonApi.getAll(currentPage)
      setHoaDonData(result.data)
      setTotalItems(result.total)
      setTotalPages(Math.ceil(result.total / result.per_page))
    } catch (error: any) {
      toast.error(`Có lỗi xảy ra khi tải danh sách hóa đơn: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      da_thanh_toan: { label: "Đã thanh toán", variant: "default" },
      chua_thanh_toan: { label: "Chưa thanh toán", variant: "secondary" },
      da_huy: { label: "Đã hủy", variant: "destructive" },
    }

    const config = statusConfig[status] || { label: status, variant: "outline" }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPaymentMethodLabel = (method: string) => {
    const methodLabels: Record<string, string> = {
      tien_mat: "Tiền mặt",
      chuyen_khoan: "Chuyển khoản",
      vi_dien_tu: "Ví điện tử",
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

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Danh sách hóa đơn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã hóa đơn</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Hình thức thanh toán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className={paginationLoading ? 'opacity-50' : ''}>
                {hoaDonData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      Không có hóa đơn nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  hoaDonData.map((hoaDon) => (
                    <TableRow key={hoaDon.id_hoadon}>
                      <TableCell className="font-medium">{hoaDon.id_hoadon}</TableCell>
                      <TableCell>{new Date(hoaDon.ngaytao).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>{hoaDon.thongtinkhambenh.benhan.hosobenhan.khachhang.taikhoan.hoten}</TableCell>
                      <TableCell>{hoaDon.tongtien.toLocaleString('vi-VN')} đ</TableCell>
                      <TableCell>{getPaymentMethodLabel(hoaDon.hinhthucthanhtoan)}</TableCell>
                      <TableCell>{getStatusBadge(hoaDon.trangthai)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            router.push(`/admin/hoa-don/${hoaDon.id_hoadon}`)
                          }}
                          disabled={paginationLoading}
                        >
                          Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                {totalItems > 0 ? `${(currentPage - 1) * 10 + 1} - ${Math.min(currentPage * 10, totalItems)} của ${totalItems}` : '0 kết quả'}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || paginationLoading}
                  className={`p-2 rounded ${(currentPage === 1 || paginationLoading) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || paginationLoading}
                  className={`p-2 rounded ${(currentPage === totalPages || paginationLoading) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {paginationLoading && (
            <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">Đang tải...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

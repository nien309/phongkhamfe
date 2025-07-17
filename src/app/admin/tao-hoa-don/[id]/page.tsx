"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
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

import { hoaDonApi } from "@/lib/api/hoadon"
import { LichSuKham } from "@/types/hoadon"
import Link from "next/link"

export default function LichSuKhamPage() {
  const params = useParams()
  const [lichSuKham, setLichSuKham] = useState<LichSuKham[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLichSuKham = async () => {
      try {
        const id_khachhang = Number(params.id)
        const result = await hoaDonApi.getLichSuKhamByIdKhachHang(id_khachhang)
        setLichSuKham(result)
      } catch (error: any) {
        toast.error(`Có lỗi xảy ra khi tải lịch sử khám: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchLichSuKham()
  }, [params.id])

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

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử khám bệnh</CardTitle>
        </CardHeader>
        <CardContent>
          {lichSuKham.length === 0 ? (
            <div className="text-center py-6">
              Không có lịch sử khám bệnh nào chưa có hóa đơn
            </div>
          ) : (
            <>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ngày khám</TableHead>
                      <TableHead>Bác sĩ</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lichSuKham.map((lsk) => (
                      <TableRow key={lsk.id_thongtinkhambenh}>
                        <TableCell>
                          {new Date(lsk.ngaykham).toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell>{lsk.bacsi}</TableCell>
                        <TableCell className="text-right">
                            <Link href={`/admin/tao-hoa-don/${Number(params.id)}/thong-tin-kham-benh/${lsk.id_thongtinkhambenh}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            >
                              Chọn
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

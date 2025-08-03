"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { hosobenhanApi } from "@/lib/api/hosobenhan"
import { HosoBenhAn } from "@/types/hosobenhan"
import Link from "next/link"

export default function HoSoBenhAnCuaToiPage() {
  const [hoSoBenhAn, setHoSoBenhAn] = useState<HosoBenhAn | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHoSoBenhAn = async () => {
      try {
        const response = await hosobenhanApi.getHoSoBenhAnCuaToi()
        setHoSoBenhAn(response)
      } catch (error) {
        console.error("Error fetching medical record:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHoSoBenhAn()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!hoSoBenhAn) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy hồ sơ bệnh án</h2>
            <p className="text-gray-600">Bạn chưa có hồ sơ bệnh án nào.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Hồ sơ bệnh án của tôi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <h3 className="font-semibold">Thông tin bệnh nhân:</h3>
              <p>Họ tên: {hoSoBenhAn.khachhang.taikhoan.hoten}</p>
              <p>SĐT: {hoSoBenhAn.khachhang.taikhoan.sdt}</p>
              <p>Địa chỉ: {hoSoBenhAn.khachhang.taikhoan.diachi}</p>
              <p>Nghề nghiệp: {hoSoBenhAn.khachhang.nghenghiep}</p>
            </div> */}
            <div>
              <h3 className="font-semibold">Thông tin hồ sơ:</h3>
              <p>Mã hồ sơ: {hoSoBenhAn.id_hosobenhan}</p>
              <p>Trạng thái: {hoSoBenhAn.trangthai}</p>
              <p>Ngày tạo: {formatDate(hoSoBenhAn.created_at)}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-4">Lịch sử bệnh án:</h3>
            <Accordion type="single" collapsible className="w-full">
              {hoSoBenhAn.benhans.map((benhan, index) => (
                <AccordionItem key={benhan.id_benhan} value={`item-${index}`}>
                  <AccordionTrigger>
                    Bệnh án ngày {formatDate(benhan.ngaybatdau)}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 p-4">
                      <p><span className="font-medium">Chẩn đoán:</span> {benhan.chandoan}</p>
                      <p><span className="font-medium">Mô tả:</span> {benhan.mota}</p>
                      <p><span className="font-medium">Khoa:</span> {benhan.khoa.tenkhoa}</p>
                      <p><span className="font-medium">Bác sĩ:</span> {benhan.nhanvien.taikhoan.hoten}</p>
                      <Link href={`/ho-so/benh-an/${benhan.id_benhan}`}>
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

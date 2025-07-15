"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { hosobenhanApi } from "@/lib/api/hosobenhan"
import { HosoBenhAn } from "@/types/hosobenhan"

const searchSchema = z.object({
  sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
})

type SearchFormValues = z.infer<typeof searchSchema>

export default function HoSoBenhAnPage() {
  const [hoSoBenhAn, setHoSoBenhAn] = useState<HosoBenhAn | null>(null)
  const [loading, setLoading] = useState(false)

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      sdt: "",
    },
  })

  const onSubmit = async (data: SearchFormValues) => {
    try {
      setLoading(true)
      const response = await hosobenhanApi.findBySdt(data.sdt)
      console.log(response)
      setHoSoBenhAn(response)
    } catch (error) {
      console.error("Error fetching medical record:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Tìm Hồ Sơ Bệnh Án</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
              <FormField
                control={form.control}
                name="sdt"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-8" disabled={loading}>
                {loading ? "Đang tìm..." : "Tìm kiếm"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {hoSoBenhAn && (
        <Card>
          <CardHeader>
            <CardTitle>Thông tin hồ sơ bệnh án</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Thông tin bệnh nhân:</h3>
                <p>Họ tên: {hoSoBenhAn.khachhang.taikhoan.hoten}</p>
                <p>SĐT: {hoSoBenhAn.khachhang.taikhoan.sdt}</p>
                <p>Địa chỉ: {hoSoBenhAn.khachhang.taikhoan.diachi}</p>
                <p>Nghề nghiệp: {hoSoBenhAn.khachhang.nghenghiep}</p>
              </div>
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
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

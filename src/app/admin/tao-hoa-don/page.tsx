"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

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

import { hoaDonApi } from "@/lib/api/hoadon"
import { z } from "zod"
import { useState } from "react"
import { KhachHang } from "@/types/khachhang"

const searchKhachHangSchema = z.object({
  phone: z.string().min(1, "Vui lòng nhập số điện thoại"),
})

type SearchKhachHangFormValues = z.infer<typeof searchKhachHangSchema>

export default function TaoHoaDonPage() {
  const router = useRouter()
  const [khachHang, setKhachHang] = useState<KhachHang[] | null>(null)

  const form = useForm<SearchKhachHangFormValues>({
    resolver: zodResolver(searchKhachHangSchema),
    defaultValues: {
      phone: "",
    },
  })

  const onSubmit = async (data: SearchKhachHangFormValues) => {
    try {
      const result = await hoaDonApi.findKhachHangByPhone(data.phone)
      setKhachHang(result)
      console.log(result)
      toast.success("Tìm thấy khách hàng")
    } catch (error: any) {
      toast.error(`Không tìm thấy khách hàng: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
      setKhachHang(null)
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Tạo Hóa Đơn</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Tìm kiếm
              </Button>
            </form>
          </Form>

          {khachHang && khachHang.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Danh sách khách hàng</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Số điện thoại</TableHead>
                      <TableHead>Nghề nghiệp</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {khachHang.map((kh) => (
                      <TableRow key={kh.id_khachhang}>
                        <TableCell className="font-medium">{kh.taikhoan.hoten}</TableCell>
                        <TableCell>{kh.taikhoan.sdt}</TableCell>
                        <TableCell>{kh.nghenghiep}</TableCell>
                        <TableCell>{kh.taikhoan.email}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Handle creating invoice for this customer
                              router.push(`/admin/tao-hoa-don/${kh.id_khachhang}`)
                            }}
                          >
                            Xem lịch sử khám
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import React from 'react'
import { KhachHang } from '@/types/khachhang'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { khachhangSchema, KhachHangFormValues } from "@/lib/validations/khachhang"
import { khachhangApi } from "@/lib/api/khachhang"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-hot-toast"

export default function KhachHangFormDialog({
  closeModal,
  khachhang,
}: {
  closeModal: () => void
  khachhang: KhachHang | null
}) {
  const form = useForm<KhachHangFormValues>({
    resolver: zodResolver(khachhangSchema),
    defaultValues: {
      nghenghiep: khachhang?.nghenghiep || "",
      taikhoan: {
        hoten: khachhang?.taikhoan.hoten || "",
        email: khachhang?.taikhoan.email || "",
        gioitinh: khachhang?.taikhoan.gioitinh || "nam",
        matkhau: "",
        matkhau_confirmation: "",
        ngaysinh: khachhang?.taikhoan.ngaysinh || "",
        diachi: khachhang?.taikhoan.diachi || "",
        sdt: khachhang?.taikhoan.sdt || "",
        loai_taikhoan: "khachhang",
        trangthai: khachhang?.taikhoan.trangthai || "active",
        phan_quyen: "khachhang"
      }
    }
  })

  async function onSubmit(data: KhachHangFormValues) {
    try {
        console.log(data)
      if (khachhang) {
        // Omit password fields when updating
        const { taikhoan, ...updateData } = data;
        const { matkhau, matkhau_confirmation, ...updateTaikhoan } = taikhoan;
        await khachhangApi.update(khachhang.id_khachhang, {
          ...updateData,
          taikhoan: updateTaikhoan
        })
        toast.success("Cập nhật khách hàng thành công")
      } else {
        await khachhangApi.create(data)
        toast.success("Thêm khách hàng thành công")
      }
      closeModal()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Có lỗi xảy ra. Vui lòng thử lại")
    }
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        {khachhang ? "Sửa khách hàng" : "Thêm khách hàng"}
      </h2>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="taikhoan.hoten"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập họ tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taikhoan.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Nhập email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!khachhang && (
            <>
              <FormField
                control={form.control}
                name="taikhoan.matkhau"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taikhoan.matkhau_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="taikhoan.gioitinh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <Select value={field.value} onChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nam">Nam</SelectItem>
                      <SelectItem value="nữ">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taikhoan.ngaysinh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="taikhoan.diachi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập địa chỉ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="taikhoan.sdt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nghenghiep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nghề nghiệp</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập nghề nghiệp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="taikhoan.trangthai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
            >
              Hủy
            </Button>
            <Button type="submit">
              {khachhang ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
} 
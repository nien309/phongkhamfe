import React from 'react'
import { User } from '@/types/user'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema, UserFormValues, UserSchemaWithoutPassword, userSchemaWithoutPassword } from "@/lib/validations/user"
import { userApi } from "@/lib/api/user"
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

export default function TaiKhoanFormDialog({
  closeModal,
  account,
}: {
  closeModal: () => void
  account: User | null
}) {
    const form = useForm<UserSchemaWithoutPassword>({
    resolver: zodResolver(userSchemaWithoutPassword),
    defaultValues: {
      hoten: account?.hoten || "",
      email: account?.email || "",
      gioitinh: account?.gioitinh || "nam" as "nam" | "nữ",
      ngaysinh: account?.ngaysinh || "",
      diachi: account?.diachi || "",
      sdt: account?.sdt || "",
      loai_taikhoan: account?.loai_taikhoan || "khachhang",
      trangthai: account?.trangthai || "active",
      phan_quyen: account?.phan_quyen || "khachhang",
    }
  })
  async function onSubmit(data: UserSchemaWithoutPassword) {
    try {
      if (account) {
        await userApi.update(account.id_taikhoan, data)
        toast.success("Cập nhật tài khoản thành công")
      } 
      closeModal()
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại")
    }
  }

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        {account ? "Sửa tài khoản" : "Thêm tài khoản"}
      </h2>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="hoten"
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
            name="email"
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gioitinh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            name="ngaysinh"
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
            name="diachi"
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

          <FormField
            control={form.control}
            name="sdt"
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
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="loai_taikhoan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại tài khoản</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại tài khoản" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nhanvien">Nhân viên</SelectItem>
                    <SelectItem value="khachhang">Khách hàng</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
    <FormField
            control={form.control}
            name="phan_quyen"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phân quyền</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phân quyền" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nhanvien">Nhân viên</SelectItem>
                    <SelectItem value="khachhang">Khách hàng</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              )}
            />
             <FormField
            control={form.control}
            name="trangthai"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
            >
              Hủy
            </Button>
            <Button type="submit">
              {account ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
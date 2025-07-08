import React, { useEffect, useState } from 'react'
import { NhanVien } from '@/types/nhanvien'
import { Khoa } from '@/types/khoa'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { nhanvienSchema, NhanVienFormValues } from "@/lib/validations/nhanvien"
import { nhanvienApi } from "@/lib/api/nhanvien"
import { khoaApi } from "@/lib/api/khoa"
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

export default function NhanVienFormDialog({
  closeModal,
  employee,
}: {
  closeModal: () => void
  employee: NhanVien | null
}) {
  const [khoas, setKhoas] = useState<Khoa[]>([])

  useEffect(() => {
    const fetchKhoas = async () => {
      try {
        const data = await khoaApi.getAll()
        setKhoas(data)
    } catch (error) {
        console.error("Error fetching khoas:", error)
        toast.error("Không thể tải danh sách khoa")
    }
}
fetchKhoas()
}, [])
  const form = useForm<NhanVienFormValues>({
    resolver: zodResolver(nhanvienSchema),
    defaultValues: {
      chucvu: employee?.chucvu || "",
      luong: employee?.luong || 0,
      id_khoa: employee?.id_khoa || 1,
      taikhoan: {
        hoten: employee?.taikhoan.hoten || "",
        email: employee?.taikhoan.email || "",
        gioitinh: employee?.taikhoan.gioitinh || "nam",
        matkhau: "",
        matkhau_confirmation: "",
        ngaysinh: employee?.taikhoan.ngaysinh || "",
        diachi: employee?.taikhoan.diachi || "",
        sdt: employee?.taikhoan.sdt || "",
        loai_taikhoan: "nhanvien",
        trangthai: employee?.taikhoan.trangthai || "active",
        phan_quyen: employee?.taikhoan.phan_quyen || "nhanvien",
      }
    }
  })

  async function onSubmit(data: NhanVienFormValues) {
    try {
      if (employee) {
        // Omit password fields when updating
        const { taikhoan, ...updateData } = data;
        const { matkhau, matkhau_confirmation, ...updateTaikhoan } = taikhoan;
        await nhanvienApi.update(employee.id_nhanvien, {
          ...updateData,
          taikhoan: updateTaikhoan
        })
        toast.success("Cập nhật nhân viên thành công")
      } else {
        // Destructure for create case
        const { taikhoan, ...createData } = data;
        console.log({
            ...createData,
            ...taikhoan
          })
        await nhanvienApi.create({
          ...createData,
          taikhoan
        })
        toast.success("Thêm nhân viên thành công")
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
        {employee ? "Sửa nhân viên" : "Thêm nhân viên"}
      </h2>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
             {!employee && (
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
             )}
          {!employee && (
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
   {!employee && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="taikhoan.gioitinh"
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
   )}
      {!employee && (
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
          )}
             {!employee && (
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
          )}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="chucvu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chức vụ</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn chức vụ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bacsi">Bác sĩ</SelectItem>
                      <SelectItem value="dieuduong">Điều dưỡng</SelectItem>
                      <SelectItem value="kythuatvien">Kỹ thuật viên</SelectItem>
                      <SelectItem value="letan">Lễ tân</SelectItem>
                      <SelectItem value="thungan">Thu ngân</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="luong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lương</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Nhập lương"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id_khoa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khoa</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(Number(value))} 
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khoa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {khoas.map((khoa) => (
                      <SelectItem key={khoa.id_khoa} value={khoa.id_khoa.toString()}>
                        {khoa.tenkhoa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taikhoan.trangthai"
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
              {employee ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
} 
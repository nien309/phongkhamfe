import React, { useEffect, useState } from 'react'
import { DichVu } from '@/types/dichvu'
import { Khoa } from '@/types/khoa'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { dichVuSchema, DichVuFormValues } from "@/lib/validations/dichvu"
import { dichVuApi } from "@/lib/api/dichvu"
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

export default function DichVuFormDialog({
  closeModal,
  dichvu,
}: {
  closeModal: () => void
  dichvu: DichVu | null
}) {
  const [khoas, setKhoas] = useState<Khoa[]>([])

  const form = useForm<DichVuFormValues>({
    resolver: zodResolver(dichVuSchema),
    defaultValues: {
      tendichvu: dichvu?.tendichvu || "",
      dongia: dichvu?.dongia || 0,
      trangthai: dichvu?.trangthai || "hoatdong",
      id_khoa: dichvu?.id_khoa || 0,
    }
  })

  useEffect(() => {
    const fetchKhoas = async () => {
      try {
        const data = await khoaApi.getAll()
        setKhoas(data)
      } catch (error) {
        toast.error("Không thể tải danh sách khoa")
      }
    }
    fetchKhoas()
  }, [])

  async function onSubmit(data: DichVuFormValues) {
    try {
      if (dichvu) {
        await dichVuApi.update(dichvu.id_dichvu, data)
        toast.success("Cập nhật dịch vụ thành công")
      } else {
        await dichVuApi.create(data)
        toast.success("Thêm dịch vụ thành công")
      }
      closeModal()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Có lỗi xảy ra. Vui lòng thử lại")
    }
  }

  const onError = (errors: any) => {
    console.error("Form validation errors:", errors)
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        {dichvu ? "Sửa thông tin dịch vụ" : "Thêm dịch vụ mới"}
      </h2>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="tendichvu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên dịch vụ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên dịch vụ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dongia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đơn giá</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Nhập đơn giá" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      <SelectItem 
                        key={khoa.id_khoa} 
                        value={khoa.id_khoa.toString()}
                      >
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
                    <SelectItem value="hoatdong">Hoạt động</SelectItem>
                    <SelectItem value="tamngung">Tạm ngưng</SelectItem>
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
              {dichvu ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
} 
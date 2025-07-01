import React from 'react'
import { Khoa } from '@/types/khoa'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { khoaSchema, KhoaFormValues } from "@/lib/validations/khoa"
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

export default function KhoaFormDialog({
  closeModal,
  khoa,
}: {
  closeModal: () => void
  khoa: Khoa | null
}) {
  const form = useForm<KhoaFormValues>({
    resolver: zodResolver(khoaSchema),
    defaultValues: {
      tenkhoa: khoa?.tenkhoa || "",
      trangthai: khoa?.trangthai || "hoatdong",
    }
  })

  async function onSubmit(data: KhoaFormValues) {
    try {
      if (khoa) {
        await khoaApi.update(khoa.id_khoa, data)
        toast.success("Cập nhật khoa thành công")
      } else {
        await khoaApi.create(data)
        toast.success("Thêm khoa thành công")
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
        {khoa ? "Sửa thông tin khoa" : "Thêm khoa mới"}
      </h2>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="tenkhoa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khoa</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên khoa" {...field} />
                </FormControl>
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
                    <SelectItem value="tamngung">Không hoạt động</SelectItem>
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
              {khoa ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
} 
"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultipleImageUpload } from "@/components/ui/multiple-image-upload"

import { chiDinhApi } from "@/lib/api/chidinh"
import { ChiDinh } from "@/types/chidinh"
import { updateChiDinhSchema, UpdateChiDinhFormValues } from "@/lib/validations/chidinh"

interface ChiDinhUpdatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChiDinhUpdatePage({ params }: ChiDinhUpdatePageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [chiDinh, setChiDinh] = useState<ChiDinh | null>(null)

  const form = useForm<UpdateChiDinhFormValues>({
    resolver: zodResolver(updateChiDinhSchema),
    defaultValues: {
      ketqua: "",
      hinhanh: "",
      trangthai: "hoàn thành",
    },
  })

  useEffect(() => {
    const fetchChiDinh = async () => {
      try {
        setLoading(true)
        const data = await chiDinhApi.getById(Number(id))
        setChiDinh(data)
        
        // Set form default values
        form.reset({
          ketqua: data.ketqua || "",
          hinhanh: data.hinhanh || "",
          trangthai: "hoàn thành",
        })
      } catch (error: any) {
        toast.error(`Có lỗi xảy ra khi tải thông tin chỉ định: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchChiDinh()
  }, [id, form])

  const onSubmit = async (values: UpdateChiDinhFormValues) => {
    try {
      setSubmitting(true)
      await chiDinhApi.update(Number(id), values)
      toast.success("Cập nhật chỉ định thành công")
      router.push("/admin/chi-dinh")
      router.refresh()
    } catch (error: any) {
      toast.error(`Có lỗi xảy ra khi cập nhật chỉ định: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
      console.error(error)
    } finally {
      setSubmitting(false)
    }
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

  if (!chiDinh) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10 text-center">
            <div className="text-gray-500">Không tìm thấy chỉ định</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle>Cập nhật chỉ định</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm font-medium text-gray-500">Mã chỉ định</div>
              <div>{chiDinh.id_chidinh}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Dịch vụ</div>
              <div>{chiDinh.dichvu.tendichvu}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Số lượng</div>
              <div>{chiDinh.soluong}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Đơn giá</div>
              <div>{chiDinh.dongia.toLocaleString('vi-VN')} đ</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Ngày chỉ định</div>
              <div>{new Date(chiDinh.ngaychidinh).toLocaleDateString('vi-VN')}</div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="ketqua"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kết quả</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hinhanh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình ảnh</FormLabel>
                    <FormControl>
                      <MultipleImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        disabled={submitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

             {
                chiDinh.trangthai !== "hoàn thành" && (
                    <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={submitting}
                    >
                      Hủy
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Đang xử lý...</span>
                        </div>
                      ) : (
                        "Cập nhật"
                      )}
                    </Button>
                  </div>
                )
             }
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

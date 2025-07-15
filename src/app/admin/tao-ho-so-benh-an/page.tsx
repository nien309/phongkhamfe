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

import { createHoSoBenhAnSchema, type CreateHoSoBenhAnFormValues } from "@/lib/validations/hosobenhan"
import { hosobenhanApi } from "@/lib/api/hosobenhan"

export default function TaoHoSoBenhAnPage() {
  const router = useRouter()
  const form = useForm<CreateHoSoBenhAnFormValues>({
    resolver: zodResolver(createHoSoBenhAnSchema),
    defaultValues: {
      sdt: "",
    },
  })

  const onSubmit = async (data: CreateHoSoBenhAnFormValues) => {
    try {
      await hosobenhanApi.create(data)
      toast.success("Tạo hồ sơ bệnh án thành công")
    //   router.push("/admin/ho-so-benh-an")
      router.refresh()
    } catch (error: any) {
      toast.error(`Có lỗi xảy ra khi tạo hồ sơ bệnh án: ${error.response.data.message}`)
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Tạo Hồ Sơ Bệnh Án</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="sdt"
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
                Tạo hồ sơ
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

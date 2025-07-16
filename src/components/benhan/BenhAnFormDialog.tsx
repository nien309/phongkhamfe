"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"

import { createBenhAnSchema, type CreateBenhAnFormValues } from "@/lib/validations/benhan"
import { benhanApi } from "@/lib/api/benhan"
import { BenhAn } from "@/types/benhan"

interface BenhAnFormDialogProps {
  hoSoBenhAnId: number
  benhAn?: BenhAn
  onSuccess?: () => void
  trigger?: React.ReactNode
}

export function BenhAnFormDialog({
  hoSoBenhAnId,
  benhAn,
  onSuccess,
  trigger
}: BenhAnFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const isEditing = !!benhAn

  const form = useForm<CreateBenhAnFormValues>({
    resolver: zodResolver(createBenhAnSchema),
    defaultValues: {
      chandoan: "",
      mota: "",
      ngaybatdau: format(new Date(), "yyyy-MM-dd"),
      id_hosobenhan: hoSoBenhAnId
    }
  })

  useEffect(() => {
    if (benhAn) {
      form.reset({
        chandoan: benhAn.chandoan,
        mota: benhAn.mota,
        ngaybatdau: format(new Date(benhAn.ngaybatdau), "yyyy-MM-dd"),
        id_hosobenhan: benhAn.id_hosobenhan
      })
    }
  }, [benhAn, form])

  const onSubmit = async (data: CreateBenhAnFormValues) => {
    try {
      setLoading(true)
      if (isEditing && benhAn) {
        await benhanApi.update(benhAn.id_benhan, data)
      } else {
        await benhanApi.create(data)
      }
      setOpen(false)
      onSuccess?.()
      form.reset()
    } catch (error) {
      console.error("Error saving medical examination:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={isEditing ? "outline" : "default"}>
            {isEditing ? "Cập nhật bệnh án" : "Thêm bệnh án"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Cập nhật bệnh án" : "Thêm bệnh án mới"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="chandoan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chẩn đoán</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập chẩn đoán..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả chi tiết..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang lưu..." : isEditing ? "Cập nhật" : "Thêm mới"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

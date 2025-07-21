"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ThongTinKhamBenh } from "@/types/thongtinkhambenh";
import { createThongTinKhamBenhSchema, CreateThongTinKhamBenhFormValues } from "@/lib/validations/thongtinkhambenh";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface ThongTinKhamBenhFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: ThongTinKhamBenh;
  onSubmit: (data: CreateThongTinKhamBenhFormValues) => Promise<void>;
  id_benhan: number;
}

export function ThongTinKhamBenhFormDialog({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  id_benhan,
}: ThongTinKhamBenhFormDialogProps) {
  const [loading, setLoading] = useState(false);
  
  const form = useForm<CreateThongTinKhamBenhFormValues>({
    resolver: zodResolver(createThongTinKhamBenhSchema),
    defaultValues: {
      trieuchung: "",
      ngaykham: format(new Date(), "yyyy-MM-dd"),
      chandoan: "",
      trangthai: "dang_kham",
      id_benhan: id_benhan,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        trieuchung: defaultValues.trieuchung,
        ngaykham: format(new Date(defaultValues.ngaykham), "yyyy-MM-dd"),
        chandoan: defaultValues.chandoan,
        trangthai: defaultValues.trangthai,
        id_benhan: id_benhan,
      });
    }
  }, [defaultValues, form, id_benhan]);

  const handleSubmit = async (data: CreateThongTinKhamBenhFormValues) => {
    try {
      setLoading(true);
      await onSubmit(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Cập nhật thông tin khám bệnh" : "Thêm thông tin khám bệnh"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="trieuchung"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Triệu chứng</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập triệu chứng"
                      className="resize-none"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chandoan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chẩn đoán</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập chẩn đoán"
                      className="resize-none"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  defaultValues ? "Cập nhật" : "Thêm mới"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

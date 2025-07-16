import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { chiTietToaThuocApi } from "@/lib/api/toathuoc";
import { ChiTietToaThuocFormValues, chiTietToaThuocSchema } from "@/lib/validations/toathuoc";
import { ChiTietToaThuoc } from "@/types/toathuoc";

interface ChiTietThuocFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: ChiTietToaThuocFormValues) => void;
  id_toathuoc: number;
  defaultValues?: ChiTietToaThuoc;
}

export function ChiTietThuocFormDialog({
  open,
  onOpenChange,
  onSubmit,
  id_toathuoc,
  defaultValues,
}: ChiTietThuocFormDialogProps) {
  const form = useForm<ChiTietToaThuocFormValues>({
    resolver: zodResolver(chiTietToaThuocSchema),
    defaultValues: {
      id_toathuoc,
      ten: "",
      so_luong: 1,
      don_vi_tinh: "",
      cach_dung: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        id_toathuoc,
        ten: defaultValues.ten,
        so_luong: defaultValues.so_luong,
        don_vi_tinh: defaultValues.don_vi_tinh,
        cach_dung: defaultValues.cach_dung,
      });
    }
  }, [defaultValues, form, id_toathuoc]);

  const handleSubmit = async (data: ChiTietToaThuocFormValues) => {
    try {
      let result;
      if (defaultValues) {
        result = await chiTietToaThuocApi.update(defaultValues.id_chitiettoathuoc, data);
      } else {
        result = await chiTietToaThuocApi.create(data);
      }
      onSubmit?.(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to handle chi tiet toa thuoc:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Cập nhật thuốc" : "Thêm thuốc vào toa"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ten"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên thuốc</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên thuốc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="so_luong"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="don_vi_tinh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đơn vị tính</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập đơn vị tính" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cach_dung"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cách dùng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập cách dùng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit">
                {defaultValues ? "Cập nhật" : "Thêm mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

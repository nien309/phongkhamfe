import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchemaTaiKham, BookingFormSchemaTaiKham } from "@/lib/validations/lichhen";
import { lichhenApi } from "@/lib/api/lichhen";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface TaoLichTaiKhamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id_khachhang: number;
}

export function TaoLichTaiKhamDialog({ open, onOpenChange, id_khachhang }: TaoLichTaiKhamDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookingFormSchemaTaiKham>({
    resolver: zodResolver(bookingFormSchemaTaiKham),
    defaultValues: {
      id_khachhang: id_khachhang,
      id_cakham: 1,
      ngayhen: "",
      ghichu: "",
    },
  });

  const onSubmit = async (values: BookingFormSchemaTaiKham) => {
    try {
      setIsLoading(true);
      console.log(
        {
              ...values,
             id_khachhang: id_khachhang,
            }
      )
      await lichhenApi.createLichTaiKham({
        ...values,
        id_khachhang: id_khachhang,
      });
      toast.success("Tạo lịch tái khám thành công");
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi tạo lịch tái khám");
      console.error("Failed to create follow-up appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get tomorrow's date as the minimum date for the appointment
  const minDate = format(new Date(Date.now() + 24 * 60 * 60 * 1000), "yyyy-MM-dd");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo lịch tái khám</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ngayhen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày hẹn</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={minDate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_cakham"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ca khám</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn ca khám" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Ca sáng (8:00 - 12:00)</SelectItem>
                        <SelectItem value="2">Ca chiều (13:00 - 17:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ghichu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập ghi chú cho lịch tái khám"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Huỷ
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Đang xử lý...
                  </div>
                ) : (
                  "Tạo lịch hẹn"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

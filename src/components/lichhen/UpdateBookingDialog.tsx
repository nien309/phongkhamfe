import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBookingFormSchema, UpdateBookingFormValues } from "@/lib/validations/lichhen";
import { khoaApi } from "@/lib/api/khoa";
import { nhanvienApi } from "@/lib/api/nhanvien";
import { lichhenApi } from "@/lib/api/lichhen";
import { Khoa } from "@/types/khoa";
import { BacSi } from "@/types/bacsi";
import { LichHenResponse } from "@/types/lichhen";

interface UpdateBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: number;
  onSuccess: () => void;
  currentBooking?: LichHenResponse;
}

export function UpdateBookingDialog({ open, onOpenChange, bookingId, onSuccess, currentBooking }: UpdateBookingDialogProps) {
  const [khoas, setKhoas] = useState<Khoa[]>([]);
  const [bacsis, setBacsis] = useState<BacSi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingKhoas, setIsLoadingKhoas] = useState(false);
  const [isLoadingBacsis, setIsLoadingBacsis] = useState(false);

  const form = useForm<UpdateBookingFormValues>({
    resolver: zodResolver(updateBookingFormSchema),
    defaultValues: {
      id_khoa: currentBooking?.nhanvien?.id_khoa ? String(currentBooking.nhanvien.id_khoa) : "",
      id_nhanvien: currentBooking?.id_nhanvien ? String(currentBooking.id_nhanvien) : "",
    },
  });

  useEffect(() => {
    const loadKhoas = async () => {
      try {
        setIsLoadingKhoas(true);
        const data = await khoaApi.getAll();
        setKhoas(data);
      } catch (error) {
        console.error("Failed to load departments:", error);
      } finally {
        setIsLoadingKhoas(false);
      }
    };
    if (open) {
      loadKhoas();
    }
  }, [open]);

  // Load initial doctors if there's a selected department
  useEffect(() => {
    const loadInitialDoctors = async () => {
      const currentKhoaId = currentBooking?.nhanvien?.id_khoa;
      if (currentKhoaId) {
        try {
          setIsLoadingBacsis(true);
          const data = await nhanvienApi.getBacSiByKhoa(currentKhoaId);
          setBacsis(data);
          if(currentBooking){
            form.setValue("id_khoa", String(currentBooking.nhanvien.id_khoa));
            form.setValue("id_nhanvien", String(currentBooking.id_nhanvien));
          }else{
            form.setValue("id_khoa", "");
            form.setValue("id_nhanvien", "");
          }
        } catch (error) {
          console.error("Failed to load initial doctors:", error);
        } finally {
          setIsLoadingBacsis(false);
        }
      }
    };
    if (open && currentBooking?.nhanvien?.id_khoa) {
      loadInitialDoctors();
    }
  }, [open, currentBooking]);

  const handleKhoaChange = async (khoaId: string) => {
    try {
      setIsLoadingBacsis(true);
      const data = await nhanvienApi.getBacSiByKhoa(Number(khoaId));
      setBacsis(data);
      form.setValue("id_khoa", khoaId);
      form.setValue("id_nhanvien", ""); // Reset doctor selection
    } catch (error) {
      console.error("Failed to load doctors:", error);
    } finally {
      setIsLoadingBacsis(false);
    }
  };

  const onSubmit = async (values: UpdateBookingFormValues) => {
    try {
      setIsLoading(true);
      // Update booking information
      await lichhenApi.updateThongTin(bookingId, values);
      // Update booking status
      await lichhenApi.updateTrangThai(bookingId, { trangthai: "chuyển đến bác sĩ" });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chuyển bác sĩ khám bệnh</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id_khoa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khoa</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={handleKhoaChange}
                      value={field.value}
                      disabled={isLoadingKhoas}
                    >
                      <SelectTrigger>
                        {isLoadingKhoas ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-t-2 border-b-2 border-current rounded-full animate-spin mr-2"></div>
                            Đang tải...
                          </div>
                        ) : (
                          <SelectValue placeholder="Chọn khoa" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {khoas.map((khoa) => (
                          <SelectItem key={khoa.id_khoa} value={String(khoa.id_khoa)}>
                            {khoa.tenkhoa}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_nhanvien"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bác sĩ</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!form.watch("id_khoa") || isLoadingBacsis}
                    >
                      <SelectTrigger>
                        {isLoadingBacsis ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-t-2 border-b-2 border-current rounded-full animate-spin mr-2"></div>
                            Đang tải...
                          </div>
                        ) : (
                          <SelectValue placeholder="Chọn bác sĩ" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {bacsis.map((bacsi) => (
                          <SelectItem key={bacsi.id_nhanvien} value={String(bacsi.id_nhanvien)}>
                            {bacsi.taikhoan.hoten}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <Button type="submit" disabled={isLoading || isLoadingKhoas || isLoadingBacsis}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-t-2 border-b-2 border-current rounded-full animate-spin mr-2"></div>
                    Đang xử lý...
                  </div>
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 
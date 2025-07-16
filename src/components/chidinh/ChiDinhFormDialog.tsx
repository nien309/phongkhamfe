import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chiDinhApi } from "@/lib/api/chidinh";
import { dichVuApi } from "@/lib/api/dichvu";
import { ChiDinhFormValues, chiDinhSchema } from "@/lib/validations/chidinh";
import { ChiDinh } from "@/types/chidinh";
import { DichVu } from "@/types/dichvu";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface ChiDinhFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: ChiDinhFormValues) => void;
  id_thongtinkhambenh: number;
  defaultValues?: ChiDinh;
}

export function ChiDinhFormDialog({
  open,
  onOpenChange,
  onSubmit,
  id_thongtinkhambenh,
  defaultValues,
}: ChiDinhFormDialogProps) {
  const [dichVuList, setDichVuList] = useState<DichVu[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ChiDinhFormValues>({
    resolver: zodResolver(chiDinhSchema),
    defaultValues: {
      id_thongtinkhambenh,
      id_dichvu: 0,
      soluong: 1,
      ngaychidinh: format(new Date(), "yyyy-MM-dd"),
      dongia: 0,
    },
  });

  useEffect(() => {
    const fetchDichVu = async () => {
      try {
        setLoading(true);
        const response = await dichVuApi.getAll(1, 100);
        setDichVuList(response.data);
      } catch (error) {
        console.error("Failed to fetch dich vu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchDichVu();
    }
  }, [open]);

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        id_thongtinkhambenh,
        id_dichvu: Number(defaultValues.id_dichvu),
        soluong: Number(defaultValues.soluong),
        ngaychidinh: format(new Date(), "yyyy-MM-dd"),
        dongia: Number(defaultValues.dongia),
      });
    }
  }, [defaultValues, form, id_thongtinkhambenh]);

  // Handle setting dongia when dichvu is selected
  const handleDichVuChange = (value: string) => {
    const id_dichvu = Number(value);
    const selectedDichVu = dichVuList.find(dv => dv.id_dichvu === id_dichvu);
    if (selectedDichVu) {
      form.setValue("id_dichvu", id_dichvu, { shouldValidate: true });
      form.setValue("dongia", Number(selectedDichVu.dongia), { shouldValidate: true });
    }
  };

  const handleSubmit = async (data: ChiDinhFormValues) => {
    try {
      setSubmitting(true);
      let result;
      if (defaultValues) {
        result = await chiDinhApi.update(defaultValues.id_chidinh, data);
      } else {
        result = await chiDinhApi.create(data);
      }
      onSubmit?.(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to handle chi dinh:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Cập nhật chỉ định" : "Thêm chỉ định"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id_dichvu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dịch vụ</FormLabel>
                  <Select
                    onValueChange={handleDichVuChange}
                    defaultValue={field.value?.toString()}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Đang tải...</span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Chọn dịch vụ" />
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dichVuList.map((dichvu) => (
                        <SelectItem
                          key={dichvu.id_dichvu}
                          value={dichvu.id_dichvu.toString()}
                        >
                          {dichvu.tendichvu} - {dichvu.dongia.toLocaleString()}đ
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
              name="soluong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={loading}
                    />
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
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled
                      />
                    </div>
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
                disabled={submitting}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={submitting || loading}>
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Đang xử lý...</span>
                  </div>
                ) : defaultValues ? (
                  "Cập nhật"
                ) : (
                  "Thêm mới"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

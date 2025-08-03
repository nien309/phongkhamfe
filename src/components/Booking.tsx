'use client';

import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { khoaApi } from "@/lib/api/khoa";
import { nhanvienApi } from "@/lib/api/nhanvien";
import { lichhenApi } from "@/lib/api/lichhen";
import { Khoa } from "@/types/khoa";
import { NhanVien } from "@/types/nhanvien";
import { BookingFormValues, bookingFormSchema } from "@/lib/validations/lichhen";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "react-hot-toast";

export default function Booking() {
  const [khoas, setKhoas] = useState<Khoa[]>([]);
  const [doctors, setDoctors] = useState<NhanVien[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      id_khoa: "",
      id_nhanvien: "",
      id_cakham: 1,
      ngayhen: "",
      ghichu: "",
    },
  });

  const { watch } = form;
  const selectedKhoa = watch("id_khoa");
  const selectedCaKham = watch("id_cakham");
  const selectedDate = watch("ngayhen");

  useEffect(() => {
    const fetchKhoas = async () => {
      try {
        const data = await khoaApi.getAll();
        setKhoas(data);
      } catch (error) {
        console.error("Error fetching khoas:", error);
        toast.error("Không thể tải danh sách khoa");
      } finally {
        setLoading(false);
      }
    };

    fetchKhoas();
  }, []);

  // Fetch available doctors when department, shift or date changes
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!selectedKhoa || !selectedCaKham || !selectedDate) {
        setDoctors([]);
        return;
      }

      try {
        console.log(selectedKhoa, selectedCaKham, selectedDate);
        const data = await nhanvienApi.getBacSiDangRanh(
          parseInt(selectedKhoa),
          selectedCaKham,
          selectedDate
        );
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Không thể tải danh sách bác sĩ");
      }
    };

    fetchDoctors();
  }, [selectedKhoa, selectedCaKham, selectedDate]);

  const onSubmit = async (data: BookingFormValues) => {
    try {
      setSubmitting(true);
      await lichhenApi.create({
        id_nhanvien: parseInt(data.id_nhanvien),
        id_khoa: parseInt(data.id_khoa),
        id_cakham: data.id_cakham,
        ngayhen: data.ngayhen,
        ghichu: data.ghichu || "",
      });
      
      toast.success("Đặt lịch thành công");
      form.reset();
    } catch (error:any) {
      console.error("Error creating appointment:", error);
      toast.error(`Đặt lịch thất bại: ${error.response.data.error}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  return (
    <section className="max-w-3xl mx-auto bg-blue-800 p-6 rounded shadow mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-white text-center"></h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id_khoa"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Chọn chuyên khoa</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="-- Chọn chuyên khoa --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {khoas.map((khoa) => (
                      <SelectItem key={khoa.id_khoa} value={khoa.id_khoa.toString()}>
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
            name="ngayhen"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Chọn ngày khám</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="bg-white"
                    min={new Date().toISOString().split('T')[0]}
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
                <FormLabel className="text-white">Khung giờ muốn khám</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="-- Chọn ca khám --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Sáng 7:30 - 11:30 - Từ Thứ 2 - Thứ 7</SelectItem>
                    <SelectItem value="2">Chiều 13:00 - 17:30 - Từ Thứ 2 - Thứ 7</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="id_nhanvien"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Chọn bác sĩ</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="-- Chọn bác sĩ --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id_nhanvien} value={doctor.id_nhanvien.toString()}>
                        {doctor.taikhoan.hoten}
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
            name="ghichu"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel className="text-white">Ghi chú</FormLabel>
                <FormControl>
                  <Textarea 
                    className="bg-white" 
                    placeholder="Nhập ghi chú nếu cần..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 md:col-span-2 text-center mt-4">
            <Button 
              type="submit" 
              className="bg-white text-blue-800 hover:bg-gray-100"
              disabled={submitting}
            >
              {submitting ? "ĐANG XỬ LÝ..." : "ĐẶT LỊCH NGAY"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

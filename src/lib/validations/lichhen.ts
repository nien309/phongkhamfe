import * as z from "zod"

export const bookingFormSchemaTaiKham = z.object({
  id_cakham: z.number().min(1, "Vui lòng chọn ca khám"),
  id_khachhang: z.number().optional(),
  ngayhen: z.string().min(1, "Vui lòng chọn ngày khám"),
  ghichu: z.string().trim().min(1, "Vui lòng nhập ghi chú"),
})
export const bookingFormSchema = z.object({
  // id_khoa: z.string().min(1, "Vui lòng chọn khoa"),
  // id_nhanvien: z.string().min(1, "Vui lòng chọn bác sĩ"),
  id_khoa: z.string().optional(),
  id_nhanvien: z.string().optional(),
  id_cakham: z.number(),
  ngayhen: z.string().min(1, "Vui lòng chọn ngày khám"),
  ghichu: z.string().trim().min(1, "Vui lòng nhập ghi chú"),
})
export const updateBookingFormSchema = z.object({
  id_khoa: z.string().min(1, "Vui lòng chọn khoa"),
  id_nhanvien: z.string().min(1, "Vui lòng chọn bác sĩ"),
})
export type BookingFormSchemaTaiKham = z.infer<typeof bookingFormSchemaTaiKham>
export type BookingFormValues = z.infer<typeof bookingFormSchema>
export type UpdateBookingFormValues = z.infer<typeof updateBookingFormSchema>

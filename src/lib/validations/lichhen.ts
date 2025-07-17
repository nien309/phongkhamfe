import * as z from "zod"

export const bookingFormSchema = z.object({
  id_khoa: z.string().min(1, "Vui lòng chọn khoa"),
  id_nhanvien: z.string().min(1, "Vui lòng chọn bác sĩ"),
  id_cakham: z.number(),
  ngayhen: z.string().min(1, "Vui lòng chọn ngày khám"),
  ghichu: z.string().trim().min(1, "Vui lòng nhập ghi chú"),
})

export type BookingFormValues = z.infer<typeof bookingFormSchema>

import * as z from "zod"

export const dichVuSchema = z.object({
  tendichvu: z.string().min(1, "Tên dịch vụ không được để trống"),
  dongia: z.number().min(0, "Đơn giá không được âm"),
  trangthai: z.string().min(1, "Trạng thái không được để trống"),
  id_khoa: z.number().min(1, "Vui lòng chọn khoa")
})

export type DichVuFormValues = z.infer<typeof dichVuSchema>

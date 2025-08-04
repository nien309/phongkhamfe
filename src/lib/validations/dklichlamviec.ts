import * as z from "zod"

export const dklichlamviecSchema = z.object({
  thangnam: z.string().min(1, "Vui lòng chọn tháng"),
  // thangnam: z.date({
  //   required_error: "Vui lòng chọn tháng",
  //   invalid_type_error: "Giá trị không phải ngày tháng",
  // }),
  ghichu: z.string().optional().optional(),
  //ghichu: z.string().max(500, "Ghi chú quá dài").optional(),
})

export type DKLichLamViecFormValues = z.infer<typeof dklichlamviecSchema>

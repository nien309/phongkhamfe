import * as z from "zod"

export const khoaSchema = z.object({
  tenkhoa: z.string().min(1, "Tên khoa không được để trống"),
  trangthai: z.string().min(1, "Trạng thái không được để trống")
})

export type KhoaFormValues = z.infer<typeof khoaSchema>

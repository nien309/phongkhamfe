import * as z from "zod"

export const createHoSoBenhAnSchema = z.object({
    sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
})
// sdt: z.string()
//   .refine(val => /^\d+$/.test(val), "Chỉ được nhập số")
//   .length(10, "Yêu cầu đúng 10 số")
export type CreateHoSoBenhAnFormValues = z.infer<typeof createHoSoBenhAnSchema>
import * as z from "zod"

export const createHoSoBenhAnSchema = z.object({
    sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
})

export type CreateHoSoBenhAnFormValues = z.infer<typeof createHoSoBenhAnSchema>
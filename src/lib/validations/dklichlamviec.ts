import * as z from "zod"

export const dklichlamviecSchema = z.object({
  thangnam: z.string().min(1, "Vui lòng chọn tháng"),
  ghichu: z.string().optional().optional(),
})

export type DKLichLamViecFormValues = z.infer<typeof dklichlamviecSchema>

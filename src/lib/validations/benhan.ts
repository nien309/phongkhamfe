import * as z from "zod"

export const createBenhAnSchema = z.object({
    chandoan: z.string()
        .min(1, "Vui lòng nhập chẩn đoán")
        .max(500, "Chẩn đoán không được quá 500 ký tự"),
    mota: z.string()
        .min(1, "Vui lòng nhập mô tả")
        .max(1000, "Mô tả không được quá 1000 ký tự"),
    ngaybatdau: z.string()
        .min(1, "Vui lòng chọn ngày bắt đầu"),
    id_hosobenhan: z.number()
        .min(1, "ID hồ sơ bệnh án không hợp lệ")
})

export const updateBenhAnSchema = createBenhAnSchema.partial()

export type CreateBenhAnFormValues = z.infer<typeof createBenhAnSchema>
export type UpdateBenhAnFormValues = z.infer<typeof updateBenhAnSchema>

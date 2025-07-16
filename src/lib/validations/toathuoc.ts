import { z } from "zod"

export const chiTietToaThuocSchema = z.object({
    id_toathuoc: z.number(),
    ten: z.string().min(1, "Tên thuốc không được để trống"),
    so_luong: z.number().min(1, "Số lượng phải lớn hơn 0"),
    don_vi_tinh: z.string().min(1, "Đơn vị tính không được để trống"),
    cach_dung: z.string().min(1, "Cách dùng không được để trống"),
})

export const toaThuocSchema = z.object({
    id_thongtinkhambenh: z.number(),
    chandoan: z.string().min(1, "Chẩn đoán không được để trống"),
    ngaychandoan: z.string().min(1, "Ngày chẩn đoán không được để trống"),
})

export type CreateToaThuocFormValues = z.infer<typeof toaThuocSchema>
export type UpdateToaThuocFormValues = Partial<CreateToaThuocFormValues>
export type ChiTietToaThuocFormValues = z.infer<typeof chiTietToaThuocSchema>

export const createToaThuocSchema = toaThuocSchema
export const updateToaThuocSchema = toaThuocSchema.partial()

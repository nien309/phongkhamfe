import { z } from "zod"

export const chiDinhSchema = z.object({
    id_thongtinkhambenh: z.number(),
    id_dichvu: z.number(),
    soluong: z.number().min(1, "Số lượng phải lớn hơn 0"),
    ngaychidinh: z.string().min(1, "Ngày chỉ định không được để trống"),
    dongia: z.number().min(1, "Đơn giá phải lớn hơn 0"),
})
export const updatechiDinhSchema = z.object({
    ketqua: z.string().min(1, "Kết quả không được để trống"),
    hinhanh: z.string().min(1, "Hình ảnh không được để trống"),
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
})
export type ChiDinhFormValues = z.infer<typeof chiDinhSchema>
export type UpdateChiDinhFormValues = z.infer<typeof updatechiDinhSchema>

export const createChiDinhSchema = chiDinhSchema
export const updateChiDinhSchema = updatechiDinhSchema

import { z } from "zod"

export const chiDinhSchema = z.object({
    id_thongtinkhambenh: z.number(),
    id_dichvu: z.number(),
    soluong: z.number().min(1, "Số lượng phải lớn hơn 0"),
    ngaychidinh: z.string().min(1, "Ngày chỉ định không được để trống"),
    //ngaychidinh: z.string().datetime() (ktra đúng định dạng ngày tháng),
    dongia: z.number().min(1, "Đơn giá phải lớn hơn 0"), //lớn hơn 10.000 (10000, "đơn giá lớn hơn 10000"),
})
export const updatechiDinhSchema = z.object({ //xóa 1 trong 3 trường này thì cmt lại
    ketqua: z.string().min(1, "Kết quả không được để trống"),
    hinhanh: z.string().min(1, "Hình ảnh không được để trống"),
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
    //trạng thái enum
    // trangthai: z.enum(
    //     ["pending", "completed", "cancelled"], 
    //     { message: "Trạng thái không hợp lệ" }
    // )
    
    //validate Json
    // ketqua: z.string()
    // .refine(val => {
    //     try {
    //         JSON.parse(val)
    //         return true
    //     } catch {
    //         return false
    //     }
    // }, "Kết quả phải là JSON hợp lệ")
})
export type ChiDinhFormValues = z.infer<typeof chiDinhSchema>
export type UpdateChiDinhFormValues = z.infer<typeof updatechiDinhSchema>

export const createChiDinhSchema = chiDinhSchema
export const updateChiDinhSchema = updatechiDinhSchema

import * as z from "zod"

export const createBenhAnSchema = z.object({
    chandoan: z.string() //là chuỗi, độ dài 1-500 ký tự
        .min(1, "Vui lòng nhập chẩn đoán")
        .max(500, "Chẩn đoán không được quá 500 ký tự"),
    mota: z.string() //là chuỗi, độ dài 1-1000 ký tự
        .min(1, "Vui lòng nhập mô tả")
        .max(1000, "Mô tả không được quá 1000 ký tự"),
    ngaybatdau: z.string() //là chuỗi không rỗng, định dạng ngày hợp lệ
        .min(1, "Vui lòng chọn ngày bắt đầu"),
    id_hosobenhan: z.number() //là số nguyên, lớn hơn hoặc bằng 1
        .min(1, "ID hồ sơ bệnh án không hợp lệ")
})
//đổi ngaybatdau từ string sang Date:
//ngaybatdau: z:date(),
//id_hosobenhnhan có thể là string or number
//id_hosobenhan: z.union([z.number(), z.string()]) // Cho phép cả number và string
// .refine(val => {
//     if (typeof val === "string") return !isNaN(Number(val))
//     return val >= 1
// }, "ID hồ sơ bệnh án không hợp lệ")

export const updateBenhAnSchema = createBenhAnSchema.partial()

export type CreateBenhAnFormValues = z.infer<typeof createBenhAnSchema>
export type UpdateBenhAnFormValues = z.infer<typeof updateBenhAnSchema>

//ktra ngaybatdau ko lớn hơn ngày hiện tại và chandoan ko chứa ký tự đặc biệt
// export const createBenhAnSchema = z.object({
//     chandoan: z.string()
//         .min(1, "Vui lòng nhập chẩn đoán")
//         .max(500)
//         .refine(val => /^[a-zA-Z0-9\sÀ-ỹ]+$/.test(val), "Chẩn đoán không được chứa ký tự đặc biệt"),
//     ngaybatdau: z.string()
//         .min(1, "Vui lòng chọn ngày bắt đầu")
//         .refine(val => new Date(val) <= new Date(), "Ngày bắt đầu không được lớn hơn ngày hiện tại")
// })
import { z } from "zod"

const thongTinKhamBenhSchema = z.object({
    trieuchung: z.string().min(1, "Triệu chứng không được để trống"),
    ngaykham: z.string().min(1, "Ngày khám không được để trống"),
    chandoan: z.string().min(1, "Chẩn đoán không được để trống"),
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
    id_benhan: z.number().min(1, "ID bệnh án không được để trống")
})
const updateTTKhamBenhSchema = z.object({
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
})

export type CreateThongTinKhamBenhFormValues = z.infer<typeof thongTinKhamBenhSchema>
export type UpdateThongTinKhamBenhFormValues = z.infer<typeof updateTTKhamBenhSchema>

export const createThongTinKhamBenhSchema = thongTinKhamBenhSchema
export const updateThongTinKhamBenhSchema = updateTTKhamBenhSchema

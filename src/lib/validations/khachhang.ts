import * as z from "zod"

export const khachhangSchema = z.object({
  nghenghiep: z.string().min(1, "Nghề nghiệp không được để trống"),
  taikhoan: z.object({
    hoten: z.string().min(1, "Họ tên không được để trống"),
    matkhau: z.string().optional(),
    matkhau_confirmation: z.string().optional(),
    gioitinh: z.string().min(1, "Giới tính không được để trống"),
    // gioitinh: z.enum(["Nam", "Nữ", "Khác"], {
    //   errorMap: () => ({ message: "Vui lòng chọn giới tính hợp lệ" })
    // })
    ngaysinh: z.string(),
    diachi: z.string().min(1, "Địa chỉ không được để trống"),
    sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
  //   sdt: z.string()
  // .regex(/^(0|\+84)[1-9][0-9]{8}$/, "Số điện thoại không hợp lệ")
    email: z.string().email("Email không hợp lệ"),
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
    loai_taikhoan: z.literal("khachhang"),
    phan_quyen: z.literal("khachhang")
  })
})

export const khachhangSchemaWithoutPassword = z.object({
  nghenghiep: z.string().min(1, "Nghề nghiệp không được để trống"),
  taikhoan: z.object({
    hoten: z.string().min(1, "Họ tên không được để trống"),
    gioitinh: z.string().min(1, "Giới tính không được để trống"),
    ngaysinh: z.string(),
    diachi: z.string().min(1, "Địa chỉ không được để trống"),
    sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ"),
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
    loai_taikhoan: z.literal("khachhang"),
    phan_quyen: z.literal("khachhang")
  })
})

export type KhachHangFormValues = z.infer<typeof khachhangSchema>
export type KhachHangSchemaWithoutPassword = z.infer<typeof khachhangSchemaWithoutPassword>

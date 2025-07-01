import * as z from "zod"

export const userSchema = z.object({
  hoten: z.string().min(1, "Họ tên không được để trống"),
  matkhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").optional(),
  matkhau_confirmation: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").optional(),
  gioitinh: z.string().min(1, "Giới tính không được để trống"),
  ngaysinh: z.string(),
  diachi: z.string().min(1, "Địa chỉ không được để trống"),
  sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  trangthai: z.string().min(1, "Trạng thái không được để trống"),
  loai_taikhoan: z.string().min(1, "Loại tài khoản không được để trống"),
  phan_quyen: z.string().optional()
}).refine((data) => {
  if (data.matkhau || data.matkhau_confirmation) {
    return data.matkhau === data.matkhau_confirmation;
  }
  return true;
}, {
  message: "Mật khẩu không khớp",
  path: ["matkhau_confirmation"]
})
export const userSchemaWithoutPassword = z.object({
    hoten: z.string().min(1, "Họ tên không được để trống"),
    gioitinh: z.string().min(1, "Giới tính không được để trống"),
    ngaysinh: z.string(),
    diachi: z.string().min(1, "Địa chỉ không được để trống"),
    sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ"),
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
    loai_taikhoan: z.string().min(1, "Loại tài khoản không được để trống"),
    phan_quyen: z.string().optional()
  })
export type UserSchemaWithoutPassword = z.infer<typeof userSchemaWithoutPassword>
export type UserFormValues = z.infer<typeof userSchema> 
import * as z from "zod"

export const userSchema = z.object({
  hoten: z.string().min(1, "Họ tên không được để trống"),
  matkhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").optional(),
  matkhau_confirmation: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").optional(),
  gioitinh: z.string().min(1, "Giới tính không được để trống"),
//   ngaysinh: z.string(),
//   ngaysinh: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh phải có định dạng YYYY-MM-DD")
// .refine(date => new Date(date) < new Date(), "Ngày sinh phải ở quá khứ")
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
  message: "Mật khẩu xác nhận không khớp",
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

export const registerSchema = z.object({
  hoten: z.string().min(1, "Họ tên không được để trống"),
  matkhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  matkhau_confirmation: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
  gioitinh: z.string().min(1, "Giới tính không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  ngaysinh: z.string(),
  nghenghiep: z.string().min(1, "Nghe nghiệp không được để trống"),
  diachi: z.string().min(1, "Địa chỉ không được để trống"),
  // .refine(data => {
  //   const birthDate = new Date(data.ngaysinh);
  //   const ageDiff = Date.now() - birthDate.getTime();
  //   const ageDate = new Date(ageDiff);
  //   return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
  // }, {
  //   message: "Người dùng phải đủ 18 tuổi",
  //   path: ["ngaysinh"]
  // })
}).refine((data) => {
  // matkhau: z.string()
  // .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  // .regex(/[A-Z]/, "Phải chứa ít nhất 1 chữ hoa")
  // .regex(/[0-9]/, "Phải chứa ít nhất 1 số")
  // .regex(/[^A-Za-z0-9]/, "Phải chứa ít nhất 1 ký tự đặc biệt")
  if (data.matkhau || data.matkhau_confirmation) {
    return data.matkhau === data.matkhau_confirmation;
  }
 
  return true;
}, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["matkhau_confirmation"]
})
export type UserSchemaWithoutPassword = z.infer<typeof userSchemaWithoutPassword>
export type UserFormValues = z.infer<typeof userSchema> 
export type RegisterFormValues = z.infer<typeof registerSchema>

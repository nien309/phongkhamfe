import * as z from "zod"

export const nhanvienSchema = z.object({
  chucvu: z.string().min(1, "Chức vụ không được để trống"),
  luong: z.number().min(0, "Lương không được âm"),
  id_khoa: z.number().min(1, "Khoa không được để trống"),
  taikhoan: z.object({
    hoten: z.string().min(1, "Họ tên không được để trống"),
    matkhau: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").optional(),
    matkhau_confirmation: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").optional(),
    gioitinh: z.string().min(1, "Giới tính không được để trống"),
    ngaysinh: z.string(),
    diachi: z.string().min(1, "Địa chỉ không được để trống"),
    sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ"),
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
    loai_taikhoan: z.literal("nhanvien"),
    phan_quyen: z.string().min(1, "Phân quyền không được để trống")
  }).refine((data) => {
    if (data.matkhau || data.matkhau_confirmation) {
      return data.matkhau === data.matkhau_confirmation;
    }
    return true;
  }, {
    message: "Mật khẩu không khớp",
    path: ["matkhau_confirmation"]
  })
})

export const nhanvienSchemaWithoutPassword = z.object({
  chucvu: z.string().min(1, "Chức vụ không được để trống"),
  luong: z.number().min(0, "Lương không được âm"),
  id_khoa: z.number().min(1, "Khoa không được để trống"),
  taikhoan: z.object({
    hoten: z.string().min(1, "Họ tên không được để trống"),
    gioitinh: z.string().min(1, "Giới tính không được để trống"),
    ngaysinh: z.string(),
    diachi: z.string().min(1, "Địa chỉ không được để trống"),
    sdt: z.string().min(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ"),
    trangthai: z.string().min(1, "Trạng thái không được để trống"),
    loai_taikhoan: z.literal("nhanvien"),
    phan_quyen: z.string().min(1, "Phân quyền không được để trống")
  })
})

export type NhanVienFormValues = z.infer<typeof nhanvienSchema>
export type NhanVienSchemaWithoutPassword = z.infer<typeof nhanvienSchemaWithoutPassword>

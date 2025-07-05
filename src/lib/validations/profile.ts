import * as z from "zod";

export const profileSchema = z.object({
  hoten: z.string()
    .min(1, "Vui lòng nhập họ tên")
    .max(100, "Họ tên không được vượt quá 100 ký tự"),
  gioitinh: z.string()
    .min(1, "Vui lòng chọn giới tính"),
  ngaysinh: z.string()
    .min(1, "Vui lòng chọn ngày sinh"),
  diachi: z.string()
    .min(1, "Vui lòng nhập địa chỉ")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự"),
  sdt: z.string()
    .min(1, "Vui lòng nhập số điện thoại")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không được vượt quá 11 số"),
  email: z.string()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ")
});

export type ProfileFormValues = z.infer<typeof profileSchema>; 
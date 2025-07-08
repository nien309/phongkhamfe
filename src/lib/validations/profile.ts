import * as z from "zod";
import { User } from "@/types/user";

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

export function useProfileValidation() {
    const validateProfile = (data: Partial<User>): string | null => {
        if (!data.hoten?.trim()) {
            return "Họ tên không được để trống";
        }

        if (!data.gioitinh) {
            return "Vui lòng chọn giới tính";
        }

        if (!data.ngaysinh) {
            return "Ngày sinh không được để trống";
        }

        if (!data.sdt?.trim()) {
            return "Số điện thoại không được để trống";
        }

        // Validate phone number format (Vietnam)
        const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        if (!phoneRegex.test(data.sdt)) {
            return "Số điện thoại không hợp lệ";
        }

        if (!data.email?.trim()) {
            return "Email không được để trống";
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return "Email không hợp lệ";
        }

        if (!data.diachi?.trim()) {
            return "Địa chỉ không được để trống";
        }

        return null;
    };

    return { validateProfile };
} 
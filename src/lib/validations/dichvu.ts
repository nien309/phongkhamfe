import * as z from "zod"

export const dichVuSchema = z.object({
  tendichvu: z.string().min(1, "Tên dịch vụ không được để trống"),
  // tendichvu: z.string()
  // .min(1, "Tên dịch vụ không được để trống")
  // .max(100, "Tên dịch vụ không quá 100 ký tự"),  // Thêm giới hạn tối đa
  dongia: z.number().min(0, "Đơn giá không được âm"),
  trangthai: z.string().min(1, "Trạng thái không được để trống"),
  // trangthai: z.enum(["active", "inactive"], { 
  //   errorMap: () => ({ message: "Trạng thái phải là active hoặc inactive" })
  // }),  // Thay string thường bằng enum
  id_khoa: z.number().min(1, "Vui lòng chọn khoa") //bắt buộc chọn khoa
  //ví dụ thêm trường: mota: z.string().optional(), (optional là ko bắt buộc)
})

export type DichVuFormValues = z.infer<typeof dichVuSchema>

// tendichvu: z.string()
//   .min(1)
//   .refine(val => !val.includes("  "), "Tên dịch vụ không được chứa khoảng trắng thừa"),
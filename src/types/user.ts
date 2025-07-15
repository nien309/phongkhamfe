import { NhanVien } from "./nhanvien"

export interface User {
    id_taikhoan: string
    hoten: string
    matkhau: string
    gioitinh: string
    ngaysinh: string
    diachi: string
    sdt: string
    email: string
    trangthai: string
    loai_taikhoan: string
    id_nguoidung: string
    phan_quyen: string
    nhanvien?: NhanVien | null
}
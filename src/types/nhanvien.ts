import { User } from "./user";

export interface NhanVien {
    id_nhanvien: number;
    chucvu: string;
    luong: number;
    created_at: string;
    updated_at: string;
    id_khoa: number;
    deleted_at: string | null;
    taikhoan: User;
}
import { User } from "./user";

export interface KhachHang {
    id_khachhang: number;
    nghenghiep: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    taikhoan: User;
}
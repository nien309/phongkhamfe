import { KhachHang } from "./khachhang";
import { NhanVien } from "./nhanvien";

export interface CreateLichHen {
    id_nhanvien: number;
    id_khoa: number;
    id_cakham: number;
    ngayhen: string;
    ghichu: string;
}

export interface LichHenResponse {
    id_lichhen: number;
    id_nhanvien: number;
    id_khoa: number;
    id_cakham: number;
    ngayhen: string;
    ghichu: string;
    khachhang:KhachHang;
    nhanvien:NhanVien;
    cakham: {
        id_cakham: number;
        khunggio: string;
    }
}

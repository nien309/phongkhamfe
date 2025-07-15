import { Khoa } from "./khoa";
import { NhanVien } from "./nhanvien";

export interface BenhAn {
    id_benhan: number;
    id_hosobenhan: number;
    chandoan: string;
    mota: string;
    ngaybatdau: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    khoa: Khoa;
    nhanvien: NhanVien;
    id_khoa: number;
    id_nhanvien: number;
}
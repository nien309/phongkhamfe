import { DichVu } from "./dichvu";

export interface ChiDinh {
    id_chidinh: number;
    id_thongtinkhambenh: number;
    id_dichvu: number;
    soluong: number;
    ketqua: string;
    hinhanh: string;
    ngaychidinh: string;
    created_at: string;
    updated_at: string;
    delete_at: string | null;
    trangthai: string;
    ngaythuchien: string;
    dongia: number;
    dichvu: DichVu;
}
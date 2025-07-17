import { ChiDinh } from "./chidinh";
import { ThongTinKhamBenh, ThongTinKhamBenhDetail } from "./thongtinkhambenh";

export interface CreateHoaDon {
    id_thongtinkhambenh: number;
    hinhthucthanhtoan: string;
}
export interface LichSuKham {
    id_thongtinkhambenh: number;
    bacsi: string;
    ngaykham: string;
}

export interface ChiTietThongTinKhamBenh {
    id_thongtinkhambenh: number;
    ngaykham: string;
    bacsi: string;
    chidinh: ChiDinh[];
}
export interface HoaDon {
    id_hoadon: number;
    id_thongtinkhambenh: number;
    ngaytao: string;
    trangthai: string;
    hinhthucthanhtoan: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    tongtien: number;
    lydo_huy: string;
    id_taikhoan: number;
    thongtinkhambenh: ThongTinKhamBenh;
}
export interface HoaDonResponse {
    current_page: number;
    total: number;
    per_page: number;
    data: HoaDon[];
}
export interface HoaDonDetail {
    id_hoadon: number;
    id_thongtinkhambenh: number;
    ngaytao: string;
    trangthai: string;
    hinhthucthanhtoan: string;
    tongtien: string;
    lydo_huy: string;
    id_taikhoan: number;
    thongtinkhambenh: ThongTinKhamBenhDetail;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}
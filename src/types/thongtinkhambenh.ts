import { BenhAn } from "./benhan";
import { ChiDinh } from "./chidinh";
import { HoaDon } from "./hoadon";
import { ToaThuoc } from "./toathuoc";

export interface ThongTinKhamBenh {
    id_thongtinkhambenh: number;
    id_benhan: number;
    trieuchung: string;
    ngaykham: string;
    chandoan: string;
    trangthai: string;
    created_at: string;
    updated_at: string;
    benhan: BenhAn;
}

export interface ThongTinKhamBenhDetail {
    id_thongtinkhambenh: number;
    id_benhan: number;
    trieuchung: string;
    ngaykham: string;
    chandoan: string;
    trangthai: string;
    created_at: string;
    updated_at: string;
    toathuoc: ToaThuoc | null;
    chidinh: ChiDinh[] | null;
    hoadon: HoaDon[] | null;
}
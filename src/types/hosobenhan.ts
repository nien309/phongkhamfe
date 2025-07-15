import { BenhAn } from "./benhan";
import { KhachHang } from "./khachhang";


export interface HosoBenhAn {
    id_hosobenhan: number;
    id_khachhang: number;
    trangthai: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    benhans:BenhAn[]
    khachhang: KhachHang
}
export interface createHoSoBenhAn{
    sdt:string;
}
export interface hosobenhanResponse{
    message: string;
    data: HosoBenhAn
}
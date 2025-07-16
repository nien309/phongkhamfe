export interface ToaThuoc {
    id_toathuoc: number;
    id_thongtinkhambenh: number;
    chandoan: string;
    ngaychandoan: string;
    chitiettoathuoc: ChiTietToaThuoc[] | null;
    created_at: string;
    updated_at: string;
}
export interface ChiTietToaThuoc {
    id_chitiettoathuoc: number;
    id_toathuoc: number;
    ten: string;
    so_luong: number;
    don_vi_tinh: string;
    cach_dung: string;
}
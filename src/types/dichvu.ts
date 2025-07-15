export interface DichVuResponse{
    data: DichVu[];
    current_page: number;
    total: number;
    per_page: number;
}
export interface DichVu{
    id_dichvu: number;
    tendichvu: string;
    dongia: number;
    trangthai: string;
    ngaytao: string;
    ngaycapnhat: string;
    id_khoa: number;
}
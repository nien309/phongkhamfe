export interface DkLichLamViec {
    id_dangky: number;
    id_nhanvien: number;
    thangnam: string;
    thoigiandangky: {
        ngay: string;
        ca: number[];
    }[];
    trangthai: string;
    ghichu: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
    nhanvien: {
        id_nhanvien: number;
        chucvu: string;
        id_khoa: number;
        sdt: string;
        deleted_at: string;
        created_at: string;
        updated_at: string;
        taikhoan:{
            hoten:string;
        }
        khoa:{
            tenkhoa:string;
        }
    };
}
export interface LichLamViec {
    id_lichlamviec: number;
    id_nhanvien: number;
    trangthai: string;
    thoigianlamviec: {
        ngay: string;
        ca: number[];
    }[] | string;
    lydothaydoi: string | null;
    ngaytao: string; 
    nhanvien: {
        id_nhanvien: number;
        chucvu: string;
        id_khoa: number;
        sdt: string;
        deleted_at: string;
        created_at: string;
        updated_at: string;
    };
}
export interface BacSi {
    id_nhanvien: number,
    id_khoa: number,
    tenkhoa: string,
    taikhoan: {
        id_taikhoan: number,
        id_nguoidung: number,
        hoten: string
    }
}
import { ChiTietThongTinKhamBenh, CreateHoaDon, HoaDonDetail, HoaDonResponse, LichSuKham } from "@/types/hoadon";
import { apiClient } from "../axios-client";
import { KhachHang } from "@/types/khachhang";

export const hoaDonApi = {
    create: async (data: CreateHoaDon) => {
        const response = await apiClient.post("/api/hoadon", data)
        return response.data
    },
    getAll: async (page: number) => {
        const response = await apiClient.get<HoaDonResponse>(`/api/hoadon?page=${page}`)
        return response.data
    },
    updateStatus: async (id: number, data: {trangthai: string}) => {
        const response = await apiClient.put(`/api/hoadon/${id}`, data)
        return response.data
    },
    cancel: async (id: number, lydo: string) => {
        const response = await apiClient.patch(`/api/hoadon/${id}/cancel`, {lydo})
        return response.data
    },
    getById: async (id: number) => {
        const response = await apiClient.get<HoaDonDetail>(`/api/hoadon/${id}`)
        return response.data
    },
    findKhachHangByPhone: async (phone: string) => {
        const response = await apiClient.post<KhachHang[]>(`/api/admin/khachhangs/search`, {sdt:phone})
        return response.data
    },
    getLichSuKhamByIdKhachHang: async (id_khachhang: number) => {
        const response = await apiClient.get<LichSuKham[]>(`/api/khach-hang/${id_khachhang}/lich-su-kham-hoan-thanh-chua-co-hoadon`)
        return response.data
    },
    getThongTinKhamBenhDetail: async (id_thongtinkhambenh: number) => {
        const response = await apiClient.get<ChiTietThongTinKhamBenh>(`/api/thong-tin-kham-benh/${id_thongtinkhambenh}/chi-tiet`)
        return response.data
    }
}

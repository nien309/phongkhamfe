import { ChiTietToaThuoc, ToaThuoc } from "@/types/toathuoc"
import { apiClient } from "../axios-client"
import { ChiTietToaThuocFormValues, CreateToaThuocFormValues, UpdateToaThuocFormValues } from "../validations/toathuoc"

const API_ENDPOINT = "/api/toathuoc"
const API_ENDPOINT_CHITIET = "/api/chitiettoathuoc"
export const toaThuocApi = {
    create: async (data: CreateToaThuocFormValues) => {
        const response = await apiClient.post<ToaThuoc>(API_ENDPOINT, data)
        return response.data
    },

    update: async (id: number, data: UpdateToaThuocFormValues) => {
        const response = await apiClient.put<ToaThuoc>(`${API_ENDPOINT}/${id}`, data)
        return response.data
    },

    getById: async (id: number) => {
        const response = await apiClient.get<ToaThuoc>(`${API_ENDPOINT}/${id}`)
        return response.data
    },

    getByThongTinKhamBenh: async (id_thongtinkhambenh: number) => {
        const response = await apiClient.get<ToaThuoc>(`${API_ENDPOINT}/thongtinkhambenh/${id_thongtinkhambenh}`)
        return response.data
    },

    delete: async (id: number) => {
        const response = await apiClient.delete(`${API_ENDPOINT}/${id}`)
        return response.data
    }
}

export const chiTietToaThuocApi = {
    create: async (data: ChiTietToaThuocFormValues) => {
        const response = await apiClient.post<ChiTietToaThuoc>(API_ENDPOINT_CHITIET, data)
        return response.data
    },
    update: async (id: number, data: ChiTietToaThuocFormValues) => {
        const response = await apiClient.put<ChiTietToaThuoc>(`${API_ENDPOINT_CHITIET}/${id}`, data)
        return response.data
    },
}
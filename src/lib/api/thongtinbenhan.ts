import { ThongTinKhamBenh, ThongTinKhamBenhDetail } from "@/types/thongtinkhambenh"
import { apiClient } from "../axios-client"
import { CreateThongTinKhamBenhFormValues, UpdateThongTinKhamBenhFormValues } from "../validations/thongtinkhambenh"

const API_ENDPOINT = "/api/thongtinkhambenh"

export const thongtinkhamBenhApi = {
    create: async (data: CreateThongTinKhamBenhFormValues) => {
        const response = await apiClient.post<ThongTinKhamBenh>(API_ENDPOINT, data)
        return response.data
    },

    update: async (id: number, data: UpdateThongTinKhamBenhFormValues) => {
        const response = await apiClient.put<ThongTinKhamBenh>(`${API_ENDPOINT}/${id}`, data)
        return response.data
    },
    getByBenhAn: async (id_benhan: number) => {
        const response = await apiClient.get<ThongTinKhamBenh[]>(`${API_ENDPOINT}/benhan/${id_benhan}`)
        return response.data
    },

    getDetailById: async (id: number) => {
        const response = await apiClient.get<ThongTinKhamBenhDetail>(`${API_ENDPOINT}/${id}`)
        return response.data
    },

    delete: async (id: number) => {
        const response = await apiClient.delete(`${API_ENDPOINT}/${id}`)
        return response.data
    }
}

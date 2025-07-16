import { ChiDinh } from "@/types/chidinh"
import { apiClient } from "../axios-client"
import { ChiDinhFormValues, UpdateChiDinhFormValues } from "../validations/chidinh"

const API_ENDPOINT = "/api/chidinh"

export const chiDinhApi = {
    create: async (data: ChiDinhFormValues) => {
        const response = await apiClient.post<ChiDinh>(API_ENDPOINT, data)
        return response.data
    },

    update: async (id: number, data: UpdateChiDinhFormValues) => {
        const response = await apiClient.put<ChiDinh>(`${API_ENDPOINT}/${id}`, data)
        return response.data
    },

    getById: async (id: number) => {
        const response = await apiClient.get<ChiDinh>(`${API_ENDPOINT}/${id}`)
        return response.data
    },

    getByThongTinKhamBenh: async (id_thongtinkhambenh: number) => {
        const response = await apiClient.get<ChiDinh[]>(`${API_ENDPOINT}/thongtinkhambenh/${id_thongtinkhambenh}`)
        return response.data
    },

    delete: async (id: number) => {
        const response = await apiClient.delete(`${API_ENDPOINT}/${id}`)
        return response.data
    }
}

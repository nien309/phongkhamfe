import { BenhAn } from "@/types/benhan"
import { apiClient } from "../axios-client"
import { CreateBenhAnFormValues, UpdateBenhAnFormValues } from "../validations/benhan"

const API_ENDPOINT = "/api/benhan"

export const benhanApi = {
    create: async (data: CreateBenhAnFormValues) => {
        const response = await apiClient.post<BenhAn>(API_ENDPOINT, data)
        return response.data
    },

    update: async (id: number, data: UpdateBenhAnFormValues) => {
        const response = await apiClient.put<BenhAn>(`${API_ENDPOINT}/${id}`, data)
        return response.data
    },
    getById: async (id: number) => {
        const response = await apiClient.get<BenhAn>(`${API_ENDPOINT}/${id}`)
        return response.data
    },

    getByHoSoBenhAn: async (id_hosobenhan: number) => {
        const response = await apiClient.get<BenhAn[]>(`${API_ENDPOINT}/by-hosobenhan/${id_hosobenhan}`)
        return response.data
    }
}

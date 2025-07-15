import { HosoBenhAn } from "@/types/hosobenhan"
import { apiClient } from "../axios-client"
import { CreateHoSoBenhAnFormValues } from "../validations/hosobenhan"

const API_ENDPOINT = "/api/hosobenhan"

export const hosobenhanApi = {
    create: async (data: CreateHoSoBenhAnFormValues) => {
        const response = await apiClient.post<HosoBenhAn>(`${API_ENDPOINT}`, data)
        return response.data
      },
    findBySdt: async (sdt: string) => {
        const response = await apiClient.post<HosoBenhAn>(`${API_ENDPOINT}/search-by-phone`, {sdt: sdt})
        return response.data
    }
}

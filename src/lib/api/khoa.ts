import { apiClient } from "../axios-client"
import { Khoa } from "@/types/khoa"
import { KhoaFormValues } from "../validations/khoa"

const API_ENDPOINT = "/api/admin/khoas"

export const khoaApi = {
  getAll: async () => {
    const response = await apiClient.get<Khoa[]>("/api/khoas")
    return response.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Khoa>(`${API_ENDPOINT}/${id}`)
    return response.data
  },

  create: async (data: KhoaFormValues) => {
    const response = await apiClient.post<Khoa>(API_ENDPOINT, data)
    return response.data
  },

  update: async (id: number, data: Partial<KhoaFormValues>) => {
    const response = await apiClient.put<Khoa>(`${API_ENDPOINT}/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`${API_ENDPOINT}/${id}`)
  }
}

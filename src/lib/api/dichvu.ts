import { apiClient } from "../axios-client"
import { DichVu } from "@/types/dichvu"
import { DichVuFormValues } from "../validations/dichvu"

const API_ENDPOINT = "/api/admin/dichvus"

export const dichVuApi = {
  getAll: async () => {
    const response = await apiClient.get<DichVu[]>(API_ENDPOINT)
    return response.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get<DichVu>(`${API_ENDPOINT}/${id}`)
    return response.data
  },

  create: async (data: DichVuFormValues) => {
    const response = await apiClient.post<DichVu>(API_ENDPOINT, data)
    return response.data
  },

  update: async (id: number, data: Partial<DichVuFormValues>) => {
    const response = await apiClient.put<DichVu>(`${API_ENDPOINT}/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`${API_ENDPOINT}/${id}`)
  }
}

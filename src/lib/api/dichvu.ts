import { apiClient } from "../axios-client"
import { DichVu, DichVuResponse } from "@/types/dichvu"
import { DichVuFormValues } from "../validations/dichvu"

const API_ENDPOINT = "/api/admin/dichvus"

export const dichVuApi = {
  getAll: async (page: number = 1, perPage: number = 10) => {
    const response = await apiClient.get<DichVuResponse>(API_ENDPOINT, {
      params: {
        page,
        per_page: perPage
      }
    })
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

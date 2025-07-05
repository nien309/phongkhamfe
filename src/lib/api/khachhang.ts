import { apiClient } from "../axios-client"
import { KhachHang } from "@/types/khachhang"
import { KhachHangFormValues } from "../validations/khachhang"

const API_ENDPOINT = "/api/admin/khachhangs"

export const khachhangApi = {
  getAll: async () => {
    const response = await apiClient.get<KhachHang[]>(API_ENDPOINT)
    return response.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get<KhachHang>(`${API_ENDPOINT}/${id}`)
    return response.data
  },

  create: async (data: KhachHangFormValues) => {
    const response = await apiClient.post<KhachHang>(API_ENDPOINT, data)
    return response.data
  },

  update: async (id: number, data: Partial<KhachHangFormValues>) => {
    const response = await apiClient.put<KhachHang>(`${API_ENDPOINT}/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`${API_ENDPOINT}/${id}`)
  }
}

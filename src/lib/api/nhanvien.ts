import { apiClient } from "../axios-client"
import { NhanVien } from "@/types/nhanvien"
import { NhanVienFormValues } from "../validations/nhanvien"


const API_ENDPOINT = "/api/admin/nhanviens"

export const nhanvienApi = {
  getAll: async () => {
    const response = await apiClient.get<NhanVien[]>(API_ENDPOINT)
    return response.data
  },

  getById: async (id: number) => {
    const response = await apiClient.get<NhanVien>(`${API_ENDPOINT}/${id}`)
    return response.data
  },
  getBacSiDangRanh: async (id: number, cakham: number, ngayhen: string) => {
    const response = await apiClient.get<NhanVien[]>(`/api/khoa/${id}/bac-si-lich-ranh?id_cakham=${cakham}&ngayhen=${ngayhen}`)
    return response.data
  },
  create: async (data: NhanVienFormValues) => {
    const response = await apiClient.post<NhanVien>(API_ENDPOINT, data)
    return response.data
  },

  update: async (id: number, data: Partial<NhanVienFormValues>) => {
    const response = await apiClient.put<NhanVien>(`${API_ENDPOINT}/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await apiClient.delete(`${API_ENDPOINT}/${id}`)
  }
}

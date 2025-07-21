import { LichLamViec } from "@/types/lichlamviec"
import { apiClient } from "../axios-client"
import { DKLichLamViec } from "@/types/dklichlamviec"

export const lichlamviecApi = {
  create: async (data: Omit<DKLichLamViec, "id_dangki">) => {
    const response = await apiClient.post("/api/lich-dang-ky", data)
    return response.data
  },
  getLichLamViec: async () => {
    const response = await apiClient.get<LichLamViec[]>(`/api/admin/lich-lam-viec`)
    return response.data
  },
  getAll: async () => {
    const response = await apiClient.get("/api/lich-dang-ky")
    return response.data.data
  },

  updateDuyetLichLamViec: async (id: number, data: { trangthai: string }) => {
    const response = await apiClient.put(`/api/lich-dang-ky/${id}`, data)
    return response.data
  },
  getById: async (id: number) => {
    const response = await apiClient.get(`/api/lich-dang-ky/${id}`)
    return response.data
  }
}

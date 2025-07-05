import { apiClient } from "../axios-client"
import { DKLichLamViec } from "@/types/dklichlamviec"

export const lichlamviecApi = {
  create: async (data: Omit<DKLichLamViec, "id_dangki">) => {
    const response = await apiClient.post("/api/lich-dang-ky", data)
    return response.data
  },
  
  getAll: async () => {
    const response = await apiClient.get("/api/lich-dang-ky")
    return response.data
  },
}

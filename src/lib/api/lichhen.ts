import { apiClient } from "../axios-client"
import { CreateLichHen, LichHenResponse } from "@/types/lichhen"

const API_ENDPOINT = "/api/lichhen"

export const lichhenApi = {
  create: async (data: CreateLichHen) => {
    const response = await apiClient.post<LichHenResponse>(API_ENDPOINT, data)
    return response.data
  }
}

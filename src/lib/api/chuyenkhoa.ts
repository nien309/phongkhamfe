import { apiClient } from "../axios-client"
import { Khoa } from "@/types/khoa"

const API_ENDPOINT = "/api/khoas"

export const chuyenkhoaApi = {
  getAll: async () => {
    const response = await apiClient.get<Khoa[]>(API_ENDPOINT)
    return response.data
  }
}

import { apiClient } from "../axios-client"
import { User } from "@/types/user"
import { UserFormValues } from "../validations/user"

const API_ENDPOINT = "/api/admin/taikhoan"

export const userApi = {
  getAll: async () => {
    const response = await apiClient.get<User[]>(API_ENDPOINT)
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get<User>(`${API_ENDPOINT}/${id}`)
    return response.data
  },

  create: async (data: UserFormValues) => {
    const response = await apiClient.post<User>(API_ENDPOINT, data)
    return response.data
  },

  update: async (id: string, data: Partial<UserFormValues>) => {
    console.log(data);
    const response = await apiClient.put<User>(`${API_ENDPOINT}/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_ENDPOINT}/${id}`)
  }
} 
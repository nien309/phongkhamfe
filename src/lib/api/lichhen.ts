import { apiClient } from "../axios-client"
import { CreateLichHen, LichHenResponse } from "@/types/lichhen"
import { BookingFormSchemaTaiKham, UpdateBookingFormValues } from "../validations/lichhen"

const API_ENDPOINT = "/api/admin/lichhen"

export const lichhenApi = {
  create: async (data: CreateLichHen) => {
    const response = await apiClient.post<LichHenResponse>("/api/lichhen", data)
    return response.data
  },
  getAll: async () => {
    const response = await apiClient.get<LichHenResponse[]>(API_ENDPOINT)
    return response.data
  },
  updateTrangThai: async (id: number, data: { trangthai: string }) => {
    const response = await apiClient.patch<LichHenResponse>(`${API_ENDPOINT}/capnhat-trangthai/${id}`, data)
    return response.data
  },
  updateThongTin: async (id: number, data: UpdateBookingFormValues) => {
    const response = await apiClient.patch<LichHenResponse>(`api/lichhen/chuyenBacSi/${id}`, data)
    return response.data
  },
  createLichTaiKham: async (data: BookingFormSchemaTaiKham) => {
    const response = await apiClient.post<LichHenResponse>("/api/admin/lichhen/tao-lich", data)
    return response.data
  }
}

import { LogResponse } from "@/types/log";
import { apiClient } from "../axios-client";

const API_ENDPOINT = "/api/log";

export const logApi = {
  getAllLog: async (
    tenbangthuchien: string = "",
    from_date: string = "",
    to_date: string = "",
    id_taikhoan: number = 0,
    page: number = 1,
    per_page: number = 10
  ) => {
    const response = await apiClient.get<LogResponse>(
      `${API_ENDPOINT}?` + 
      `tenbangthuchien=${tenbangthuchien}&` +
      `from_date=${from_date}&` +
      `to_date=${to_date}&` +
      `id_taikhoan=${id_taikhoan}&` +
      `page=${page}&` +
      `per_page=${per_page}`
    );
    return response.data;
  }
};
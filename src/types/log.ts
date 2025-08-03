import { User } from "./user";

export interface LogResponse{
    data: Log[];
    current_page: number;
    total: number;
    per_page: number;
}
export interface Log{
    id_log: number;
    id_taikhoan: number;
    taikhoan: User;
    tenhanhdong: number;
    thoigianthuchien: string;
    tenbangthuchien: number;
}
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProfileForm } from "@/components/hoso/ProfileForm";
import { User } from "@/types/user";
import { userApi } from "@/lib/api/user"; //api gọi dữ liệu người dùng

export default function HoSoPage() {
    const { user } = useAuth();
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.id_taikhoan) { // Kiểm tra nếu có id_taikhoan
                try {
                    const data = await userApi.getById(user.id_taikhoan);
                    setUserData(data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, [user?.id_taikhoan]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-6 h-6 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-semibold text-gray-900">Không tìm thấy thông tin người dùng</h1>
                <p className="mt-2 text-gray-600">Vui lòng đăng nhập lại để xem thông tin</p>
            </div>
        );
    }

    return (
        // container: Giới hạn chiều rộng tối đa theo breakpoint
        // mx-auto: Căn giữa theo chiều ngang
        // px-4: Padding ngang 1rem (16px)
        // py-8: Padding dọc 2rem (32px)
        //max-w-3xl: Giới hạn chiều rộng tối đa là 768px
        //mb-8: Margin bottom 2rem (32px)
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Hồ sơ của tôi</h1>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <ProfileForm user={userData} />
            {/* bg-white: Nền trắng
            rounded-lg: Bo góc với bán kính lớn (0.5rem ~ 8px)
            shadow-md: Đổ bóng vừa phải
            p-6: Padding 1.5rem (24px) xung quanh
            ProfileForm: Component form nhận dữ liệu người dùng */}
                </div>
            </div>
        </div>
    );
}
"use client";

import { useState } from "react";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { userApi } from "@/lib/api/user";
import { useProfileValidation } from "@/lib/validations/profile";

interface ProfileFormProps {
    user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [formData, setFormData] = useState<Omit<User, 'matkhau'>>(
        // Omit password from the form data
        {
            id_taikhoan: user.id_taikhoan,
            hoten: user.hoten,
            gioitinh: user.gioitinh,
            ngaysinh: user.ngaysinh,
            diachi: user.diachi,
            sdt: user.sdt,
            email: user.email,
            trangthai: user.trangthai,
            loai_taikhoan: user.loai_taikhoan,
            id_nguoidung: user.id_nguoidung,
            phan_quyen: user.phan_quyen,
        }
    );
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { validateProfile } = useProfileValidation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            // Validate form data
            const validationError = validateProfile(formData);
            if (validationError) {
                setError(validationError);
                return;
            }

            // Update user profile
            await userApi.update(user.id_taikhoan, formData);
            setSuccess("Cập nhật thông tin thành công!");
            setIsEditing(false);
        } catch (err) {
            setError("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.");
            console.error("Error updating profile:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="hoten">Họ và tên</Label>
                    <Input
                        id="hoten"
                        name="hoten"
                        value={formData.hoten}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gioitinh">Giới tính</Label>
                    <Select
                        id="gioitinh"
                        name="gioitinh"
                        value={formData.gioitinh}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="ngaysinh">Ngày sinh</Label>
                    <Input
                        type="date"
                        id="ngaysinh"
                        name="ngaysinh"
                        value={formData.ngaysinh}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sdt">Số điện thoại</Label>
                    <Input
                        id="sdt"
                        name="sdt"
                        value={formData.sdt}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="diachi">Địa chỉ</Label>
                    <Input
                        id="diachi"
                        name="diachi"
                        value={formData.diachi}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                {!isEditing ? (
                    <Button
                        type="button"
                        onClick={() => setIsEditing(true)}
                    >
                        Chỉnh sửa
                    </Button>
                ) : (
                    <>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsEditing(false);
                                setFormData({
                                    id_taikhoan: user.id_taikhoan,
                                    hoten: user.hoten,
                                    gioitinh: user.gioitinh,
                                    ngaysinh: user.ngaysinh,
                                    diachi: user.diachi,
                                    sdt: user.sdt,
                                    email: user.email,
                                    trangthai: user.trangthai,
                                    loai_taikhoan: user.loai_taikhoan,
                                    id_nguoidung: user.id_nguoidung,
                                    phan_quyen: user.phan_quyen,
                                });
                            }}
                        >
                            Hủy
                        </Button>
                        <Button type="submit">
                            Lưu thay đổi
                        </Button>
                    </>
                )}
            </div>
        </form>
    );
}

"use client"

import { use, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { nhanvienApi } from "@/lib/api/nhanvien"
import { BacSi } from "@/types/bacsi"
import Image from "next/image"

interface Props {
    params: Promise<{
        id: string;
    }>;
}
// chuyen-khoa/[id]/page.tsx
export default function ChuyenKhoaDetailPage({ params }: Props) {
  const [doctors, setDoctors] = useState<BacSi[]>([])
  const [loading, setLoading] = useState(true)
  const { id } = use(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsData = await nhanvienApi.getBacSiByKhoa(parseInt(id))
        console.log(doctorsData)
        setDoctors(doctorsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      {/* Department Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {/* {khoa?.tenkhoa || "Chuyên Khoa"} */}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {/* Đội ngũ bác sĩ chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực {khoa?.tenkhoa.toLowerCase()} */}
        </p>
        <div className="mt-4">
          {/* <span className={`px-2 py-1 rounded-full text-sm ${
            khoa?.trangthai === "hoatdong" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {khoa?.trangthai === "hoatdong" ? "Đang hoạt động" : "Tạm ngưng"}
          </span> */}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id_nhanvien} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                <Image
                  src="/images/services/sieuam.png"
                  alt={doctor.taikhoan.hoten}
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="text-center">{doctor.taikhoan.hoten}</CardTitle>
              <CardDescription className="text-center">
                Bác sĩ chuyên khoa {doctor.tenkhoa}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Chuyên gia trong lĩnh vực {doctor.tenkhoa.toLowerCase()} với kinh nghiệm chuyên môn cao
                </p>
                <a
                  href={`/dat-lich?bacsi=${doctor.id_nhanvien}&khoa=${doctor.id_khoa}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đặt lịch khám
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Doctors Message */}
      {doctors.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          Hiện tại chưa có bác sĩ nào trong chuyên khoa này
        </div>
      )}

    </div>
  )
}

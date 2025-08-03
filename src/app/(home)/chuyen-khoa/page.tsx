"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { chuyenkhoaApi } from "@/lib/api/chuyenkhoa" //gọi API lấy dữ liệu chuyên khoa
import { Khoa } from "@/types/khoa"
import Link from "next/link"

export default function ChuyenKhoaPage() {
  const [chuyenkhoas, setChuyenkhoas] = useState<Khoa[]>([]) // Mảng chứa danh sách chuyên khoa, kiểu Khoa[]
  const [loading, setLoading] = useState(true) // Boolean để xác định trạng thái loading

  useEffect(() => { //Sử dụng useEffect để fetch dữ liệu khi component moun
    const fetchChuyenKhoas = async () => {
      try {
        const data = await chuyenkhoaApi.getAll() //Gọi API chuyenkhoaApi.getAll() để lấy danh sách chuyên khoa
        setChuyenkhoas(data)
      } catch (error) {
        console.error("Error fetching chuyen khoa:", error) //Xử lý kết quả/thất bại và cập nhật state tương ứng
      } finally {
        setLoading(false)
      }
    }

    fetchChuyenKhoas()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Chuyên Khoa</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Trải nghiệm y khoa chất lượng cao – Đa dạng chuyên khoa với bác sĩ giỏi chuyên môn và công nghệ hiện đại, mang đến giải pháp tối ưu cho mọi nhu cầu sức khỏe
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chuyenkhoas.map((khoa) => (
            <Link href={`/chuyen-khoa/${khoa.id_khoa}`} key={khoa.id_khoa}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{khoa.tenkhoa}</CardTitle>
              <CardDescription>Chuyên khoa {khoa.tenkhoa}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Cung cấp dịch vụ chăm sóc sức khỏe chuyên nghiệp với đội ngũ y bác sĩ giàu kinh nghiệm.
              </p>
              <div className="mt-4">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  khoa.trangthai === "hoatdong" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {khoa.trangthai === "hoatdong" ? "Đang hoạt động" : "Tạm ngưng"}
                </span>
              </div>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>

      
    </div>
  )
}

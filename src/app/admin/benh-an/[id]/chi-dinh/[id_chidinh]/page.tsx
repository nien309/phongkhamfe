"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { chiDinhApi } from "@/lib/api/chidinh"
import { ChiDinh } from "@/types/chidinh"

interface ChiDinhViewPageProps {
  params: Promise<{
    id: string;
    id_chidinh: string;
  }>;
}

export default function ChiDinhViewPage({ params }: ChiDinhViewPageProps) {
  const router = useRouter()
  const { id, id_chidinh } = use(params)
  const [loading, setLoading] = useState(true)
  const [chiDinh, setChiDinh] = useState<ChiDinh | null>(null)

  useEffect(() => {
    const fetchChiDinh = async () => {
      try {
        setLoading(true)
        const data = await chiDinhApi.getById(Number(id_chidinh))
        setChiDinh(data)
      } catch (error: any) {
        toast.error(`Có lỗi xảy ra khi tải thông tin chỉ định: ${error.response?.data?.message || 'Có lỗi xảy ra'}`)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchChiDinh()
  }, [id_chidinh])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10 text-center">
            <div className="flex justify-center items-center">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Đang tải...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!chiDinh) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="py-10 text-center">
            <div className="text-gray-500">Không tìm thấy chỉ định</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle>Chi tiết chỉ định</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-500">Mã chỉ định</div>
              <div>{chiDinh.id_chidinh}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Dịch vụ</div>
              <div>{chiDinh.dichvu.tendichvu}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Số lượng</div>
              <div>{chiDinh.soluong}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Đơn giá</div>
              <div>{chiDinh.dongia.toLocaleString('vi-VN')} đ</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Ngày chỉ định</div>
              <div>{new Date(chiDinh.ngaychidinh).toLocaleDateString('vi-VN')}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Trạng thái</div>
              <div>{chiDinh.trangthai}</div>
            </div>
            <div className="col-span-2">
              <div className="text-sm font-medium text-gray-500">Kết quả</div>
              <div>{chiDinh.ketqua || '-'}</div>
            </div>
            {chiDinh.hinhanh && (
              <div className="col-span-2">
                <div className="text-sm font-medium text-gray-500 mb-2">Hình ảnh</div>
                <div className="grid grid-cols-3 gap-4">
                  {chiDinh.hinhanh.split(',').map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Hình ảnh ${index + 1}`}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
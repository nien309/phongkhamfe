"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BenhAn } from "@/types/benhan";
import { ThongTinKhamBenh } from "@/types/thongtinkhambenh";
import { benhanApi } from "@/lib/api/benhan";
import { thongtinkhamBenhApi } from "@/lib/api/thongtinbenhan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function BenhAnDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [benhAn, setBenhAn] = useState<BenhAn | null>(null);
  const [thongTinKhamBenh, setThongTinKhamBenh] = useState<ThongTinKhamBenh[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [benhAnData, thongTinKhamBenhData] = await Promise.all([
          benhanApi.getById(Number(params.id)),
          thongtinkhamBenhApi.getThongTinKhamBenhBenhAnCuaToi(Number(params.id))
        ]);

      
        setBenhAn(benhAnData);
        setThongTinKhamBenh(thongTinKhamBenhData);
        setError(null);
      } catch (err) {
        setError("Không thể tải thông tin bệnh án");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [params.id, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!benhAn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Không tìm thấy bệnh án</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết bệnh án</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Thông tin chung</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Mã bệnh án:</span> {benhAn.id_benhan}</p>
                <p><span className="font-medium">Mã hồ sơ bệnh án:</span> {benhAn.id_hosobenhan}</p>
                <p><span className="font-medium">Ngày bắt đầu:</span> {format(new Date(benhAn.ngaybatdau), "dd/MM/yyyy")}</p>
                <p><span className="font-medium">Ngày tạo:</span> {format(new Date(benhAn.created_at), "dd/MM/yyyy HH:mm")}</p>
              </div>
            </div>

            {/* <div>
              <h3 className="font-semibold mb-2">Thông tin khoa và bác sĩ</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Khoa:</span> {benhAn.khoa?.tenkhoa || "N/A"}</p>
                <p><span className="font-medium">Bác sĩ phụ trách:</span> {benhAn.nhanvien?.taikhoan?.hoten || "N/A"}</p>
              </div>
            </div> */}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Chẩn đoán</h3>
            <p className="whitespace-pre-wrap">{benhAn.chandoan}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Mô tả</h3>
            <p className="whitespace-pre-wrap">{benhAn.mota}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử khám bệnh</CardTitle>
        </CardHeader>
        <CardContent>
          {thongTinKhamBenh.length === 0 ? (
            <p className="text-center py-4 text-gray-500">Chưa có thông tin khám bệnh</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ngày khám</TableHead>
                  <TableHead>Triệu chứng</TableHead>
                  <TableHead>Chẩn đoán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {thongTinKhamBenh.map((item) => (
                  <TableRow key={item.id_thongtinkhambenh}>
                    <TableCell>{format(new Date(item.ngaykham), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{item.trieuchung}</TableCell>
                    <TableCell>{item.chandoan}</TableCell>
                    <TableCell>{item.trangthai}</TableCell>
                    <TableCell>

                        <Link href={`/ho-so/benh-an/${params.id}/thong-tin-kham-benh/${item.id_thongtinkhambenh}`}>
                            <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
  
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ThongTinKhamBenhDetail } from "@/types/thongtinkhambenh";
import { thongtinkhamBenhApi } from "@/lib/api/thongtinbenhan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Các component UI từ thư viện shadcn/ui
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import toast from "react-hot-toast";

export default function ThongTinKhamBenhDetailPage() {
  const params = useParams();
  const [thongTinKhamBenh, setThongTinKhamBenh] = useState<ThongTinKhamBenhDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await thongtinkhamBenhApi.getDetailById(Number(params.id_thongtinkhambenh)); //gọi api lấy thông tin chi tiết
        setThongTinKhamBenh(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải thông tin khám bệnh");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id_thongtinkhambenh]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "dang_kham":
        return "default"; //thể hiện mau mặc định
      case "hoan_thanh":
        return "success";
      case "da_huy":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handlePrint = () => {
    const printContent = document.createElement('div');
    if (printRef.current) {
      printContent.innerHTML = `
        <style>
          @media print {
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              font-family: Arial, sans-serif;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .info-section {
              margin-bottom: 20px;
            }
            .info-row {
              margin-bottom: 10px;
            }
            .footer {
              margin-top: 50px;
              text-align: right;
            }
            .doctor-signature {
              margin-top: 30px;
              text-align: right;
            }
          }
        </style>
        <div class="header">
          <h1>PHÒNG KHÁM ĐA KHOA</h1>
          <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
          <p>Điện thoại: (028) 1234 5678</p>
          <h2>TOA THUỐC</h2>
        </div>
        <div class="info-section">
          <div class="info-row">
            <strong>Họ và tên:</strong> ${thongTinKhamBenh?.benhan.hosobenhan.khachhang.taikhoan.hoten}
          </div>
          <div class="info-row">
            <strong>Ngày sinh:</strong> ${format(new Date(thongTinKhamBenh?.benhan.hosobenhan.khachhang.taikhoan.ngaysinh || ''), 'dd/MM/yyyy')}
          </div>
          <div class="info-row">
            <strong>Ngày khám:</strong> ${format(new Date(thongTinKhamBenh?.ngaykham || ''), 'dd/MM/yyyy')}
          </div>
          <div class="info-row">
            <strong>Chẩn đoán:</strong> ${thongTinKhamBenh?.chandoan}
          </div>
        </div>
        ${printRef.current.innerHTML}
        <div class="footer">
          <p>Ngày ${format(new Date(), 'dd')} tháng ${format(new Date(), 'MM')} năm ${format(new Date(), 'yyyy')}</p>
          <div class="doctor-signature">
            <p>Bác sĩ khám bệnh</p>
            <br/>
            <br/>
            <p>${thongTinKhamBenh?.benhan.nhanvien?.taikhoan.hoten || ''}</p>
          </div>
        </div>
      `;
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      } else {
        toast.error('Không thể mở cửa sổ in. Vui lòng kiểm tra cài đặt trình duyệt.');
      }
    }
  };

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

  if (!thongTinKhamBenh) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Không tìm thấy thông tin khám bệnh</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href={`/ho-so/benh-an/${params.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <Badge variant={getStatusBadgeVariant(thongTinKhamBenh.trangthai)}>
          {thongTinKhamBenh.trangthai === "dang_kham" ? "Đang khám" :
           thongTinKhamBenh.trangthai === "hoan_thanh" ? "Hoàn thành" :
           thongTinKhamBenh.trangthai === "da_huy" ? "Đã hủy" : thongTinKhamBenh.trangthai}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin khám bệnh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Ngày khám:</p>
              <p>{format(new Date(thongTinKhamBenh.ngaykham), "dd/MM/yyyy")}</p>
            </div>
            
          </div>

          <div>
            <p className="font-medium mb-2">Triệu chứng:</p>
            <p className="whitespace-pre-wrap">{thongTinKhamBenh.trieuchung}</p>
          </div>

          <div>
            <p className="font-medium mb-2">Chẩn đoán:</p>
            <p className="whitespace-pre-wrap">{thongTinKhamBenh.chandoan}</p>
          </div>
        </CardContent>
      </Card>

      {thongTinKhamBenh.toathuoc && (
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <span>Toa thuốc</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  In toa thuốc
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={printRef}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STT</TableHead>
                    <TableHead>Tên thuốc</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Đơn vị tính</TableHead>
                    <TableHead>Cách dùng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {thongTinKhamBenh.toathuoc.chitiettoathuoc?.map((item, index) => (
                    <TableRow key={item.id_chitiettoathuoc}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.ten}</TableCell>
                      <TableCell>{item.so_luong}</TableCell>
                      <TableCell>{item.don_vi_tinh}</TableCell>
                      <TableCell>{item.cach_dung}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {thongTinKhamBenh.chidinh && thongTinKhamBenh.chidinh.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Chỉ định</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên dịch vụ</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Đơn giá</TableHead>
                  <TableHead>Ngày chỉ định</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {thongTinKhamBenh.chidinh.map((item) => (
                  <TableRow key={item.id_chidinh}>
                    <TableCell>{item.dichvu.tendichvu}</TableCell>
                    <TableCell>{item.soluong}</TableCell>
                    <TableCell>{item.dongia.toLocaleString()}đ</TableCell>
                    <TableCell>{format(new Date(item.ngaychidinh), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{item.trangthai}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {thongTinKhamBenh.hoadon && thongTinKhamBenh.hoadon.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hóa đơn</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã hóa đơn</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {thongTinKhamBenh.hoadon.map((item) => (
                  <TableRow key={item.id_hoadon}>
                    <TableCell>{item.id_hoadon}</TableCell>
                    <TableCell>{format(new Date(item.created_at), "dd/MM/yyyy")}</TableCell>
                    <TableCell>{item.tongtien.toLocaleString()}đ</TableCell>
                    <TableCell>{item.trangthai}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

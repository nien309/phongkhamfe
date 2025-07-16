"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ThongTinKhamBenhDetail } from "@/types/thongtinkhambenh";
import { thongtinkhamBenhApi } from "@/lib/api/thongtinbenhan";
import { toaThuocApi } from "@/lib/api/toathuoc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Pencil } from "lucide-react";
import { ToaThuocFormDialog } from "@/components/toathuoc/ToaThuocFormDialog";
import { CreateToaThuocFormValues } from "@/lib/validations/toathuoc";
import { ChiTietThuocFormDialog } from "@/components/toathuoc/ChiTietThuocFormDialog";
import { ChiTietToaThuocFormValues } from "@/lib/validations/toathuoc";
import { ChiTietToaThuoc } from "@/types/toathuoc";

export default function ThongTinKhamBenhDetailPage() {
  const params = useParams();
  const [thongTinKhamBenh, setThongTinKhamBenh] = useState<ThongTinKhamBenhDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openToaThuocDialog, setOpenToaThuocDialog] = useState(false);
  const [openChiTietThuocDialog, setOpenChiTietThuocDialog] = useState(false);
  const [selectedChiTietThuoc, setSelectedChiTietThuoc] = useState<ChiTietToaThuoc | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await thongtinkhamBenhApi.getDetailById(Number(params.id_thongtinkhambenh));
        setThongTinKhamBenh(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id_thongtinkhambenh]);

  const handleCreateToaThuoc = async (data: CreateToaThuocFormValues) => {
    try {
      const newToaThuoc = await toaThuocApi.create(data);
      setThongTinKhamBenh(prev => prev ? {
        ...prev,
        toathuoc: newToaThuoc
      } : null);
    } catch (error) {
      console.error("Failed to create toa thuoc:", error);
    }
  };

  const handleCreateChiTietToaThuoc = async (data: ChiTietToaThuocFormValues) => {
    try {
      // Refresh the data to get the updated prescription details
      const updatedData = await thongtinkhamBenhApi.getDetailById(Number(params.id_thongtinkhambenh));
      setThongTinKhamBenh(updatedData);
      setSelectedChiTietThuoc(undefined);
    } catch (error) {
      console.error("Failed to refresh data after handling chi tiet toa thuoc:", error);
    }
  };

  const handleEditChiTietThuoc = (chiTietThuoc: ChiTietToaThuoc) => {
    setSelectedChiTietThuoc(chiTietThuoc);
    setOpenChiTietThuocDialog(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "dang_kham":
        return "default";
      case "hoan_thanh":
        return "success";
      case "da_huy":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
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
        <div className="text-lg">Thông tin khám bệnh not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link href={`/admin/benh-an/${params.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </Link>
        <div className="flex items-center gap-5">
          <Badge variant={getStatusBadgeVariant(thongTinKhamBenh.trangthai)}>
            {thongTinKhamBenh.trangthai === "dang_kham" ? "Đang khám" :
             thongTinKhamBenh.trangthai === "hoan_thanh" ? "Hoàn thành" :
             thongTinKhamBenh.trangthai === "da_huy" ? "Đã hủy" : thongTinKhamBenh.trangthai}
          </Badge>
          {!thongTinKhamBenh.toathuoc && (
            <Button variant="outline" size="sm" onClick={() => setOpenToaThuocDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm toa thuốc
            </Button>
          )}
        </div>
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
            <div>
              <p className="font-medium">Ngày tạo:</p>
              <p>{format(new Date(thongTinKhamBenh.created_at), "dd/MM/yyyy HH:mm")}</p>
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
                  onClick={() => setOpenChiTietThuocDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thuốc
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium mb-2">Chẩn đoán: {thongTinKhamBenh.chandoan}</p>
            {!thongTinKhamBenh.toathuoc.chitiettoathuoc && (
              <p>Không có thuốc được đưa vào toa thuốc</p>
            )}
            {thongTinKhamBenh.toathuoc.chitiettoathuoc && thongTinKhamBenh.toathuoc.chitiettoathuoc.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên thuốc</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Đơn vị tính</TableHead>
                    <TableHead>Cách dùng</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {thongTinKhamBenh.toathuoc.chitiettoathuoc.map((item) => (
                    <TableRow key={item.id_chitiettoathuoc}>
                      <TableCell>{item.ten}</TableCell>
                      <TableCell>{item.so_luong}</TableCell>
                      <TableCell>{item.don_vi_tinh}</TableCell>
                      <TableCell>{item.cach_dung}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditChiTietThuoc(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

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
                <TableHead>Ghi chú</TableHead>
              </TableRow>
            </TableHeader>
            {thongTinKhamBenh.chidinh && thongTinKhamBenh.chidinh.length > 0 && (
              <TableBody>
                {thongTinKhamBenh.chidinh.map((item) => (
                  <TableRow key={item.id_chidinh}>
                    <TableCell>{item.dichvu.tendichvu}</TableCell>
                    <TableCell>{item.soluong}</TableCell>
                    <TableCell>{item.dongia}</TableCell>
                    <TableCell>{item.trangthai}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>

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
                </TableRow>
              </TableHeader>
              <TableBody>
                {thongTinKhamBenh.hoadon.map((item) => (
                  <TableRow key={item.id_hoadon}>
                    <TableCell>{item.id_hoadon}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <ToaThuocFormDialog
        open={openToaThuocDialog}
        onOpenChange={setOpenToaThuocDialog}
        onSubmit={handleCreateToaThuoc}
        id_thongtinkhambenh={Number(params.id_thongtinkhambenh)}
        chandoan={thongTinKhamBenh.chandoan}
      />

      {thongTinKhamBenh.toathuoc && (
        <ChiTietThuocFormDialog
          open={openChiTietThuocDialog}
          onOpenChange={(open) => {
            setOpenChiTietThuocDialog(open);
            if (!open) setSelectedChiTietThuoc(undefined);
          }}
          onSubmit={handleCreateChiTietToaThuoc}
          id_toathuoc={thongTinKhamBenh.toathuoc.id_toathuoc}
          defaultValues={selectedChiTietThuoc}
        />
      )}
    </div>
  );
} 
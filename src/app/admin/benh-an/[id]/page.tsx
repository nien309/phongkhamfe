"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BenhAn } from "@/types/benhan";
import { ThongTinKhamBenh } from "@/types/thongtinkhambenh";
import { benhanApi } from "@/lib/api/benhan";
import { thongtinkhamBenhApi } from "@/lib/api/thongtinbenhan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ThongTinKhamBenhFormDialog } from "@/components/thongtinkhambenh/ThongTinKhamBenhFormDialog";
import { CreateThongTinKhamBenhFormValues } from "@/lib/validations/thongtinkhambenh";
import { format } from "date-fns";
import { Eye, PencilIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function BenhAnDetailPage() {
  const params = useParams();
  const [benhAn, setBenhAn] = useState<BenhAn | null>(null);
  const [thongTinKhamBenh, setThongTinKhamBenh] = useState<ThongTinKhamBenh[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ThongTinKhamBenh | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [benhAnData, thongTinKhamBenhData] = await Promise.all([
          benhanApi.getById(Number(params.id)),
          thongtinkhamBenhApi.getByBenhAn(Number(params.id))
        ]);
        setBenhAn(benhAnData);
        setThongTinKhamBenh(thongTinKhamBenhData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleCreate = async (data: CreateThongTinKhamBenhFormValues) => {
    try {
        console.log(data);
      const newRecord = await thongtinkhamBenhApi.create(data);
      setThongTinKhamBenh([...thongTinKhamBenh, newRecord]);
    } catch (error) {
      console.error("Failed to create record:", error);
    }
  };

  const handleUpdate = async (data: CreateThongTinKhamBenhFormValues) => {
    if (!selectedRecord) return;
    try {
      const updatedRecord = await thongtinkhamBenhApi.update(selectedRecord.id_thongtinkhambenh, data);
      setThongTinKhamBenh(thongTinKhamBenh.map(record => 
        record.id_thongtinkhambenh === updatedRecord.id_thongtinkhambenh ? updatedRecord : record
      ));
    } catch (error) {
      console.error("Failed to update record:", error);
    }
  };

  const handleEdit = (record: ThongTinKhamBenh) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleOpenChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open) {
      setSelectedRecord(undefined);
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

  if (!benhAn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Benh an not found</div>
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

            <div>
              <h3 className="font-semibold mb-2">Thông tin khoa và nhân viên</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Khoa:</span> {benhAn.khoa?.tenkhoa || "N/A"}</p>
                <p><span className="font-medium">Nhân viên phụ trách:</span> {benhAn.nhanvien?.taikhoan?.hoten || "N/A"}</p>
              </div>
            </div>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lịch sử khám bệnh</CardTitle>
          <Button onClick={() => setOpenDialog(true)} size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Thêm mới
          </Button>
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
                  <TableHead className="w-[100px]">Thao tác</TableHead>
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
                      <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                        <Link href={`/admin/benh-an/${params.id}/thong-tin-kham-benh/${item.id_thongtinkhambenh}`}>
                        <Button
                        variant="ghost"
                        size="sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ThongTinKhamBenhFormDialog
        open={openDialog}
        onOpenChange={handleOpenChange}
        defaultValues={selectedRecord}
        onSubmit={selectedRecord ? handleUpdate : handleCreate}
        id_benhan={Number(params.id)}
      />
    </div>
  );
}

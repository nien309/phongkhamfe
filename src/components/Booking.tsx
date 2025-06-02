'use client';

import { useEffect, useState } from 'react';

export default function Booking() {
  const [formData, setFormData] = useState({
    hoTen: '',
    ngaySinh: '',
    gioiTinh: 'Nam',
    soDienThoai: '',
    chuyenKhoa: '',
    bacSi: '',
    khungGio: 'Sáng',
    ngayKham: '',
  });

  const [chuyenKhoas, setChuyenKhoas] = useState<string[]>([]);
  const [bacSis, setBacSis] = useState<string[]>([]);

  // Giả lập API gọi danh sách chuyên khoa
  useEffect(() => {
    // TODO: Thay bằng fetch(`/api/chuyenkhoa`) sau này
    setChuyenKhoas(['Nội tổng quát', 'Tai mũi họng', 'Da liễu']);
  }, []);

  // Khi chọn chuyên khoa, giả lập fetch bác sĩ tương ứng
  useEffect(() => {
    if (formData.chuyenKhoa === 'Nội tổng quát') {
      setBacSis(['BS. Nguyễn Văn A', 'BS. Trần Thị B']);
    } else if (formData.chuyenKhoa === 'Tai mũi họng') {
      setBacSis(['BS. Lê Văn C']);
    } else if (formData.chuyenKhoa === 'Da liễu') {
      setBacSis(['BS. Phạm Thị D']);
    } else {
      setBacSis([]);
    }
    setFormData(prev => ({ ...prev, bacSi: '' })); // reset khi thay đổi chuyên khoa
  }, [formData.chuyenKhoa]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gửi dữ liệu đặt lịch:', formData);

    // Gửi API Laravel sau này: POST /api/dat-lich
    // await fetch('http://localhost:8000/api/dat-lich', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
  };

  return (
    <section className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">Đặt lịch khám</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="hoTen"
          type="text"
          placeholder="Họ tên"
          value={formData.hoTen}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="ngaySinh"
          type="date"
          value={formData.ngaySinh}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="gioiTinh"
          value={formData.gioiTinh}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
        <input
          name="soDienThoai"
          type="tel"
          placeholder="Số điện thoại"
          value={formData.soDienThoai}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <select
          name="chuyenKhoa"
          value={formData.chuyenKhoa}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">-- Chọn chuyên khoa --</option>
          {chuyenKhoas.map((khoa, idx) => (
            <option key={idx} value={khoa}>
              {khoa}
            </option>
          ))}
        </select>
        <select
          name="bacSi"
          value={formData.bacSi}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">-- Chọn bác sĩ --</option>
          {bacSis.map((bs, idx) => (
            <option key={idx} value={bs}>
              {bs}
            </option>
          ))}
        </select>
        <select
          name="khungGio"
          value={formData.khungGio}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Sáng">Buổi sáng</option>
          <option value="Chiều">Buổi chiều</option>
        </select>
        <input
          name="ngayKham"
          type="date"
          value={formData.ngayKham}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Đặt lịch ngay
          </button>
        </div>
      </form>
    </section>
  );
}

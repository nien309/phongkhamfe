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

  useEffect(() => {
    setChuyenKhoas(['Nội tổng quát', 'Tai mũi họng', 'Da liễu']);
  }, []);

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
    setFormData(prev => ({ ...prev, bacSi: '' }));
  }, [formData.chuyenKhoa]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gửi dữ liệu đặt lịch:', formData);
  };

  return (
    <section className="max-w-3xl mx-auto bg-blue-800 p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">ĐĂNG KÝ KHÁM BỆNH</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-white text-sm">* Chọn chuyên khoa</label>
          <select
            name="chuyenKhoa"
            value={formData.chuyenKhoa}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white text-black"
            required
          >
            <option value="">-- Chọn chuyên khoa --</option>
            {chuyenKhoas.map((khoa, idx) => (
              <option key={idx} value={khoa}>
                {khoa}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white text-sm">* Chọn bác sĩ</label>
          <select
            name="bacSi"
            value={formData.bacSi}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white text-black"
            required
          >
            <option value="">-- Chọn bác sĩ --</option>
            {bacSis.map((bs, idx) => (
              <option key={idx} value={bs}>
                {bs}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white text-sm">* Nhập họ và tên đầy đủ</label>
          <input
            name="hoTen"
            type="text"
            placeholder="Họ tên"
            value={formData.hoTen}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="text-white text-sm">* Nhập ngày tháng năm sinh</label>
          <input
            name="ngaySinh"
            type="date"
            value={formData.ngaySinh}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="text-white text-sm">* Giới tính</label>
          <select
            name="gioiTinh"
            value={formData.gioiTinh}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white text-black"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div>
          <label className="text-white text-sm">* Số điện thoại</label>
          <input
            name="soDienThoai"
            type="tel"
            placeholder="Điện thoại"
            value={formData.soDienThoai}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="text-white text-sm">* Chọn ngày khám</label>
          <input
            name="ngayKham"
            type="date"
            value={formData.ngayKham}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white text-black"
            required
          />
        </div>
        <div>
          <label className="text-white text-sm">* Khung giờ muốn khám</label>
          <select
            name="khungGio"
            value={formData.khungGio}
            onChange={handleChange}
            className="border p-2 rounded w-full bg-white text-black"
          >
            <option value="Sáng">Sáng 7:30 - 11:30 - Từ Thứ 2 - Thứ 7</option>
            <option value="Chiều">Chiều 13:00 - 17:30 - Từ Thứ 2 - Thứ 7</option>
          </select>
        </div>
        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-white text-blue-800 px-6 py-2 rounded font-semibold hover:bg-gray-100"
          >
            ĐẶT LỊCH NGAY
          </button>
        </div>
      </form>
    </section>
  );
}

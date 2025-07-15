'use client';

import React from 'react';
import {
  FaArrowUp,
  FaMapMarkerAlt,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6 relative">
  <div className="max-w-6xl mx-auto text-center">

    {/* Grid 2 cột canh giữa toàn bộ nội dung */}
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-40 text-sm text-left">
        {/* Cột trái: Thông tin phòng khám */}
        <div>
          <h2 className="text-lg font-bold text-yellow-300 mb-4">
            PHÒNG KHÁM ĐÔNG DƯƠNG
          </h2>

          <p className="flex items-start gap-2 mb-2">
            <FaMapMarkerAlt className="mt-1 min-w-[16px]" />
            <span>180 Cao Lỗ, Quận 8, TP.HCM</span>
          </p>

          <p className="flex items-start gap-2 mb-1">
            <FaEnvelope className="mt-1 min-w-[16px]" />
            <span>dh52102172@student.stu.edu.vn</span>
          </p>

          <p className="flex items-start gap-2 mb-2">
            <FaEnvelope className="mt-1 min-w-[16px]" />
            <span>dh52100402@student.stu.edu.vn</span>
          </p>
        </div>

        {/* Cột phải: Lịch làm việc */}
        <div>
          <h3 className="text-lg font-bold text-yellow-300 mb-4">
            LỊCH LÀM VIỆC
          </h3>
          <ul className="list-disc list-outside pl-5 space-y-1 mt-2 text-gray-100">
            <li>Thứ 2 - Chủ Nhật | 7:30 - 17:30</li>
            <li>Giờ nghỉ trưa: 11:30 - 13:30</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-6 text-gray-300 text-center">
      &copy; 2025 Phòng Khám Đông Dương
    </div>
  </div>

  {/* Nút lên đầu trang */}
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="absolute right-4 bottom-4 p-2 bg-blue-700 rounded-full hover:bg-blue-600"
    aria-label="Lên đầu trang"
  >
    <FaArrowUp />
  </button>
</footer>

  );
};

export default Footer;

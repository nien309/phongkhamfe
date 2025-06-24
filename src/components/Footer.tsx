'use client';

import React from 'react';
import {
  FaArrowUp,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6 relative">
      <div className="max-w-6xl mx-auto text-center">

        {/* Grid 2 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center text-sm">
          {/* Cột trái: Thông tin phòng khám */}
          <div>
            <h2 className="text-lg font-bold text-yellow-300 mb-4">
              PHÒNG KHÁM ĐÔNG DƯƠNG
            </h2>

            <p className="flex justify-center items-start gap-2 mb-2">
              <FaMapMarkerAlt className="mt-1" />
              180 Cao Lỗ, Quận 8, TP.HCM
            </p>

            <p className="flex justify-center items-start gap-2 mb-2">
              <FaClock className="mt-1" />
              Thứ Hai - Thứ Bảy | 7:30 - 17:30
            </p>

            <p className="flex justify-center items-start gap-2 mb-1">
              <FaEnvelope className="mt-1" />
              dh52102172@student.stu.edu.vn
            </p>

            <p className="flex justify-center items-start gap-2 mb-2">
              <FaEnvelope className="mt-1" />
              dh52100402@student.stu.edu.vn
            </p>
          </div>

          {/* Cột phải: Lịch làm việc */}
          <div>
            <h3 className="text-base font-semibold mb-2 border-b border-white inline-block">
              LỊCH LÀM VIỆC
            </h3>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-100 text-left md:text-center">
              <li>Thứ 2 - Thứ 7 | 7:30 - 17:30</li>
              <li>Giờ nghỉ trưa: 11:30 - 13:30</li>
            </ul>
          </div>
        </div>

        {/* Copyright - canh giữa */}
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

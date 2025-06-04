
'use client';
import React from 'react';

const servicesData = [
  {
    title: 'Khám Tổng Quát',
    description: 'Kiểm tra sức khỏe toàn diện giúp phát hiện sớm các bệnh lý tiềm ẩn.',
    icon: '🩺',
  },
  {
    title: 'Xét Nghiệm & Chẩn Đoán',
    description: 'Trang thiết bị hiện đại, kết quả nhanh chóng và chính xác.',
    icon: '🔬',
  },
  {
    title: 'Khám Chuyên Khoa',
    description: 'Tư vấn và điều trị các bệnh lý chuyên sâu bởi bác sĩ giỏi.',
    icon: '👨‍⚕️',
  },
  {
    title: 'X - Quang',
    description: 'Sử dụng tia X để tạo hình ảnh xương và một số mô đặc. ',
    
    icon: '🩻',
  },
  {
    title: 'Siêu Âm',
    description: 'Dùng sóng âm tần số cao để quan sát cơ quan nội tạng, mô mềm.',
    icon: '📡',
  },
];

const Services = () => {
  
  return (
    <section id="services" className="py-16 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12">Dịch Vụ Của Chúng Tôi</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map(({ title, description, icon }) => (
          <div key={title} className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-default">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
};


export default Services;


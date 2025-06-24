'use client';
import React from 'react';
// 'use client': Chỉ định đây là component client-side trong Next.js
// import React from 'react': Import thư viện React cần thiết
const services = [
  {
    id: 1,
    name: 'Tổng Quát',
    desc: 'Kiểm tra sức khỏe toàn diện giúp phát hiện sớm các bệnh lý tiềm ẩn.',
    icon: '🩺',
  },
//   Mảng services chứa thông tin các dịch vụ y tế
// Mỗi dịch vụ gồm: id (định danh), name (tên dịch vụ), desc (mô tả), icon (biểu tượng emoji)

  {
    id: 2,
    name: 'Xét Nghiệm',
    desc: 'Trang thiết bị hiện đại, kết quả nhanh chóng và chính xác.',
    icon: '🔬',
  },
  {
    id: 3,
    name: 'Chuyên Khoa',
    desc: 'Tư vấn và điều trị các bệnh lý chuyên sâu bởi bác sĩ giỏi.',
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
    <section id="services" className="py-16 bg-slate-50">
      {
      
      /* <section>: Thẻ HTML5 cho một section

id="services": ID để có thể link tới section này

className áp dụng các style:

py-16: padding top-bottom 16 units (4rem)

bg-slate-50: background màu xám nhạt

container: set max-width theo breakpoint

mx-auto: căn giữa theo chiều ngang

px-4: padding left-right 1rem */

}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Dịch Vụ Của Chúng Tôi
        </h2>
        {
        
        /* text-3xl md:text-4xl: cỡ chữ 3xl (1.875rem) trên mobile, 4xl (2.25rem) từ md breakpoint trở lên

font-bold: chữ đậm

text-center: căn giữa

mb-12: margin-bottom 3rem

text-gray-800: màu chữ xám đậm */

}

{
/* Tạo layout grid responsive:

Mobile: 1 cột (grid-cols-1)

Từ sm breakpoint: 2 cột (sm:grid-cols-2)

Từ lg breakpoint: 5 cột (lg:grid-cols-5)

gap-6: khoảng cách giữa các item là 1.5rem */

// map qua mảng services để render từng dịch vụ

// key={service.id}: định danh unique cho mỗi item

// Các class style:

// bg-white: nền trắng

// rounded-xl: bo góc lớn

// p-6: padding 1.5rem

// shadow-md: đổ bóng vừa

// hover:shadow-lg: hiệu ứng bóng đậm hơn khi hover

// transition-all: hiệu ứng chuyển động mượt

// duration-300: thời gian hiệu ứng 300ms

// transform hover:-translate-y-1: khi hover nâng card lên 1px

// text-center: căn giữa nội dung
}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
};
 

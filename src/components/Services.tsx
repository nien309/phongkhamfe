// 'use client';
// import React from 'react';
// // 'use client': Chỉ định đây là component client-side trong Next.js
// // import React from 'react': Import thư viện React cần thiết
// const services = [
//   {
//     id: 1,
//     name: 'Tổng Quát',
//     desc: 'Kiểm tra sức khỏe toàn diện giúp phát hiện sớm các bệnh lý tiềm ẩn.',
//     icon: '🩺',
//   },
// //   Mảng services chứa thông tin các dịch vụ y tế
// // Mỗi dịch vụ gồm: id (định danh), name (tên dịch vụ), desc (mô tả), icon (biểu tượng emoji)

//   {
//     id: 2,
//     name: 'Xét Nghiệm',
//     desc: 'Trang thiết bị hiện đại, kết quả nhanh chóng và chính xác.',
//     icon: '🔬',
//   },
//   {
//     id: 3,
//     name: 'Chuyên Khoa',
//     desc: 'Tư vấn và điều trị các bệnh lý chuyên sâu bởi bác sĩ giỏi.',
//     icon: '👨‍⚕️',
//   },
//   {
//     id: 4,
//     name: 'X - Quang',
//     desc: 'Sử dụng tia X để tạo hình ảnh xương và một số mô đặc. ',
//     icon: '🩻',
//   },
//   {
//     id: 5,
//     name: 'Siêu Âm',
//     desc: 'Dùng sóng âm tần số cao để quan sát cơ quan nội tạng, mô mềm.',
//     icon: '📡',
//   },
// ];

// const Services = () => {
  
//   return (
//     <section id="services" className="py-16 bg-slate-50">
//       {
      

// }

//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
//           Dịch Vụ Của Chúng Tôi
//         </h2>
//         {
        
       

// }

// {

// }
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//           {services.map((service) => (
//             <div
//               key={service.id}
//               className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
//             >
//               <div className="text-5xl mb-4">{service.icon}</div>
//               <h3 className="text-xl font-semibold mb-3 text-gray-800">
//                 {service.name}
//               </h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {service.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
  
// };
// export default Services;


import React from 'react';
import { FaStethoscope, FaMicroscope, FaUserMd, FaXRay, FaSatelliteDish } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaStethoscope className="text-5xl text-blue-500 mb-4" />,
      title: 'Tổng Quát',
      description: 'Kiểm tra sức khỏe toàn diện giúp phát hiện sớm các bệnh lý tiềm ẩn.',
    },
    {
      icon: <FaMicroscope className="text-5xl text-blue-500" />,
      title: 'Xét Nghiệm',
      description: 'Trang thiết bị hiện đại, kết quả nhanh chóng và chính xác.',
    },
    {
      icon: <FaUserMd className="text-5xl text-blue-500" />,
      title: 'Chuyên Khoa',
      description: 'Tư vấn và điều trị các bệnh lý chuyên sâu bởi bác sĩ giỏi.',
    },
    {
      icon: <FaXRay className="text-5xl text-blue-500" />,
      title: 'X - Quang',
      description: 'Sử dụng tia X để tạo hình ảnh xương và một số mô đặc.',
    },
    {
      icon: <FaSatelliteDish className="text-5xl text-blue-500" />,
      title: 'Siêu Âm',
      description: 'Dùng sóng âm tần số cao để quan sát cơ quan nội tạng, mô mềm.',
    },
  ];

  return (
    <section id="services" className="scroll-mt-24 py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Dịch Vụ Của Chúng Tôi
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6 md:px-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <div className="flex items-center justify-center mb-4">
              {service.icon}
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

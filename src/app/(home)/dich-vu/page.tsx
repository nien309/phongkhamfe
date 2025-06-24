// src/app/(home)/dich-vu/page.tsx

import React from 'react';

const DichVuPage = () => {
  const departments = [
    'Nội khoa',
    'Nhi khoa',
    'Răng hàm mặt',
    'Da liễu',
    'Sản phụ khoa',
    'Tai mũi họng',
    'Xét nghiệm',
    'Siêu âm',
  ];

  const doctors = [
    {
      name: 'BS. Nguyễn Văn A',
      specialty: 'Nội tổng quát',
      degree: 'ĐH Y Hà Nội',
      experience: '15 năm',
      image: '/images/doctors/nguyenvana.jpg',
    },
    {
      name: 'BS. Trần Thị B',
      specialty: 'Sản phụ khoa',
      degree: 'ĐH Y Dược TP.HCM',
      experience: '12 năm',
      image: '/images/doctors/tranthib.jpg',
    },
    {
      name: 'BS. Lê Văn C',
      specialty: 'Nhi khoa',
      degree: 'ĐH Y Huế',
      experience: '10 năm',
      image: '/images/doctors/levanc.jpg',
    },
  ];

  const articles = [
    {
      title: 'Cách phòng ngừa cảm cúm hiệu quả',
      summary: 'Tìm hiểu các biện pháp đơn giản giúp bạn và gia đình tránh khỏi virus cúm mùa.',
    },
    {
      title: 'Chế độ dinh dưỡng cho người cao huyết áp',
      summary: 'Hướng dẫn xây dựng thực đơn và lối sống lành mạnh để kiểm soát huyết áp ổn định.',
    },
    {
      title: 'Dấu hiệu nhận biết bệnh tiểu đường sớm',
      summary: 'Những biểu hiện ban đầu thường bị bỏ qua có thể cảnh báo nguy cơ tiểu đường type 2.',
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-20">
      {/* 1. Dịch vụ khám chữa bệnh */}
      <section>
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Dịch vụ khám chữa bệnh</h2>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Chuyên khoa:</h3>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          {departments.map((dept, idx) => (
            <li key={idx}>{dept}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Quy trình khám & điều trị:</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Quy trình bao gồm: đăng ký, tiếp đón, khám lâm sàng, cận lâm sàng (xét nghiệm, siêu âm...), kết luận, kê đơn và hướng dẫn theo dõi sau khám.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Thiết bị y tế:</h3>
        <p className="text-gray-700 leading-relaxed">
          Phòng khám được trang bị máy siêu âm 4D, máy xét nghiệm tự động, máy nội soi tai mũi họng hiện đại... nhằm đảm bảo chẩn đoán chính xác và điều trị hiệu quả.
        </p>
      </section>

      {/* 3. Đội ngũ bác sĩ */}
      <section>
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Đội ngũ bác sĩ</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {doctors.map((doc, idx) => (
            <div key={idx} className="bg-white rounded shadow p-4 text-center">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{doc.name}</h3>
              <p className="text-gray-600">{doc.specialty}</p>
              <p className="text-sm text-gray-500">
                {doc.degree} – {doc.experience} kinh nghiệm
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Giáo dục sức khỏe */}
      <section>
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Giáo dục sức khỏe</h2>
        <div className="space-y-6">
          {articles.map((article, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{article.title}</h3>
              <p className="text-gray-600">{article.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DichVuPage;


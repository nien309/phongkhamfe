import React from 'react';

const Hero = () => {
  return (
    <section className="hero bg-blue-600 text-white min-h-screen flex flex-col justify-center items-center px-6 text-center">
      <h1 className="text-5xl font-bold mb-4">
        Phòng Khám Đa Khoa ABC
      </h1>
      <p className="text-xl max-w-xl mb-8">
        Chăm sóc sức khỏe toàn diện với đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại.
      </p>
      <a 
        href="#services" 
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
      >
        Khám Phá Dịch Vụ
      </a>
    </section>
  );
};

export default Hero;

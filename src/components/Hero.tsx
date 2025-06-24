import React from 'react';

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 md:px-12 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("/images/hero/background-hero.jpg")',
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl ml-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-orange-500 animate-fadeInUp whitespace-nowrap">
            Phòng Khám Đông Dương
          </h1>
          
          <div className="border-l-4 border-orange-500 pl-4 mb-8">
            <p className="text-lg md:text-xl text-orange-100 leading-relaxed animate-fadeInUp delay-100">
              Nơi y học hiện đại kết hợp với tấm lòng tận tâm, mang đến cho bạn sức khỏe trọn vẹn và niềm tin bền vững.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-end animate-fadeInUp delay-200">
            <a 
              href="#services" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
            >
              Khám Phá Dịch Vụ
            </a>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;





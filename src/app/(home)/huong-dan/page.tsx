// src/app/huong-dan/page.tsx
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const HuongDanPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-8 text-center">HƯỚNG DẪN KHÁCH HÀNG</h1>

          <section className="mb-10 p-6 bg-indigo-50 rounded-lg">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
              <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
              Cách đặt lịch khám
            </h2>
            <div className="space-y-4 pl-11">
            <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>  <div className="flex items-start">
                <span className="bg-white text-indigo-600 font-bold py-1 px-3 rounded-full mr-3 shadow-sm">Cách 1</span>
                <p className="text-gray-700">Đặt lịch khám trực tiếp tại phòng khám</p>
              </div></AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Đến trực tiếp phòng khám tại địa chỉ 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM.
          </p>
          <p>
            Nhân viên lễ tân sẽ hỗ trợ bạn điền thông tin và sắp xếp lịch khám.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger><div className="flex items-start">
                <span className="bg-white text-indigo-600 font-bold py-1 px-3 rounded-full mr-3 shadow-sm">Cách 2</span>
                <p className="text-gray-700">Đặt lịch khám trên website</p>
              </div></AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Bước 1: Truy cập vào trang web của phòng khám.
          </p>
          <p>
            Bước 2: Điền thông tin cá nhân
          </p>
          <p>
            Bước 3: Chọn ngày và giờ khám
          </p>
          <p>
            Bước 4: Chọn chuyên khoa và bác sĩ
          </p>
          <p>
            Bước 5: Nhấn nút <strong>Đặt lịch ngay</strong> 
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
            
              
            </div>
          </section>

          <section className="mb-10 p-6 bg-indigo-50 rounded-lg">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
              <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
              Thời gian làm việc
            </h2>
            <div className="pl-11 space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-gray-700">Thứ 2 – Chủ Nhật: <span className="font-semibold">7h30 – 17h30</span></p>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-gray-700">Thời gian nghỉ trưa: <span className="font-semibold">11h30-13h30</span></p>
              </div>
            </div>
          </section>

          <section className="mb-6 p-6 bg-indigo-50 rounded-lg">
<h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
              <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
              Hình thức thanh toán
            </h2>
            <div className="pl-11 space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p className="text-gray-700">Thanh toán bằng tiền mặt, thẻ ATM, ví điện tử</p>
              </div>
              <div className="flex items-start mt-4 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <p className="text-yellow-800 font-medium">Lưu ý: chỉ nhận thanh toán trực tiếp tại phòng khám</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
    </div>
  );
};

export default HuongDanPage;
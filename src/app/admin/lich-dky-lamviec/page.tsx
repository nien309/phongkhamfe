import WorkScheduleRegistration from '@/components/WorkScheduleRegistration'
import React from 'react'

export default function LichDangKiLamViecPage() {
  return (
    <div className="p-6">
      <div className="text-center text-2xl font-semibold text-gray-800 mb-6">
        Lịch đăng ký làm việc của bác sĩ
      </div>
      <WorkScheduleRegistration />
    </div>
  )
}

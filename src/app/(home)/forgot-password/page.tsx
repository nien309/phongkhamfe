'use client'
import { useState } from 'react'
import axios from 'axios'

export default function ForgotPasswordForm() {
//   Sử dụng hook useState để quản lý các trạng thái:

// email: Lưu giá trị email nhập vào

// submitted: Flag kiểm tra đã submit thành công chưa

// error: Lưu thông báo lỗi nếu có

// isLoading: Trạng thái loading khi gọi API
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() //Ngăn chặn hành vi mặc định của form với e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await axios.post(
      // Gọi API POST đến endpoint /api/forgot-password với:

      // Base URL lấy từ biến môi trường NEXT_PUBLIC_API_BASE_URL

      // Body chứa email

      // Headers xác định kiểu dữ liệu JSON
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/forgot-password`, 
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )

      if (response.status >= 200 && response.status < 300) {
        setSubmitted(true)
      } else {
        throw new Error(response.data.message || 'Request failed')
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'An error occurred')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Quên mật khẩu</h2>

        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}

        {submitted ? (
          <p className="text-green-600 text-center">
            Nếu email hợp lệ, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.
          </p>
        ) : (
          <>
            <div className="space-y-2">
              <label className="block text-gray-600">Nhập email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email quản trị"
                required //bắt buộc nhập email
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition duration-200 ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
            </button>
          </>
        )}
      </form>
    </div>
  )
}
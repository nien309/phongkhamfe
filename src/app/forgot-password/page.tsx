'use client'
import { useState } from 'react'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Gửi yêu cầu quên mật khẩu đến API
    // await fetch('/api/admin/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // })

    setSubmitted(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Quên mật khẩu</h2>

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
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Gửi yêu cầu
            </button>
          </>
        )}
      </form>
    </div>
  )
}

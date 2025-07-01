// 'use client'
// // import { useRouter } from 'next/navigation'
// import { useState } from 'react'

// export default function AdminLoginForm() {
// //   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     // Call API kiểm tra thông tin đăng nhập
//     // const res = await fetch('/api/admin/login', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ email, password }),
//     //   headers: { 'Content-Type': 'application/json' }
//     // })

//     // if (res.ok) {
//     //   router.push('/admin/dashboard')
//     // } else {
//     //   alert('Đăng nhập thất bại')
//     // }
//   }

//   return (
//     <form onSubmit={handleLogin}>
//       <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mật khẩu" />
//       <button type="submit">Đăng nhập</button>
//     </form>
//   )
// }

'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, user, isLoading}= useAuth()
  const router = useRouter()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Gửi thông tin đăng nhập đến API
    login({ email, matkhau: password })
  }
 useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user) {
    // Show loading state while redirecting
    return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Đăng nhập</h2>

        <div className="space-y-2">
          <label className="block text-gray-600">Email</label>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600">Mật khẩu</label>
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  )
}

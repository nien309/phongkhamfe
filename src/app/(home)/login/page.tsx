// 'use client'
// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useAuth } from '@/context/AuthContext'
// import { useRouter } from 'next/navigation'

// export default function AdminLoginForm() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const {login, user, isLoading}= useAuth()
//   const router = useRouter()
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // Gửi thông tin đăng nhập đến API
//     login({ email, matkhau: password })
//   }
//  useEffect(() => {
//     if (!isLoading && user) {
//       router.push('/');
//     }
//   }, [user, isLoading, router]);

//   if (isLoading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   if (user) {
//     // Show loading state while redirecting
//     return <div className="flex items-center justify-center min-h-screen">Redirecting...</div>;
//   }
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form 
//         onSubmit={handleLogin} 
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">Đăng nhập</h2>

//         <div className="space-y-2">
//           <label className="block text-gray-600">Email</label>
//           <input 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             type="email"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="block text-gray-600">Mật khẩu</label>
//           <input 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Mật khẩu"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <div className="flex justify-between">
//           <div className="text-left">
//             <Link href="/register" className="text-sm text-blue-600 hover:underline">
//               Đăng ký
//             </Link>
//           </div>
//           <div className="text-right">
//             <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//               Quên mật khẩu?
//             </Link>
//           </div>
//           </div>
//         </div>

//         <button 
//           type="submit"
//           className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
//         >
//           Đăng nhập
//         </button>
//       </form>
//     </div>
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
  const [error, setError] = useState('')

  const { login, user, isLoading } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // Clear previous errors

    try {
      await login({ email, matkhau: password }) // Gọi login từ context
    } catch {
      setError('Sai thông tin đăng nhập. Vui lòng thử lại.')
    }
  }
 

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Redirecting...
      </div>
    )
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

          <div className="flex justify-between">
            <div className="text-left">
              <Link href="/register" className="text-sm text-blue-600 hover:underline">
                Đăng ký
              </Link>
            </div>
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

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

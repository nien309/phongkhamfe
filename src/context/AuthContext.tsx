// contexts/AuthContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

// Types
interface User {
    id_taikhoan: string
    hoten: string
    matkhau: string
    gioitinh: string
    ngaysinh: string
    diachi: string
    sdt: string
    email: string
    trangthai: string
    loai_taikhoan: string
    id_nguoidung: string
    phan_quyen: string
  // Add other user properties as needed
}

interface LoginCredentials {
  email: string
  matkhau: string
}

// interface RegisterCredentials {
//   email: string
//   password: string
//   name: string
//   // Add other registration fields as needed
// }

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
//   register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

// API URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const LOGIN_URL = `${API_BASE_URL}/api/login`
// const REGISTER_URL = `${API_BASE_URL}/api/register`
const LOGOUT_URL = `${API_BASE_URL}/api/logout`
const GET_USER_URL = (userId: string) => `${API_BASE_URL}/api/admin/taikhoan/${userId}`

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
//   withCredentials: true, // Important for cookie-based auth
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Token will be automatically sent via cookies due to withCredentials: true
    // If you need to send token in headers instead, uncomment below:
    const token = getCookie('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
    //   window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = getCookie('token')
      if (!token) {
        setIsLoading(false)
        return
      }

      // If token exists, try to get user data
      // You might need to decode the token to get userId or have it stored separately
      const userId = getCookie('userId') // Assuming userId is stored in a separate cookie
      if (userId) {
        await fetchUser(userId)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUser = async (userId: string) => {
    try {
      const response: AxiosResponse<User> = await apiClient.get(GET_USER_URL(userId))
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setUser(null)
      throw error
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response: AxiosResponse<{ taikhoan: User; token: string }> = await apiClient.post(
        LOGIN_URL,
        credentials
      )

      const { taikhoan: userData, token } = response.data
      // Set user data
      setUser(userData)

      // Cookie should be set by the server, but if you need to set it client-side:
      document.cookie = `token=${token}; path=/; secure; samesite=strict`
      document.cookie = `userId=${userData.id_taikhoan}; path=/; secure; samesite=strict`

      // Redirect to dashboard or intended page
      router.push('/admin')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

//   const register = async (credentials: RegisterCredentials) => {
//     try {
//       setIsLoading(true)
//       const response: AxiosResponse<{ user: User; token: string }> = await apiClient.post(
//         REGISTER_URL,
//         credentials
//       )

//       const { user: userData, token } = response.data

//       // Set user data
//       setUser(userData)

//       // Cookie should be set by the server
//       // Redirect to dashboard
//       router.push('/admin')
//     } catch (error) {
//       console.error('Registration failed:', error)
//       throw error
//     } finally {
//       setIsLoading(false)
//     }
//   }

  const logout = async () => {
    try {
      setIsLoading(true)
      await apiClient.post(LOGOUT_URL)

      // Clear user data
      setUser(null)

      // Clear cookies (if needed client-side)
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'

      // Redirect to login
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      // Clear user data anyway
      setUser(null)
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUser = async () => {
    try {
      const userId = getCookie('userId')
      if (userId) {
        await fetchUser(userId)
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
      throw error
    }
  }

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    // register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protecting routes
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login')
      }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`

  return AuthenticatedComponent
}

export default AuthContext
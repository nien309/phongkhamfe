import axios from "axios"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
// Create axios instance with default config
export const apiClient = axios.create({
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
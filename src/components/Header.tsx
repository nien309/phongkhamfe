'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User } from 'lucide-react';
import AuthForm from './ui/AuthForm'; // ✅ Import AuthForm
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'TRANG CHỦ', href: '/' },
  { label: 'CHUYÊN KHOA', href: '/chuyen-khoa' },
  { label: 'BÁC SĨ', href: '/bac-si' },
  { label: 'DỊCH VỤ', href: '/dich-vu' },
  { label: 'ĐẶT LỊCH KHÁM', href: '/dat-lich' },
  { label: 'HƯỚNG DẪN KHÁCH HÀNG', href: '/huong-dan' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false); // ✅ State cho modal
  const {user, logout}  = useAuth(); // ✅ Import useAuth hook
  const router = useRouter();
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-[100px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-[100px] w-[100px] relative overflow-hidden">
            <Image
              src="/images/logo-phongkham.jpg"
              alt="Logo Đông Dương"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="hover:text-blue-600">
              {item.label}
            </Link>
          ))}

          {/* Icon người dùng */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              aria-label="User menu"
            >
              <User size={20} />
            </button>

            {showMenu && (
              user ? (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border rounded shadow-md w-40 z-50">
                  <div className="flex flex-col">
                    <Link
                      href="/ho-so"
                      className="px-4 py-2 text-sm text-center text-black hover:bg-gray-100"
                      onClick={() => setShowMenu(false)}
                    >
                      Hồ Sơ
                    </Link>
                    <button
                      onClick={() => {
                        logout(); // ✅ Gọi hàm logout từ useAuth
                        // Xử lý đăng xuất ở đây
                        setShowMenu(false);
                      }}
                      className="px-4 py-2 text-sm text-center text-black hover:bg-gray-100 cursor-pointer"
                    >
                      Đăng Xuất
                    </button>
                  </div>
                </div>
              ) : (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white border rounded shadow-md w-40 z-50">
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      router.push('/login'); // Chuyển hướng đến trang đăng nhập
                    }}
                    className="px-4 py-2 text-sm text-center text-black hover:bg-gray-100 cursor-pointer"
                  >
                    Đăng Nhập
                  </button>
                 
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow px-4 pb-4">
          <nav className="flex flex-col space-y-3 text-gray-700">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* User menu on mobile */}
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => {
                  setShowAuthForm(true);
                  setIsOpen(false);
                }}
                className="bg-gray-100 text-black px-3 py-1 rounded text-sm hover:bg-gray-200"
              >
                Đăng nhập
              </button>
              <button className="bg-gray-100 text-black px-3 py-1 rounded text-sm hover:bg-gray-200">
                Đăng xuất
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Modal AuthForm */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px] max-w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAuthForm(false)}
            >
              ✖
            </button>
            <AuthForm />
          </div>
        </div>
      )}

    </header>
  );
}

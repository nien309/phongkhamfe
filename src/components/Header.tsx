// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Chuyên khoa', href: '/chuyen-khoa' },
  { label: 'Bác sĩ', href: '/bac-si' },
  { label: 'Dịch vụ', href: '/dich-vu' },
  { label: 'Đặt lịch khám', href: '/dat-lich' },
  { label: 'Hướng dẫn khách hàng', href: '/huong-dan' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
     <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"> 
        {/* Tên phòng khám */}
        <Link href="/" className="text-2xl font-semibold text-blue-700">
          Đông Dương
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="hover:text-blue-600">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Menu mobile toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
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
          </nav>
        </div>
      )}
    </header>
  );
}

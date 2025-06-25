'use client';

import React, { useState } from 'react';
import styles from './AuthForm.module.css'; // ✅ Import CSS module

type FormType = 'login' | 'register';

export default function AuthForm() {
  const [formType, setFormType] = useState<FormType>('login');

  const toggleForm = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{formType === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
      <form className={styles.form}>
        {formType === 'register' && (
          <>
            <input type="text" placeholder="Họ tên" required />
            <input type="date" placeholder="Ngày sinh" required />
            <select required>
              <option value="">Giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            <input type="tel" placeholder="Số điện thoại" required />
          </>
        )}

        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mật khẩu" required />

        {formType === 'register' && <input type="text" placeholder="Địa chỉ" required />}

        <button type="submit" className={styles.submit}>
          {formType === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
        </button>
      </form>

      <p className={styles.toggle}>
        {formType === 'login' ? (
          <>
            Bạn chưa có tài khoản?{' '}
            <span onClick={toggleForm}>Đăng ký</span>
          </>
        ) : (
          <>
            Đã có tài khoản?{' '}
            <span onClick={toggleForm}>Đăng nhập</span>
          </>
        )}
      </p>
    </div>
  );
}

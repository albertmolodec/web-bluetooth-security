import React from 'react';
import Link from 'next/link';

import './index.css';

function Header() {
  return (
    <>
      <div>
        Лампочка{' '}
        <span role="img" aria-label="лампочка">
          💡
        </span>
      </div>
      <nav>
        <Link href="/">
          <a>Панель управления</a>
        </Link>
        {' | '}
        <Link href="/login">
          <a>Войти</a>
        </Link>
        {' | '}
        <Link href="/register">
          <a>Регистрация</a>
        </Link>
      </nav>
    </>
  );
}

export default Header;

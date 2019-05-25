import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.css';

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
        <NavLink to="/dashboard" activeClassName="selected">
          Панель управления
        </NavLink>
        {' | '}
        <NavLink to="/login" activeClassName="selected">
          Войти
        </NavLink>
        {' | '}
        <NavLink to="/register" activeClassName="selected">
          Регистрация
        </NavLink>
      </nav>
    </>
  );
}

export default Header;

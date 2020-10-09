import React, { useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
// import { useLayoutEffect } from 'react';

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место. Россия" />
      {
        (location.pathname === '/')
          ? <>
            <p className="header__email">{email}</p>
            <button className="header__sing-out-button" tabIndex="0" onClick={onSignOut}>Выйти</button>
          </>
          : <Link to={(location.pathname === '/sign-in') ? '/sign-up' : '/sign-in'} className="header__auth-link">
            {(location.pathname === '/sign-in') ? 'Регистрация' : 'Вход'}
          </Link>
      }
    </header>
  );
}

export default Header;

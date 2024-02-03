import React from 'react';
import { Link, useLocation} from 'react-router-dom';

function Header(props) {

  const location = useLocation();

  function handleLogoutClick() {
    props.onLogout();
  }

  return (
   <header className="header">
      <div className="header__logo"></div>

      {location.pathname === '/' && (
        <nav className="header__menu">
          <p className="header__email">{props.currentEmail}</p>
          <Link onClick={handleLogoutClick} to="/sign-in" className="header__link">Выйти</Link>
        </nav>
      )}

      {location.pathname === '/sign-in' && (
        <nav className="header__menu">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </nav>
      )}

      {location.pathname === '/sign-up' && (
        <nav className="header__menu">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </nav>
      )}

   </header>
  );
}
   
export default Header;
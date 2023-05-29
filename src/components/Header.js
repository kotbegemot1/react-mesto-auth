import { useState } from "react"
import Logo from '../images/Logo.svg'
import { Link, Routes, Route } from 'react-router-dom';

export default function Header(props) {

  const [isMobileMenu, setIsMobileMenu] = useState(false);

  function useMobileMenu() {
    setIsMobileMenu(!isMobileMenu);
  }

  function handleSignOut() {
    setIsMobileMenu(false)
    props.signOut()
  }

  return (
    <header className="header">
      <div className={`header__logo ${isMobileMenu && "header__logo_type_mob-menu"}`} src={Logo}></div>

      {props.loggedIn &&
        <button
          type="button"
          onClick={useMobileMenu}
          className={`header__mobile-btn button ${isMobileMenu && "header__mobile-btn_type_active"}`}
        ></button>}

      <div className={`header__user-auth 
                    ${props.loggedIn ? '' : "header__user-auth_type_not-auth"} 
                    ${isMobileMenu && "header__user-auth_type_mob-menu"} `}>


        <p className="header__email">{props.userEmail && props.userEmail}</p>

        <Routes>
          <Route path='/' element={
            <button
              type="button"
              onClick={handleSignOut}
              className={`header__auth-btn button ${isMobileMenu && "header__auth-btn_type_mob-menu"}`}
            >Выйти</button>
          }
          />
          <Route path='/sign-in' element={
            <Link to='/sign-up' className="header__auth-btn button">Регистрация</Link>
          }
          />
          <Route path='/sign-up' element={
            <Link to='/sign-in' className="header__auth-btn button">Войти</Link>
          }
          />
        </Routes>

      </div>
    </header>
  )
}

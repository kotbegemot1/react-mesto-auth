import React from "react"
import Logo from '../images/Logo.svg'
import { useLocation, Link } from 'react-router-dom';

export default function Header(props) {
  const location = useLocation();

  const [isMobileMenu, setIsMobileMenu] = React.useState(false);

  const getLinkInfo = (function () {
    return location.pathname === "/sign-up" ?
      { linkName: 'Войти', path: '/sign-in' } :
      { linkName: 'Регистрация', path: '/sign-up' };

  }())

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

        {props.loggedIn
          ?
          <button
            type="button"
            onClick={handleSignOut}
            className={`header__auth-btn button ${isMobileMenu && "header__auth-btn_type_mob-menu"}`}
          >Выйти</button>
          :
          <Link to={getLinkInfo.path} className="header__auth-btn button">{getLinkInfo.linkName}</Link>
        }

      </div>
    </header>
  )
}

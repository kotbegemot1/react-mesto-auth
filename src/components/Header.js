import React from "react"
import Logo from '../images/Logo.svg'

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo" src={Logo}></div>
      <div className="header__user-auth">
        <p className="header__email">email@mail.com</p>
        <a className="header__auth">Выйти</a>
        </div> 
    </header>
    )
}

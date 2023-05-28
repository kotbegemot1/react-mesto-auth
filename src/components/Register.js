import React from "react"
import Auth from './Auth'

export default function Register(props) {

  const loginLink = (
    <p className="popup__additional-question">Уже зарегистрировались? Войти</p>
  )

  return (
    <Auth
      title="Регистрация"
      formName="register"
      buttonText="Зарегистрироваться"
      loginLink={loginLink}
    >
      <input
        type="email"
        id="email-input"
        name="email"
        className="popup__input-info popup_input-info_type_auth popup__input-info_field_email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="email-input-error popup__error"></span>

      <input
        type="password"
        id="password-input"
        name="password"
        className="popup__input-info popup_input-info_type_auth popup__input-info_field_password"
        placeholder="Пароль"
        minLength="8"
        maxLength="40"
        required
      />
      <span className="password-input-error popup__error"></span>
    </Auth>

  )
}
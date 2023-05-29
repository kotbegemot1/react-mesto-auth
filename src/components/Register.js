import { useState } from "react"
import {Link} from 'react-router-dom';
import AuthForm from './AuthForm'

export default function Register(props) {

  const loginLink = (
    <Link to='/sign-in' className="popup__additional-question button">Уже зарегистрировались? Войти</Link>
  )

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(formValue);
  }

  return (
    <AuthForm
      title="Регистрация"
      formName="register"
      buttonText="Зарегистрироваться"
      loginLink={loginLink}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        id="email-input"
        name="email"
        onChange={handleChange}
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
        onChange={handleChange}
        className="popup__input-info popup_input-info_type_auth popup__input-info_field_password"
        placeholder="Пароль"
        minLength="8"
        maxLength="40"
        required
      />
      <span className="password-input-error popup__error"></span>
    </AuthForm>

  )
}
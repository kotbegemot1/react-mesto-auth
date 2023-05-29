import React from "react";

export default function AuthForm(props) {

  return (
    <section className="auth">
      <div className="popup__container popup__container_type_auth">
        <h3 className="popup__title popup__title_type_auth">{props.title}</h3>
        <form action="/" name={props.formName} onSubmit={props.onSubmit} className="popup__form" noValidate>

          {props.children}

          <button type="submit" className="popup__save-button button popup__save-button_type_auth">{props.buttonText}</button>
          {props.loginLink}

        </form>
      </div>
    </section>
  )
}
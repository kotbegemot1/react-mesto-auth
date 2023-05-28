import React from "react"

export default function PopupWithForm(props) {
  // console.log(props.isOpen);
  return (
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className={`popup__container popup__container_type_${props.name}`}>
          <button type="reset" onClick={props.onClose} className="popup__abort-button button"></button>
          <h3 className="popup__title">{props.title}</h3>
          <form action="/" name={props.name} onSubmit={props.onSubmit} className={`popup__form popup__form_type_${props.name}`} noValidate>

            {props.children}

            <button type="submit" className="popup__save-button button">{props.buttonText}</button>
          </form>
        </div>
      </div>
  )
}
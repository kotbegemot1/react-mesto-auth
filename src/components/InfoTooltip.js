import React from "react"
import ConfirmImg from '../images/confirmed_popup.png'

export default function InfoTooltip(props) {
  return (
    <div className="popup popup_opened">
      <div className="popup__container popup__container_type_reg-conf">
      <button type="reset" className="popup__abort-button button "></button>
        <img className="popup__image" alt="" src={ConfirmImg} />
        <h3 className="popup__title popup__title_type_reg-conf">Вы успешно зарегистрировались!</h3>
        </div>
    </div>
  )
}
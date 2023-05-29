import ConfirmImg from '../images/confirmed_popup.png'
import ErrorImg from '../images/error_conf_popup.png'

export default function InfoTooltip(props) {
  const alt = props.isConfirmReg ? 'Успешная регистрация' : 'Ошибка регистрации';
  const src = props.isConfirmReg ? ConfirmImg : ErrorImg;
  return (
    <div className={`popup ${ props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_reg-conf">
      <button type="reset" onClick={props.onClose} className="popup__abort-button button "></button>
        <img className="popup__image" alt={alt} src={src} />
        <h3 className="popup__title popup__title_type_reg-conf">{props.tooltipTitle}</h3>
        </div>
    </div>
  )
}
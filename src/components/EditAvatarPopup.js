import React from "react";

import PopupWithForm from './PopupWithForm'

export default function EditProfilePopup(props) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar-update'
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      buttonText= {props.isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        type="url"
        id="avatar-input"
        name="avatar"
        ref={avatarRef}
        placeholder="Ссылка на аватар"
        className="popup__input-info popup__input-info_field_avatar"
        required
      />
      <span className="avatar-input-error popup__error"></span>
    </PopupWithForm>
  )
}
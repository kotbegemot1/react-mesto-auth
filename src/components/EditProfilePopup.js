import React from "react";

import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from "../contexts/CurrentUserContext"

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }


  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      buttonText= {props.isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        type="text"
        id="name-input"
        name="name"
        value={name || ''}
        onChange={handleNameChange}
        className="popup__input-info popup__input-info_field_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-input-error popup__error"></span>

      <input
        type="text"
        id="about-input"
        name="about"
        value={description || ''}
        onChange={handleDescriptionChange}
        className="popup__input-info popup__input-info_field_about"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="about-input-error popup__error"></span>
    </PopupWithForm>)
}
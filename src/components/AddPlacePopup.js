import React from "react";

import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup(props) {

  const [title, setTitle] = React.useState();
  const [link, setLink] = React.useState();

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: title,
      link
    });
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      buttonText= {props.isLoading ? "Сохранение..." : "Создать"}
    >
      <input
        type="text"
        id="title-input"
        name="title"
        value={title || ''}
        onChange={handleTitleChange}
        placeholder="Название"
        className="popup__input-info popup__input-info_field_title"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="title-input-error popup__error"></span>

      <input
        type="url"
        id="link-input"
        name="link"
        value={link || ''}
        onChange={handleLinkChange}
        placeholder="Ссылка на картинку"
        className="popup__input-info popup__input-info_field_link"
        required
      />
      <span className="link-input-error popup__error"></span>
    </PopupWithForm>
  )
}
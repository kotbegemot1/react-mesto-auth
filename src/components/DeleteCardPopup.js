import React from "react";

import PopupWithForm from './PopupWithForm'

export default function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard();
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      name='card-delete'
      onClose={props.onClose}
      isOpen={props.isOpen}
      buttonText= {props.isLoading ? "Удаление..." : "Да"}
      onSubmit={handleSubmit}
    />
  )
}
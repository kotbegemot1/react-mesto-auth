import React from "react"
import Basket from '../images/basket.svg'

export default function Card({card, currentUserId, onCardClick, onCardLike, onCardDelete}) {

  const isOwn = currentUserId === card.owner._id;
  const isLiked = card.likes.some(i => i._id === currentUserId);

  const cardLikeButtonClassName = ( 
    `element__like button ${isLiked && 'element__like_active'}` 
  );

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={`Изображение  ${card.name}`} onClick={handleClick} />
      {isOwn && <button type="button" onClick={handleDeleteClick} className="element__delete button"><img alt="корзина" src ={Basket} /></button>}
      <div className="element__desc">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}
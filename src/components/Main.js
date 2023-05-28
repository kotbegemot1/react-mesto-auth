import React from "react"
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

import Card from './Card'

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img alt="Аватар профайла" src={currentUser.avatar} onClick={props.onEditAvatar} className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button type="button" onClick={props.onEditProfile} className="profile__edit button"></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" onClick={props.onAddPlace} className="profile__add-new button"></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            currentUserId={currentUser._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

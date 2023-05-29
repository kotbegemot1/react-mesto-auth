import React from "react";


import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { CurrentUserContext } from '.././contexts/CurrentUserContext';
import { CardContext } from '.././contexts/CardContext';

import { api } from '../utils/api';
import { auth } from '../utils/auth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isOpenImage, setIsOpenImage] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [tooltipTitle, setTooltipTitle] = React.useState('');
  const [isConfirmReg, setIsConfirmReg] = React.useState();

  const [currentUser, setCurrentUser] = React.useState({});
  const [cardList, setCardList] = React.useState([]);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);
  
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const navigate = useNavigate();

  // клик по картинке 
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsOpenImage(true);
  }

  // клик по лайку карточки
  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCardList((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch((err) => console.log(err));
  }

  // хендлер для сабмита удаления карточки
  function handleCardDelete() {
    setIsLoading(true)
    api.deleteCard(selectedCard._id).then(() => {
      setCardList(state => state.filter(c => c._id !== selectedCard._id));
      closeAllPopups()
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false))
  }

  // клик по кнопке удаления на карточке
  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  // клик на кнопку изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  // сабмит обновления аватара
  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api.updateUserAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  // открытие попапа изменения профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleUpdateUser(inputedUserData) {
    setIsLoading(true)
    api.editUserInfo(inputedUserData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlace(inputedCardData) {
    setIsLoading(true)
    api.addNewCard(inputedCardData)
      .then((newCardData) => {
        setCardList([newCardData, ...cardList]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleAuth(formValue) {
    auth.Login(formValue.email, formValue.password)
    .then((data)=>{
      if (data.token){
        // setUserEmail(formValue.email)
        setLoggedIn(true);
        localStorage.setItem('token', data.token)
        navigate('/', {replace: true})
      }
    })
    .catch((err) => console.log(err))
  }
  
  function confirmReg(){
    setIsConfirmReg(true)
    setTooltipTitle('Вы успешно зарегистрировались!')
    setIsInfoTooltipPopupOpen(true);
  }

  function disproveReg(){
    setIsConfirmReg(false)
    setTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.')
    setIsInfoTooltipPopupOpen(true);
  }

  function handleRegister(formValue) {
    auth.Register(formValue.email, formValue.password)
    .then((res)=>{
      confirmReg();
      navigate('/sign-in', {replace: true});
    })
    .catch((err) => disproveReg())
  }

  function signOut() {
    setLoggedIn(false)
    localStorage.removeItem('token')
    setUserEmail('');
    navigate('/sign-in', {replace: true})
    
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsOpenImage(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }
  React.useEffect(() => {
    (function tokenCheck() {
      if (localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        auth.checkToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate('/', {replace: true})
        })
        .catch((err) => console.log(err))
      }
    }());
  }, [navigate]);
  
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCardList(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={cardList}>
          <Header userEmail={userEmail} loggedIn={loggedIn} signOut={signOut}/>
          <Routes>
              <Route path="/react-mesto-auth" element={<Navigate to="/" replace />} />
              <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
              <Route path="/sign-in" element={<Login onLogin={handleAuth}/>} />
              <Route path="/" element={
                      <ProtectedRoute 
                        element={Main}
                        loggedIn={loggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDeleteClick}
                      />
              }/>
          </Routes>
          <Footer />
          
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isLoading}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isOpenImage}
            onClose={closeAllPopups}
          />
          <InfoTooltip 
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isConfirmReg={isConfirmReg}
            tooltipTitle={tooltipTitle}
          />

        </CardContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

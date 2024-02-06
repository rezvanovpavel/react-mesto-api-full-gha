import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState,useEffect } from 'react';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {SelectedCardContext} from '../contexts/SelectedCardContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import { authorize, register, checkToken } from '../utils/Auth';
import InfoTooltip from "./InfoTooltip";


function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]= useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen]= useState(false)
  
  const [selectedCard, setSelectedCard] = useState({})

  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards]= useState([])

  const [loggedIn, setLoggedIn]= useState(false)

  const [currentEmail, setCurrentEmail] = useState('');

  const navigate = useNavigate();

  const [isSuccessInfoTooltip, setIsSuccessInfoTooltip] = useState(false);

  useEffect(() => {
   if (loggedIn) {
      Promise.all([
       api.getUserInfo(),
       api.getInitialCards()
     ])
        .then((results) => {
         setCurrentUser(results[0])
         setCards(results[1])
        })
        .catch((err) => {
         console.log(err);
        });
   }
  },[loggedIn]);
  
  function handleEditAvatarClick() {
   setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  
  function handleEditProfileClick() {
   setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  
  function handleAddPlaceClick() {
   setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleCardClick(card) {
   setSelectedCard(card);
  };

  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  function handleCardLike(card) {
   // Снова проверяем, есть ли уже лайк на этой карточке
   const isLiked = card.likes.some(i => i === currentUser._id);
   
   // Отправляем запрос в API и получаем обновлённые данные карточки
   api.changeLikeCardStatus(card._id, !isLiked)
   .then((newCard) => {
       setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
   })
   .catch((err) => {
    console.log(err);
   });
  }
  
  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    api.updateUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    api.editAvatar(avatarInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(placeInfo) {
    api.addNewCards(placeInfo)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin (e) {
     e.preventDefault();
     setLoggedIn(true)
  }
  
  function handleRegisterSubmit({ password, email }) {
   register(password, email)
     .then((res) => {
       if (res) {
        setIsSuccessInfoTooltip(true);
        setIsInfoTooltipOpen(true);
        navigate('/sign-in', {replace: true});
       }
     })
     .catch((err) => {
       setIsSuccessInfoTooltip(false);
       setIsInfoTooltipOpen(true);
       console.log(`Ошибка: ${err.status}`);
     });
  }
  
  function handleTokenCheck () {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      checkToken(token)
      .then((res) => {
        if (res.data){
          setCurrentEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", {replace: true})
        }
      })
      .catch((err) => {
       console.log(`Ошибка: ${err.status}`);
      });
    }
  }

  useEffect(() => {
   handleTokenCheck();
  }, [])

  function handleLogout() {
   setCurrentEmail('');
   setLoggedIn(false);
   localStorage.removeItem('token');
  }

  function handleLoginSubmit({ password, email }) {
   authorize(password, email)
     .then((data) => {
       if (data.token) {
         setCurrentEmail(email);
         localStorage.setItem('token', data.token);
         setLoggedIn(true);
         navigate("/", {replace: true});
       }
     })
     .catch((err) => {
       setIsSuccessInfoTooltip(false);
       setIsInfoTooltipOpen(true);
       console.log(`Ошибка: ${err.status}`);
     });
  }

  return (
         <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <SelectedCardContext.Provider value={selectedCard}>
              <Header onLogout={handleLogout} currentEmail={currentEmail}/>
              <Routes>
                <Route path="/" element={loggedIn ?
                        <Main onCardDelete = {handleCardDelete} onCardLike = {handleCardLike} onEditAvatar = {handleEditAvatarClick} onEditProfile = {handleEditProfileClick} onAddPlace = {handleAddPlaceClick} onCardClick={handleCardClick} cards={cards}/>
                    : <Navigate to="/sign-in" replace />}/>
                <Route path="/" element={<ProtectedRoute element={Main} loggedIn={loggedIn}/>} />
                <Route path="/sign-up" element={
                    <Register onSubmit = {handleRegisterSubmit}/>
                  }/>
                <Route path="/sign-in" element={
                    <Login onSubmit = {handleLoginSubmit} handleLogin={handleLogin}/>
                  }/>
              </Routes>
              <Footer />
              <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
              <AddPlacePopup onAddPlace = {handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
              <PopupWithForm title ="Вы уверены?" name="delete-popup-card"/>
              <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} /> 
              <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
              <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isSuccessInfoTooltip}/>
            </SelectedCardContext.Provider>
          </CurrentUserContext.Provider>
         </div>
        
      
  );
}

export default App;

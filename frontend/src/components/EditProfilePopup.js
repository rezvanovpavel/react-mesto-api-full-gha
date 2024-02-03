import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState,useEffect } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm onSubmit={handleSubmit} title ="Редактировать профиль" name="edit-popup" buttonText='Сохранить' isOpen={props.isOpen} onClose={props.onClose}>
     <input value={name || ''} onChange={handleNameChange} id="name-input" type="text" className="popup__input" placeholder="Имя" name="name" minLength={2} maxLength={40} required=""/>          
     <span className="name-input-error popup__input-error" />
     <input value={description || ''} onChange={handleDescriptionChange} id="vocation-input" type="text"className="popup__input" placeholder="Занятие" name="about" minLength={2} maxLength={200} required=""/>
     <span className="vocation-input-error popup__input-error" />
   </PopupWithForm>
  );
}
  
export default EditProfilePopup;
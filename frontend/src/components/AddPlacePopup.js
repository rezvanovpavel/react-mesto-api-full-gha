import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  
  const nameInputRef = React.useRef();
  const linkInputRef = React.useRef();

  function handleSubmit(e) {
   e.preventDefault();

   props.onAddPlace({
     name: nameInputRef.current.value,
     link: linkInputRef.current.value
   });
  }
  
  return (
    <PopupWithForm title ="Новое место" name="edit-popup-place" buttonText='Создать' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <input ref={nameInputRef} id="name-input-place" type="text" className="popup__input" name="name" placeholder="Название" minLength={2} maxLength={30} required=""/>
        <span className="name-input-place-error popup__input-error" />
        <input ref={linkInputRef} id="link-input-place" type="url" className="popup__input" name="link" placeholder="Ссылка на картинку" required=""/>
        <span className="link-input-place-error popup__input-error" />
    </PopupWithForm>
  );
}
   
export default AddPlacePopup;
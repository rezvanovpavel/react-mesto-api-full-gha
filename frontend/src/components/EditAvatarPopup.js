import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  
  const inputRef = React.useRef();

  function handleSubmit(e) {
   e.preventDefault();

   props.onUpdateAvatar({
     avatar: inputRef.current.value,
   });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} title ="Обновить аватар" name="update-popup-аvatar" buttonText='Сохранить' isOpen={props.isOpen} onClose={props.onClose}>
      <input ref={inputRef} id="link-input-avatar" type="url" className="popup__input" name="link" placeholder="Ссылка на картинку аватара" required=""/>
      <span className="link-input-avatar-error popup__input-error" />
    </PopupWithForm>
  );
}
   
export default EditAvatarPopup;
import React from 'react';

function PopupWithForm(props) {
  return (
   <>
    <div className={`popup ${props.isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__content">
        <form className="popup__form" name={`${props.name}`} noValidate="" onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save-button">{props.buttonText}</button>
        </form>    
        <button onClick={props.onClose} type="button" className="popup__close-button"/>  
      </div>
    </div>
   </>
  );
}
   
export default PopupWithForm;
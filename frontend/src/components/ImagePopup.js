import React from 'react';

function ImagePopup(props) {
  return (
   <div id="edit-popup-image" className={`popup popup_of_image ${Object.keys(props.card).length !== 0 ? "popup_is-opened" : ""}`}>
     <div className="popup__content popup__content_of_image">
       <img className="popup__image" src={`${props.card.link}`} alt="картинка карточки" />
       <h2 className="popup__title popup__title_of_image">{props.card.name}</h2>
       <button onClick={props.onClose} type="button" id="close-popup-image-button" className="popup__close-button popup__close-button_of_image"/>  
     </div>
   </div>
  );
}
  
export default ImagePopup;
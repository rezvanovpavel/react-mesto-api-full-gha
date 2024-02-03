import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `element__button ${isLiked && 'element__button_active'}` 
  );; 
 
  function handleClick() {
   props.onCardClick(props.card);
  }
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img className="element__landscape" id="open-popup-image-button" src = {props.card.link} alt="картинка карточки" onClick={handleClick}/>
      {isOwn && <button type="button" className="element__trash" onClick={handleDeleteClick}/>}
      <div className="element__title-button">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__button-number">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
            <span className="element__number">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
  
export default Card;
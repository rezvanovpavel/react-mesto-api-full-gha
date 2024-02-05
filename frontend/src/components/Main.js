import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
   <main className="content">
     <section className="profile">
       <div className="avatar-button" onClick={props.onEditAvatar}>
         <img className="avatar" src= {currentUser.avatar} alt="аватар"/>
         <button type="button" className="avatar-button__edit-button" />
       </div>
       <div className="profile-info">
         <h1 className="profile-info__title">{currentUser.name}</h1>
         <p className="profile-info__text">{currentUser.about}</p>
         <button onClick={props.onEditProfile} type="button" id="open-popup-button" className="profile-info__edit-button"/>  
       </div>
       <button onClick={props.onAddPlace} type="button" id="open-popup-button-place" className="add-button"/>
     </section>
     <section className="elements">
           {
             props.cards.map(card => {
               return (
                <Card onCardDelete = {props.onCardDelete} onCardLike = {props.onCardLike} card={card} onCardClick={props.onCardClick} key={card._id}/>
               )
             })
           }
     </section>
   </main>
  );
}
   
 export default Main;
import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {

  return (
    <div className={`popup popup_type_info-tooltip ${(props.isOpen) ? "popup_is-opened" : ''}`}>
      <div className="popup__content popup__content_type_info-tooltip">
        <img className="popup__icon" src={props.isSuccess ? success : error} alt="Картинка подсказки" />
        <h2 className="popup__title popup__title_type_info-tooltip">
          {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
        <button onClick={props.onClose} className="popup__close-button" type="button" />
      </div>
    </div>
  );
}

export default InfoTooltip;
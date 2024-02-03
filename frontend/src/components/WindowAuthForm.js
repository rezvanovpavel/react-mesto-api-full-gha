import React from 'react';

function WindowAuthForm(props) {
  return (
    <div className="window">
      <form className="window__form" name="" noValidate onSubmit={props.onSubmit}>
          <h2 className="window__heading">{props.heading}</h2>
          {[props.children[0],props.children[1]]}
          <button type="submit" className="window__button">{props.buttonnText}</button>
      </form>
      {props.children[2]}
    </div>
  );
}
   
export default WindowAuthForm;
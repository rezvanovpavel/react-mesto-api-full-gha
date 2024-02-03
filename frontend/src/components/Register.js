import React from 'react';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import WindowAuthForm from './WindowAuthForm';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleChangeEmail(e) {
   setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({ password, email });
  } 

  return (
      <WindowAuthForm heading={"Регистрация"} onSubmit={handleSubmit} buttonnText={"Зарегистрироваться"}>
        <input onChange={handleChangeEmail} value={email} id="window-input-link" type="url" className="window__input" name="link" placeholder="Email" required=""/>
        <input onChange={handleChangePassword} value={password} id="window-input-password" type="password" className="window__input" name="password" placeholder="Пароль" required=""/>
        <p className="window__paragraph">Уже зарегистрированы?&nbsp;
          <Link className="window__link" to="/sign-in">
          Войти
          </Link>
        </p>
      </WindowAuthForm>
  );
}
   
export default Register;
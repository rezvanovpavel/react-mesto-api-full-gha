import React from 'react';
import WindowAuthForm from './WindowAuthForm';
import { useState } from 'react';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleChangeEmail(e) {
   setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    
       setEmail('');
       setPassword('');
       props.onSubmit({ password, email });
    }
     

  return (
    <WindowAuthForm heading={"Вход"} onSubmit={handleSubmit} buttonnText={"Войти"}>
      <input onChange={handleChangeEmail} value={email} id="window-input-url-login" type="url" className="window__input" name="link" placeholder="Email" required=""/>
      <input onChange={handleChangePassword} value={password} id="window-input-url-password" type="password" className="window__input" name="password" placeholder="Пароль" required=""/>
    </WindowAuthForm>
  );
}
   
export default Login;
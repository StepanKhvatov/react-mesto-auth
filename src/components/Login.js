import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import errorIcon from '../images/auth-error-icon.svg';
import * as auth from '../auth'; // переместить в app js и прокинуть пропсом

function Login({ setInfoTooltip, handleLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  function resetForm() {
    setEmail('');
    setPassword('');
    setMessage('');
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      setMessage('Не заполнены поля ввода');
      console.log(message);
    }

    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          resetForm();
          handleLogin();
        }
      })
      .catch((err) => {
        setInfoTooltip({ isOpen: true, icon: errorIcon, text: 'Что-то пошло не так! Попробуйте ещё раз' });
        setMessage(err);
        console.log(message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h3 className="auth-form__heading">Вход</h3>
        <input
          id="input-name-login"
          name="email"
          value={email}
          onChange={(evt) => { setEmail(evt.target.value); }}
          className="auth-form__input"
          type="email"
          minLength="2"
          maxLength="40"
          required
          placeholder="Email" />
        <span id="input-name-error" className="popup__error" />
        <input
          id="input-password-login"
          type="password"
          name="password"
          value={password}
          onChange={(evt) => { setPassword(evt.target.value); }}
          className="auth-form__input"
          minLength="2"
          maxLength="200"
          required
          placeholder="Пароль" />
        <span id="input-about-error" className="popup__error" />
        <button className="auth-form__submit-button" type="submit" aria-label="Войти">Войти</button>
        <p className="auth-form__subtitle">Ещё не зарегестрированы?<Link to="/sign-up" className="auth-form__link">Регистрация</Link></p>
      </form>
    </>
  );
}

export default Login;

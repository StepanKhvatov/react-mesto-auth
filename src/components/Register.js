import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import errorIcon from '../images/auth-error-icon.svg';
import successIcon from '../images/auth-success-icon.svg';

import * as auth from '../auth';

function Register({ handleLogin, setInfoTooltip }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const history = useHistory();

  function resetForm() {
    setEmail('');
    setPassword('');
    setMessage('');
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    auth.register(email, password)
      .then((res) => {
        if (!email || !password) {
          setInfoTooltip({ isOpen: true, icon: errorIcon, text: 'Что-то пошло не так! Попробуйте ещё раз' });
          setMessage(res);
          console.log(message);
          return;
        }
      })
      .catch((err) => {
        setMessage(err);
        setInfoTooltip({ isOpen: true, icon: errorIcon, text: 'Что-то пошло не так! Попробуйте ещё раз' });
      });

    setTimeout(() => {
      auth.authorize(email, password)
        .then((data) => {
          if (data.token) {
            resetForm();
            handleLogin();
            history.push('/');
            setInfoTooltip({ isOpen: true, icon: successIcon, text: 'Вы успешно зарегестрировались!' });
          }
        })
        .catch((err) => {
          setInfoTooltip({ isOpen: true, icon: errorIcon, text: 'Что-то пошло не так! Попробуйте ещё раз' });
          setMessage(err);
          console.log(message);
        });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h3 className="auth-form__heading">Регистрация</h3>
        <input
          id="input-email-register"
          name="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          className="auth-form__input"
          type="email"
          minLength="2"
          maxLength="40"
          required
          placeholder="Email" />
        <span id="input-name-error" className="popup__error" />
        <input
          id="input-password-register"
          name="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className="auth-form__input"
          type="password"
          minLength="2"
          maxLength="200"
          required
          placeholder="Пароль" />
        <span id="input-about-error" className="popup__error" />
        <button className="auth-form__submit-button" type="submit" aria-label="Войти">Зарегестрироваться</button>
        <p className="auth-form__subtitle">Уже зарегестрированы?<Link to="/sign-in" className="auth-form__link">Войти</Link></p>
      </form>
    </>
  );
}

export default Register;

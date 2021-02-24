import React from 'react';
import { NavLink } from 'react-router-dom';

function Register({ handleRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChange(evt) {
    if (evt.target.name === 'Email') {
      setEmail(evt.target.value);
    } else if (evt.target.name === 'Password') {
      setPassword(evt.target.value);
    }
  }

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email) {
      console.log('Не введен email');
      return;
    }
    if (!password) {
      console.log('Не введен пароль');
      return;
    }
    handleRegister(email, password);
    resetForm();
  }
  return (
    <section className='sign'>
      <h2 className='sign__title'>Регистрация</h2>
      <form
        className='sign__form'
        action='#'
        name='sign__form'
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          type='email'
          className='sign__input'
          name='Email'
          placeholder='Email'
          value={email}
          onChange={handleChange}
          required
        ></input>
        <input
          type='password'
          className='sign__input'
          name='Password'
          placeholder='Password'
          value={password}
          onChange={handleChange}
          required
        ></input>
        <button type='submit' className='sign__button'>
          Зарегистрироваться
        </button>
      </form>
      <p className='sign__text'>
        Уже зарегистрированы?{' '}
        <NavLink to='/sign-in' className='sign__link'>
          Войти
        </NavLink>
      </p>
    </section>
  );
}

export default Register;

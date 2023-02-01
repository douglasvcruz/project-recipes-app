import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import logoRecipes from '../images/logoRecipes.svg';
import tomate from '../images/tomate.svg';

function Login() {
  const { email, password, disabled, handleSubmit } = useContext(AppContext);
  return (
    <>
      <section className="section-logo">
        <img src={ logoRecipes } alt="Logo recipes" />
      </section>
      <img className="tomate" src={ tomate } alt="tomate" />
      <p className="login">LOGIN</p>
      <form
        className="form-login"
      >
        <input
          className="email"
          type="email"
          placeholder="Email"
          onChange={ email.onChange }
          value={ email.value }
          data-testid="email-input"
        />
        <input
          className="password"
          type="password"
          placeholder="Password"
          onChange={ password.onChange }
          value={ password.value }
          data-testid="password-input"
        />
        <button
          className="button-login"
          disabled={ disabled }
          type="button"
          onClick={ handleSubmit }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;

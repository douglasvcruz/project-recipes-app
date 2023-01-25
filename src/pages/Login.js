import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Login() {
  const { email, password, disabled } = useContext(AppContext);
  return (
    <form>
      <input
        type="email"
        onChange={ email.onChange }
        value={ email.value }
        data-testid="email-input"
      />
      <input
        type="password"
        onChange={ password.onChange }
        value={ password.value }
        data-testid="password-input"
      />
      <button
        disabled={ disabled }
        type="button"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;

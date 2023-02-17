import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import logoRecipes from '../../images/logoRecipes.svg';
import tomate from '../../images/tomate.svg';
import { Input, Section, Img, Form, P, Button } from './style';

function Login() {
  const { email, password, disabled, handleSubmit } = useContext(AppContext);
  return (
    <>
      <Section>
        <img src={ logoRecipes } alt="Logo recipes" />
      </Section>
      <Img src={ tomate } alt="tomate" />
      <P>LOGIN</P>
      <Form>
        <Input
          type="email"
          placeholder="Email"
          onChange={ email.onChange }
          value={ email.value }
          data-testid="email-input"
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={ password.onChange }
          value={ password.value }
          data-testid="password-input"
        />
        <Button
          disabled={ disabled }
          type="button"
          onClick={ handleSubmit }
          data-testid="login-submit-btn"
        >
          Entrar
        </Button>
      </Form>
    </>
  );
}

export default Login;

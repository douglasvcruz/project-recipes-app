import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const loginInput = 'email-input';
const passworldInput = 'password-input';
// test('Farewell, front-end', () => {
//   // Este arquivo pode ser modificado ou deletado sem problemas
//   render(<App />);
//   const linkElement = screen.getByText(/TRYBE/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Testa a pagina de logn', () => {
  test('Verifica se os elementos são renderizados', () => {
    renderWithRouter(<App />);
    const inputLogn = screen.getByTestId(loginInput);
    const inputPassword = screen.getByTestId(passworldInput);
    const inputButton = screen.getByRole('button', { name: /Entrar/i });
    expect(inputLogn).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputButton).toBeInTheDocument();
  });
  test('verifica se o botão começa desabilitado', () => {
    renderWithRouter(<App />);
    const inputButton = screen.getByRole('button', { name: /Entrar/i });
    expect(inputButton).toBeDisabled();
  });
  test('Se o botão é habilitado ao preencher os inputs corretamente', () => {
    renderWithRouter(<App />);
    const inputLogn = screen.getByTestId(loginInput);
    const inputPassword = screen.getByTestId(passworldInput);
    const inputButton = screen.getByRole('button', { name: /Entrar/i });
    expect(inputButton).toBeDisabled();
    userEvent.type(inputLogn, 'test@test.com');
    userEvent.type(inputPassword, '0123456');
    expect(inputButton).toBeEnabled();
  });
  test('Se ao clicar no botão a página é redirecionada', () => {
    const { history } = renderWithRouter(<App />);
    const inputLogn = screen.getByTestId(loginInput);
    const inputPassword = screen.getByTestId(passworldInput);
    const inputButton = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(inputLogn, 'test@test.com');
    userEvent.type(inputPassword, '0123456');
    expect(inputButton).not.toBeDisabled();
    userEvent.click(inputButton);
    expect(history.location.pathname).toBe('/meals');
  });
});

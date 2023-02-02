import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import fetch from '../../cypress/mocks/fetch';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const cardTest = '0-card-img';

describe('Testa o componente /meals', () => {
  test('testa se o fetch é chamado', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(history.location.pathname).toBe('/meals');

    const firstRecipe = await screen.findByTestId(cardTest);
    expect(firstRecipe).toBeInTheDocument();
  });
});

describe('Testa o componente /drinks', () => {
  test('testa se o fetch é chamado', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe('/drinks');

    const firstDrink = await screen.findByTestId(cardTest);
    expect(firstDrink).toBeInTheDocument();
  });
});

describe('Testa a requisição das categorias', () => {
  test('testa se a categoria beef é', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe('/meals');

    const firstCategory = await screen.findByRole('button', {
      name: /beef/i,
    });
    expect(firstCategory).toBeInTheDocument();
    const secondCategory = await screen.findByRole('button', {
      name: /breakfast/i,
    });
    expect(secondCategory).toBeInTheDocument();
  });
});

// describe('testa a pesquisa, se renderiza a receita pesquisada', () => {
//   test.only('testa se a categoria beef é renderizada', async () => {
//     global.fetch = jest.fn(fetch);
//     const { history } = renderWithRouter(<App />);
//     act(() => {
//       history.push('/meals');
//     });

//     const lupa = screen.getByTestId('search-top-btn');
//     expect(lupa).toBeInTheDocument();
//     const campo = screen.getByTestId('search-input');
//     expect(campo).toBeInTheDocument();
//     const radio = screen.getByRole('radio', {
//       name: /name/i,
//     });
//     expect(radio).toBeInTheDocument();
//     const button = screen.getByTestId('exec-search-btn');
//     userEvent.click(lupa);
//     userEvent.type(campo, 'Burek');
//     userEvent.click(radio);
//     userEvent.click(button);
//     expect(history.location.pathname).toBe('/meals/53060');
//     expect(button).toBeInTheDocument();
//   });
// });

describe('testa a clicar na primeira imagem, vai pra receita detalhada', () => {
  test('testa clicar em corba, vai para os detalhes dela', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const receita1 = await screen.findByTestId(cardTest);
    expect(receita1).toBeInTheDocument();
    userEvent.click(receita1);
    expect(history.location.pathname).toBe('/meals/52977');
  });
  test('testa se clicar em algum drink, vai pros detalhes dele', async () => {
    global.fetch = jest.fn(fetch);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    const drink1 = await screen.findByTestId(cardTest);
    expect(drink1).toBeInTheDocument();
    userEvent.click(drink1);
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});

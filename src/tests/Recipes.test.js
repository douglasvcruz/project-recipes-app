import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import mockMeals from './helpers/mocks/mockMeals';
import mockDrinks from './helpers/mocks/mockDrinks';
import App from '../App';

describe('Testa o componente /meals', () => {
//   global.fetch = jest.fn(() => {
//     Promise.resolve({
//       json: () => Promise.resolve(mockMeals),
//     });
//   });

  test.only('testa se o fetch é chamado', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMeals),
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    // expect(fetch).toHaveBeenCalledTimes(1);
    // expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(history.location.pathname).toBe('/meals');

    const firstRecipe = await screen.findByTestId('0-card-img');
    expect(firstRecipe).toBeInTheDocument();
  });
});

// describe('Testa o componente /drinks', () => {
//   global.fetch = jest.fn(() => {
//     Promise.resolve({
//       json: () => Promise.resolve(mockDrinks),
//     });
//   });

//   test('testa se o fetch é chamado certo', async () => {
//     const { history } = renderWithRouter(<App />);
//     act(() => {
//       history.push('/drinks');
//     });
//     expect(history.location.pathname).toBe('/drinks');
//     expect(fetch).toHaveBeenCalledTimes(1);
//   });

//   test('testa se pesquisar ', () => {
//     const { history } = renderWithRouter(<App />);
//     act(() => {
//       history.push('/drinks');
//     });
//   });
// });

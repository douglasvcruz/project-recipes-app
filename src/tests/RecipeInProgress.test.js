import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import fetch from '../../cypress/mocks/fetch';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import AppProvider from '../context/AppProvider';
import FilterProvider from '../context/FilterProvider';
import RecipeInProgress from '../pages/RecipeInProgress';
import Recipes from '../components/Recipes';
import RecipeDetails from '../pages/RecipeDetails';
import DoneRecipes from '../pages/DoneRecipes';
// import RecipeDetails from '../pages/RecipeDetails';

const favorites = 'favorite-btn';

describe('Teste da page RecipeInProgress para a rota /meals', () => {
  test('testa se os componentes da receita são renderizados', async () => {
    global.fetch = jest.fn(fetch);
    const initialEntries = ['/meals'];
    const { history } = renderWithRouter(
      <AppProvider>
        <FilterProvider>
          <App>
            <Recipes />
            <RecipeDetails />
            <RecipeInProgress />
            <DoneRecipes />
          </App>
        </FilterProvider>
      </AppProvider>,
      { initialEntries },
    );
    expect(global.fetch).toHaveBeenCalled();

    const firstRecipes = await screen.findByTestId('0-recipe-card');
    userEvent.click(firstRecipes);

    const button = screen.getByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');

    const button3 = await screen.findByRole('button', {
      name: /finalizar/i,
    });
    expect(button3).toBeInTheDocument();
    act(() => {
      userEvent.click(button3);
    });
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('testa se os componentes são renderizados', async () => {
    global.fetch = jest.fn(fetch);
    const initialEntries = ['/meals/53060/in-progress'];
    renderWithRouter(
      <AppProvider>
        <FilterProvider>
          <App>
            <Recipes />
            <RecipeDetails />
            <RecipeInProgress />
            <DoneRecipes />
          </App>
        </FilterProvider>
      </AppProvider>,
      { initialEntries },
    );

    const share = screen.getByTestId('share-btn');
    expect(share).toBeInTheDocument();
    const favorite = screen.getByTestId(favorites);
    expect(favorite).toBeInTheDocument();

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
    const head = await screen.findByRole('heading');
    expect(head).toBeInTheDocument();

    const button = await screen.findByRole('button', {
      name: /finalizar/i,
    });
    expect(button).toBeInTheDocument();
  });
});

describe('Teste da page RecipeInProgress para a rota /meals', () => {
  test('testa se os elementos da receita são renderizados', async () => {
    global.fetch = jest.fn(fetch);
    const initialEntries = ['/drinks'];
    const { history } = renderWithRouter(
      <AppProvider>
        <FilterProvider>
          <App>
            <Recipes />
            <RecipeDetails />
            <RecipeInProgress />
            <DoneRecipes />
          </App>
        </FilterProvider>
      </AppProvider>,
      { initialEntries },
    );
    expect(global.fetch).toHaveBeenCalled();

    const firstDrinks = await screen.findByTestId('0-recipe-card');
    userEvent.click(firstDrinks);

    const button = screen.getByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(button);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    const share = screen.getByTestId('share-btn');
    expect(share).toBeInTheDocument();
    const favorite = screen.getByTestId(favorites);
    expect(favorite).toBeInTheDocument();

    const title = await screen.findByTestId('recipe-title');
    expect(title).toBeInTheDocument();
    const head = await screen.findByRole('heading');
    expect(head).toBeInTheDocument();

    const button2 = await screen.findByRole('button', {
      name: /finalizar/i,
    });
    expect(button2).toBeInTheDocument();
    userEvent.click(button2);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});

describe('Teste da page RecipeInProgress', () => {
  test('testa se a receita é adicionada ao localStorage se clicada', async () => {
    global.fetch = jest.fn(fetch);
    const initialEntries = ['/meals/53060/in-progress'];
    renderWithRouter(
      <AppProvider>
        <FilterProvider>
          <App>
            <Recipes />
            <RecipeDetails />
            <RecipeInProgress />
          </App>
        </FilterProvider>
      </AppProvider>,
      { initialEntries },
    );
    console.log(localStorage.length);
    const instru = await screen.findByTestId('instructions');
    const images = await screen.findByTestId('recipe-photo');
    expect(instru).toBeInTheDocument();
    expect(images).toBeInTheDocument();
    const addFav = await screen.findByTestId(favorites);
    userEvent.click(addFav);
    expect(localStorage.length).toBe(3);
    console.log(localStorage.length);
  });
});

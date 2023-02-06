import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
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

// afterEach(() => {
//   jest.clearAllMocks();
// });
// const favorites = 'favorite-btn';
// const mealss = '/meals/53060/in-progress';
const card = '0-recipe-card';
const progress = '/meals/52977/in-progress';
const startId = 'start-recipe-btn';
const penne = 'penne rigate';

const drinksProgress = '/drinks/15997/in-progress';

beforeEach(() => {
  localStorage.clear();
});

describe('Teste da page RecipeInProgress para a rota /meals', () => {
  test('testa se clicar na receita, a rota é alterada para recipes in progress', async () => {
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

    const firstRecipes = await screen.findByTestId(card);
    userEvent.click(firstRecipes);

    const button = screen.getByRole('button', {
      name: /start recipe/i,
    });
    userEvent.click(button);
    expect(history.location.pathname).toBe(progress);

    const button3 = await screen.findByRole('button', {
      name: /finalizar/i,
    });
    expect(button3).toBeInTheDocument();
    act(() => {
      userEvent.click(button3);
    });
    expect(history.location.pathname).toBe('/done-recipes');
  });
});

describe('Teste da page RecipeInProgress', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });
  test('testa as listas', async () => {
    global.fetch = jest.fn(fetch);
    const initialEntries = ['/meals'];
    const { history } = renderWithRouter(
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

    const firstRecipes = await screen.findByTestId(card);
    userEvent.click(firstRecipes);

    const button = screen.getByTestId(startId);
    userEvent.click(button);
    expect(history.location.pathname).toBe(progress);

    const view = await screen.findByText(/penne rigate 1 pound/i);
    const mealsCopy = screen.getByTestId('share-btn');
    console.log(mealsCopy);
    userEvent.click(mealsCopy);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    const list = await within(view).findByRole('checkbox');

    expect(list).toBeInTheDocument();

    const listStyle = await screen.findByTestId('0-ingredient-step');
    expect(listStyle).not.toHaveAttribute('class', 'test');
    userEvent.click(list);
    expect(listStyle).toHaveAttribute('class', 'test');

    const expec = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
    const equals = { 52977: [penne] };
    expect(expec).toEqual(equals);
    userEvent.click(list);
    expect(listStyle).not.toHaveAttribute('class', 'test');
    const addFav = screen.getByTestId('favorite-btn');
    act(() => {
      userEvent.click(addFav);
    });
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const equalRecipe = [{
      alcoholicOrNot: '',
      category: 'Vegetarian',
      id: '52771',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      name: 'Spicy Arrabiata Penne',
      nationality: 'Italian',
      type: 'meal',
    },
    ];

    await waitFor(() => expect(favRecipe).toEqual(equalRecipe));
    // await act(async () => {
    //   userEvent.click(addFav);
    // });
    // await waitFor(() => expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]));
  });
});

describe('testa o localStorage', () => {
  test('testa as listas de drinks', async () => {
    global.fetch = jest.fn(fetch);
    const initialEntries = ['/drinks'];
    const { history } = renderWithRouter(
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
    const firstRecipes = await screen.findByTestId(card);
    userEvent.click(firstRecipes);

    const button = screen.getByTestId(startId);
    userEvent.click(button);
    expect(history.location.pathname).toBe(drinksProgress);
    console.log(localStorage.length);
    const view = await screen.findByText(/galliano 2 1\/2 shots/i);
    const drinksCopy = screen.getByTestId('share-btn');
    userEvent.click(drinksCopy);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/15997');
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    const list = await within(view).findByRole('checkbox');
    const listStyle = await screen.findByTestId('0-ingredient-step');
    expect(list).toBeInTheDocument();
    userEvent.click(list);
    expect(listStyle).toHaveAttribute('class', 'test');
    const local = JSON.parse(localStorage.getItem('inProgressRecipes')).drinks;
    console.log(JSON.parse(localStorage.getItem('inProgressRecipes')).drinks);
    const rece = { 15997: ['Galliano'] };
    expect(local).toEqual(rece);
    userEvent.click(list);

    expect(listStyle).not.toHaveAttribute('class', 'test');
    const fav = await screen.findByTestId('button-favorite');
    userEvent.click(fav);
    const expecTo = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const equalDrink = [{ alcoholicOrNot: 'Optional alcohol', category: 'Ordinary Drink', id: '15997', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg', name: 'GG', nationality: '', type: 'drink' }];
    expect(expecTo).toEqual(equalDrink);

    await act(async () => {
      userEvent.click(fav);
    });
    userEvent.click(list);
    const buttonFinish = await screen.findByRole('button', {
      name: /finalizar/i,
    });
    userEvent.click(buttonFinish);
    const doneLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const arrays = [{ alcoholicOrNot: 'Optional alcohol', category: 'Ordinary Drink', doneDate: '2023-02-06T14:32:52.417Z', id: '15997', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg', name: 'GG', nationality: '', tags: [], type: 'drink' }];
    expect(doneLocal).toBe(arrays);
  });
});

describe('', () => {
  test('', async () => {
    global.fetch = jest.fn(fetch);
    const initialEntries = ['/drinks'];
    const { history } = renderWithRouter(
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
    const secondRecipes = await screen.findByTestId('1-recipe-card');
    userEvent.click(secondRecipes);
    const buttonStart = screen.getByTestId(startId);
    userEvent.click(buttonStart);

    const view3 = await screen.findByText(/gin 1 3\/4 shot/i);

    const firstCheck = await within(view3).findByRole('checkbox');
    userEvent.click(firstCheck);
    act(() => history.push('/meals'));

    const terceiro = await screen.findByTestId('2-recipe-card');
    userEvent.click(terceiro);
    const buttonContinue = screen.getByTestId(startId);
    userEvent.click(buttonContinue);
    const view = await screen.findByText(/sushi rice 300ml/i);

    const terceiroCheck = await within(view).findByRole('checkbox');
    const view4 = await screen.findByText(/caster sugar 2 tbs/i);

    const quarto = await within(view4).findByRole('checkbox');
    act(() => {
      userEvent.click(terceiroCheck);
      userEvent.click(quarto);
    });
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')).meals).toEqual({ 53065: ['Sushi Rice', 'Sushi Rice'] });
  });
});

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import mockMeals from './helpers/mocks/mockMeals';
import mockDrinks from './helpers/mocks/mockDrinks';

const mealPath = '/meals/52977';
const drinkPath = '/drinks/13938';
const startRecipe = 'start-recipe-btn';

const drinkToFav = [{
  alcoholicOrNot: 'Alcoholic',
  category: 'Ordinary Drink',
  id: '13938',
  nationality: '',
  type: 'drink',
}];

jest
  .fn()
  .mockReturnValue(mockMeals)
  .mockReturnValueOnce(mockDrinks);

afterEach(() => {
  jest.clearAllMocks();
});

const recipeImage = 'recipe-photo';
const favoriteButton = 'favorite-btn';

describe('Testando o componente RecipeDetails', () => {
  it('verifica a requisição de meals:id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(mealPath);
    });
    await waitFor(() => {
      const video = screen.getByTestId('video');
      expect(video).toBeInTheDocument();
    });
    expect(screen.getByTestId(startRecipe)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId(recipeImage)).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
    });
  });

  it('verifica a requisição de drinks:id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(drinkPath);
    });
    await waitFor(() => {
      expect(screen.getByTestId(recipeImage)).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg');
    });

    expect(screen.getByTestId(recipeImage)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
  });
});

describe('Verificando os botoes do componente', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('verificando o botão Start Recipe', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(mealPath);
    });
    userEvent.click(screen.getByTestId(startRecipe));

    await waitFor(() => {
      expect(history.location.pathname).toBe(`${mealPath}/in-progress`);
    });
  });

  it('verificando o botão de compartilhar', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(mealPath);
    });
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
  });
});

describe('verificando o botão de favorito', () => {
  it('verificando o drink favorito', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(drinkToFav)),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(drinkPath);
    });

    userEvent.click(screen.getByTestId(favoriteButton));

    act(() => {
      history.push(mealPath);
    });
  });
});

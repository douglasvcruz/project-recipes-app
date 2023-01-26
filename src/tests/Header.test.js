import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const serachIcon = 'search-top-btn';

describe('testando o componente Header', () => {
  test('Verifica se os elementos sao renderizados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId(serachIcon);
    const title = screen.getByTestId('page-title');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');
  });
  test('testando o evento click nos inputs', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByTestId(serachIcon);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});

describe('Verificando funções', () => {
  test('Testando link do profile', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
  });

  test('verifica uma buscas', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByTestId(serachIcon);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Suco');
  });
});

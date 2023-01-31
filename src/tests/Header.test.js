import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const searchTopBtn = 'search-top-btn';

describe('testando o componente Header', () => {
  test('Verifica se os elementos sao renderizados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const profileTop = screen.getByTestId('profile-top-btn');
    const searchTop = screen.getByTestId(searchTopBtn);
    const title = screen.getByTestId('page-title');
    expect(profileTop).toBeInTheDocument();
    expect(searchTop).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');
  });
  test('testando o evento click nos inputs', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchTop = screen.getByTestId(searchTopBtn);
    userEvent.click(searchTop);
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

    const profileTop = screen.getByTestId('profile-top-btn');
    userEvent.click(profileTop);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
  });

  test('verifica uma buscas', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchTop = screen.getByTestId(searchTopBtn);
    userEvent.click(searchTop);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Suco');
  });
});

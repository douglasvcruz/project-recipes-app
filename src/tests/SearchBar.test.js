import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('testando o componente searchBar', () => {
  test('testando o evento click nos inputs 3', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByRole('img', {
      name: /search-icon/i,
    });
    userEvent.click(searchIcon);
  });
});

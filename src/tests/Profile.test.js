import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouter } from './helpers/renderWith';

describe('Testando storage da pagina perfil', () => {
  test('testando', () => {
    renderWithRouter(<Profile />);
    const logout = screen.getByRole('link', {
      name: /logout/i,
    });
    expect(logout).toBeInTheDocument();
    userEvent.click(logout);
  });
});

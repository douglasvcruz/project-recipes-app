import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import done from '../../images/done.svg';
import favorite from '../../images/favorite.svg';
import logout from '../../images/logout.svg';
import { Section, Line } from './style';

const { email } = JSON.parse(localStorage.getItem('user')) || '';

function Profile() {
  const clearLocalStorage = () => localStorage.clear();

  return (
    <>
      <Header
        title="Profile"
      />
      <Section>
        <h4 data-testid="profile-email">{ email }</h4>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          <img src={ done } alt="done" />
          <Link to="/done-recipes">Done Recipes</Link>
        </button>
        <Line />
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          <img src={ favorite } alt="favorite" />
          <Link to="/favorite-recipes">Favorite Recipes</Link>
        </button>
        <Line />
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          <img src={ logout } alt="logout" />
          <Link to="/">Logout</Link>
        </button>
      </Section>
      <Footer />
    </>
  );
}

export default Profile;

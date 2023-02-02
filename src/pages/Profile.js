import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import done from '../images/done.svg';
import favorite from '../images/favorite.svg';
import logout from '../images/logout.svg';

import '../styles/Profile.css';

const { email } = JSON.parse(localStorage.getItem('user')) || '';

function Profile() {
  const clearLocalStorage = () => localStorage.clear();

  return (
    <>
      <Header
        title="Profile"
      />
      <section className="profile-section">
        <h4 className="email-profile" data-testid="profile-email">{ email }</h4>
        <button
          className="profile-btn"
          type="button"
          data-testid="profile-done-btn"
        >
          <img src={ done } alt="done" />
          <Link to="/done-recipes">Done Recipes</Link>
        </button>
        <div className="div-profile" />
        <button
          className="profile-btn"
          type="button"
          data-testid="profile-favorite-btn"
        >
          <img src={ favorite } alt="favorite" />
          <Link to="/favorite-recipes">Favorite Recipes</Link>
        </button>
        <div className="div-profile" />

        <button
          className="profile-btn"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          <img src={ logout } alt="logout" />

          <Link to="/">Logout</Link>
        </button>
      </section>
      <Footer />
    </>
  );
}

export default Profile;

import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const { email } = JSON.parse(localStorage.getItem('user')) || '';
export default function Profile() {
  const clearLocalStorage = () => localStorage.clear();
  return (
    <div>
      <Header
        title="Profile"
      />
      <div>
        <h4 data-testid="profile-email">{ email }</h4>
        <button
          type="button"
          data-testid="profile-done-btn"
          // style={ { border: 'none', backgroundColor: 'inherit' } }
        >
          <Link to="/done-recipes">
            Done Recipes
          </Link>
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          // style={ { border: 'none', backgroundColor: 'inherit' } }
        >
          <Link to="/favorite-recipes">
            Favorite Recipes
          </Link>
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
          // style={ { border: 'none', backgroundColor: 'inherit' } }
        >
          <Link to="/">
            Logout
          </Link>
        </button>
      </div>
      <Footer />

    </div>
  );
}

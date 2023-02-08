import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import iconeRecipes from '../images/iconeRecipes.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import perfil from '../images/perfil.svg';
import done from '../images/done.svg';
import favorite from '../images/favorite.svg';
import '../styles/Header.css';

function Header({ title }) {
  const [toggle, setToggle] = useState(false);
  const { location: { pathname } } = useHistory();

  return (
    <header>
      <section className="section-header">
        <button
          type="button"
          className="icone-recipes"
        >
          <img src={ iconeRecipes } alt="Icone recipes" />
        </button>
        <span>
          <em>RECIPES</em>
          <strong> app</strong>
        </span>
        { (pathname.includes('meals') || pathname.includes('drinks'))
       && (
         <button
           type="button"
           className="search-icon"
           onClick={ () => setToggle(!toggle) }
         >
           <img
             src={ searchIcon }
             alt="search-icon"
             data-testid="search-top-btn"
           />
         </button>
       ) }
        <button
          type="button"
          className="profile-icon"
          data-testid="btn-settings"
        >
          <Link to="/profile">
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </Link>
        </button>
      </section>
      {pathname.includes('meals') && <img
        className="drink-img"
        src={ mealIcon }
        alt="meals"
      />}
      {pathname.includes('drinks') && <img
        className="drink-img"
        src={ drinkIcon }
        alt="drinks"
      />}
      {pathname.includes('profile') && <img
        className="drink-img"
        src={ perfil }
        alt="perfil"
      />}
      {pathname.includes('done-recipes') && <img
        className="drink-img"
        src={ done }
        alt="done"
      />}
      {pathname.includes('favorite') && <img
        className="drink-img"
        src={ favorite }
        alt="favorites"
      />}
      <p className="title" data-testid="page-title">{ title }</p>
      { toggle && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

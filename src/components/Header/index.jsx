import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import iconeRecipes from '../../images/iconeRecipes.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import perfil from '../../images/perfil.svg';
import done from '../../images/done.svg';
import favorite from '../../images/favorite.svg';
import { HeaderOn, Icon, AbsoluteIcon, IconPages, Title } from './style';

function Header({ title }) {
  const [toggle, setToggle] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <>
      <HeaderOn>
        <section>
          <Icon src={ iconeRecipes } alt="Icone recipes" />
          <span>
            <em>RECIPES</em>
            <strong> app</strong>
          </span>
          { (pathname.includes('meals') || pathname.includes('drinks'))
       && (
         <AbsoluteIcon
           right={ 40 }
           r={ 160 }
           type="button"
           onClick={ () => setToggle(!toggle) }
         >
           <img
             src={ searchIcon }
             alt="search-icon"
             data-testid="search-top-btn"
           />
         </AbsoluteIcon>
       ) }
          <AbsoluteIcon
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/profile') }
          >
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </AbsoluteIcon>
        </section>
        {pathname.includes('meals') && <IconPages
          src={ mealIcon }
          alt="meals"
        />}
        {pathname.includes('drinks') && <IconPages
          src={ drinkIcon }
          alt="drinks"
        />}
        {pathname.includes('profile') && <IconPages
          src={ perfil }
          alt="perfil"
        />}
        {pathname.includes('done-recipes') && <IconPages
          src={ done }
          alt="done"
        />}
        {pathname.includes('favorite') && <IconPages
          src={ favorite }
          alt="favorites"
        />}
        <Title data-testid="page-title">{ title }</Title>
      </HeaderOn>
      { toggle && <SearchBar /> }
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

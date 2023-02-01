import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [toggle, setToggle] = useState(false);
  const { location: { pathname } } = useHistory();
  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <button
        type="button"
        data-testid="btn-settings"
      >
        <Link to="/profile">
          <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
        </Link>
      </button>
      { (pathname.includes('meals') || pathname.includes('drinks'))
       && (
         <button
           type="button"
           onClick={ () => setToggle(!toggle) }
         >
           <img
             src={ searchIcon }
             alt="search-icon"
             data-testid="search-top-btn"
           />
         </button>
       ) }
      { toggle && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

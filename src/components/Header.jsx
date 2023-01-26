import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, haveSearch }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <button
        type="button"
        data-testid="btn-settings"
        style={ { border: 'none', backgroundColor: 'inherit' } }
      >
        <Link to="/profile">
          <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
        </Link>
      </button>
      { haveSearch
       && (
         <button
           type="button"
           style={ { border: 'none', backgroundColor: 'inherit' } }
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
  haveSearch: PropTypes.bool.isRequired,
};

export default Header;

import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, haveSearch }) {
  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
      { haveSearch
      && <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  haveSearch: PropTypes.bool.isRequired,
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import { Foooter } from './style';

function Footer() {
  return (
    <Foooter
      data-testid="footer"
    >
      <button
        type="button"
      >
        <Link to="/drinks">
          <img src={ drinkIcon } alt="profile-icon" data-testid="drinks-bottom-btn" />
        </Link>
      </button>
      <button
        type="button"
      >
        <Link to="/meals">
          <img src={ mealIcon } alt="profile-icon" data-testid="meals-bottom-btn" />
        </Link>
      </button>
    </Foooter>
  );
}

export default Footer;

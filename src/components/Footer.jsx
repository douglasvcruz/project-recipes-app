import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="fixar-rodape"
    >
      <button
        type="button"
        style={ { border: 'none', backgroundColor: 'inherit' } }
      >
        <Link to="/drinks">
          <img src={ drinkIcon } alt="profile-icon" data-testid="drinks-bottom-btn" />
        </Link>
      </button>
      <button
        type="button"
        style={ { border: 'none', backgroundColor: 'inherit' } }
      >
        <Link to="/meals">
          <img src={ mealIcon } alt="profile-icon" data-testid="meals-bottom-btn" />
        </Link>
      </button>
    </footer>
  );
}

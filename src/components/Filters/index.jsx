import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FilterContext from '../../context/FilterContext';
import allDrink from '../../images/allDrink.svg';
import ordinary from '../../images/ordinary.svg';
import cocktail from '../../images/cocktail.svg';
import shake from '../../images/shake.svg';
import other from '../../images/other.svg';
import cocoa from '../../images/cocoa.svg';
import allMeal from '../../images/allMeal.svg';
import beef from '../../images/beef.svg';
import breakfast from '../../images/breakfast.svg';
import chicken from '../../images/chicken.svg';
import dessert from '../../images/dessert.svg';
import goat from '../../images/goat.svg';
import { SectionFilter } from '../../styles/style';

function Filters() {
  const { handleApi, categoryDrinks, categoryMeals } = useContext(FilterContext);
  const { location: { pathname } } = useHistory();
  const path = pathname.includes('meals');

  const arrayMeals = [beef, breakfast, chicken, dessert, goat];
  const arrayDrinks = [ordinary, cocktail, shake, other, cocoa];

  return (
    <SectionFilter>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleApi('All') }
      >
        <img
          src={ path ? allMeal : allDrink }
          alt={ path ? 'All meals' : 'All drinks' }
        />
        <p>All</p>
      </button>
      {(path ? categoryMeals : categoryDrinks)?.map(({ strCategory }, i) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleApi(strCategory) }
        >
          <img src={ path ? arrayMeals[i] : arrayDrinks[i] } alt={ `${strCategory}` } />
          <p>{ strCategory }</p>
        </button>))}
    </SectionFilter>
  );
}

export default Filters;

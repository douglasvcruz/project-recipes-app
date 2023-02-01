import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FilterContext from '../context/FilterContext';

function Filters() {
  const { handleApi, categoryDrinks, categoryMeals } = useContext(FilterContext);
  const { location: { pathname } } = useHistory();
  const path = pathname.includes('meals');

  return (
    <div>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ ({ target }) => handleApi(target.innerHTML) }
        >
          All
        </button>
        {(path ? categoryMeals : categoryDrinks)?.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleApi(strCategory) }
          >
            { strCategory }
          </button>))}
      </section>
    </div>
  );
}

export default Filters;

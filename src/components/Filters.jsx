import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function Filters() {
  const { categoryDrinks, categoryMeals } = useContext(AppContext);
  const { location: { pathname } } = useHistory();

  return (
    <div>
      { pathname === '/meals' ? (
        <section>
          {categoryMeals.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {} }
            >
              { strCategory }
            </button>))}
        </section>
      ) : (
        <section>
          {categoryDrinks.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {} }
            >
              { strCategory }
            </button>))}
        </section>
      )}
    </div>
  );
}

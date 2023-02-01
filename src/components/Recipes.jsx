import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Recipes() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { drinks, meals } = useContext(AppContext);
  const path = pathname.includes('meals');
  return (
    <div>
      <section>
        { ((path ? meals : drinks) || [])
          .map(({ strMealThumb, strMeal,
            idMeal, idDrink, strDrink, strDrinkThumb }, i) => (
            (
              <button
                className="recipe-card"
                type="button"
                key={ path ? idMeal : idDrink }
                data-testid={ `${i}-recipe-card` }
                onClick={ () => history.push(`/${path
                  ? 'meals'
                  : 'drinks'}/${path ? idMeal : idDrink}`) }
              >
                <p data-testid={ `${i}-card-name` }>{path ? strMeal : strDrink}</p>
                <img
                  src={ path ? strMealThumb : strDrinkThumb }
                  alt="Imagem da receita"
                  data-testid={ `${i}-card-img` }
                />
              </button>
            )
          ))}
      </section>
    </div>
  );
}

export default Recipes;

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Recipes() {
  const { location: { pathname } } = useHistory();
  const { drinks, meals } = useContext(AppContext);
  return (
    <div>
      { pathname === '/drinks'
        ? (
          <section>
            { drinks.length !== 0 && drinks
              .map(({ strDrinkThumb, strDrink, idDrink }, i) => (
                <div key={ idDrink } data-testid={ `${i}-recipe-card` }>
                  <p data-testid={ `${i}-card-name` }>{strDrink}</p>
                  <img
                    src={ strDrinkThumb }
                    alt="Imagem da receita"
                    data-testid={ `${i}-card-img` }
                  />
                </div>
              ))}
          </section>
        )
        : (
          <section>
            { meals.length !== 0 && meals
              .map(({ strMealThumb, strMeal, idMeal }, i) => (
                <div key={ idMeal } data-testid={ `${i}-recipe-card` }>
                  <p data-testid={ `${i}-card-name` }>{strMeal}</p>
                  <img
                    src={ strMealThumb }
                    alt="Imagem da receita"
                    data-testid={ `${i}-card-img` }
                  />
                </div>
              ))}
          </section>
        )}
    </div>
  );
}

export default Recipes;

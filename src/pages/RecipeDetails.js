/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import useCopy from '../hooks/useCopy';

function RecipeDetails({ match }) {
  const { makeFetch, drinks, meals } = useContext(AppContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  const [apiDetails, setApiDetails] = useState([]);
  const [toggle, setToggle] = useState(false);
  const copia = useCopy();
  const six = 6;

  const { id } = useParams();
  const fetchDetails = async () => {
    let url = '';
    if (pathname === `/meals/${id}`) {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const api = await makeFetch(url);
    setApiDetails(api);
  };

  const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const localInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];

  const saveLocalStorageInProgress = () => {
    if (pathname.includes('/meals')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...localInProgress,
        meals: {
          ...localInProgress.meals,
          [id]: [],
        },
      }));
      history.push(`/meals/${id}/in-progress`);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...localInProgress,
        drinks: {
          ...localInProgress.drinks,
          [id]: [],
        },
      }));
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const saveLocalStorageFavorites = () => {
    if (localFavorites.some((a) => a.id === id)) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(localFavorites.filter((a) => a.id !== id)));
    } else if (pathname.includes('/meals')) {
      const { idMeal, strMeal, strArea, strMealThumb, strCategory } = apiDetails.meals[0];
      localStorage.setItem('favoriteRecipes', JSON.stringify([...localFavorites, {
        id: idMeal,
        type: 'meal',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      }]));
    } else {
      const { idDrink, strDrink, strCategory,
        strDrinkThumb, strAlcoholic } = apiDetails.drinks[0];
      localStorage.setItem('favoriteRecipes', JSON.stringify([...localFavorites, {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      }]));
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    fetchDetails();
  }, [toggle]);

  return (
    <div>
      <p>{copia.copied}</p>
      <button
        type="button"
        onClick={ saveLocalStorageFavorites }
      >
        <img
          data-testid="favorite-btn"
          src={ localFavorites
            .some((a) => a.id === id) ? blackHeart
            : whiteHeart }
          alt="white heart"
        />
      </button>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copia.copyButton(match.url) }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      { pathname.includes('/drinks')
        ? (
          <section>
            { apiDetails.length !== 0 && apiDetails.drinks
              .map((a, i) => (
                <button
                  className="recipe-card"
                  type="button"
                  key={ a.idDrink }
                  data-testid={ `${i}-recipe-card` }
                >
                  <p data-testid="recipe-category">{a.strAlcoholic}</p>
                  <p data-testid="recipe-title">{a.strDrink}</p>
                  { Object.keys(a)
                    .filter((c) => c.includes('strIngredient')).map((d, index) => (
                      <p
                        key={ d }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {a[d]}
                      </p>))}
                  { Object.keys(a)
                    .filter((c) => c.includes('strMeasure')).map((d, index) => (
                      <p
                        key={ d }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {a[d]}
                      </p>))}
                  <p data-testid="instructions">{a.strInstructions}</p>
                  <img
                    src={ a.strDrinkThumb }
                    alt="Imagem da receita"
                    data-testid="recipe-photo"
                  />
                </button>))}
            <div className="carousel">
              { meals.length !== 0
               && meals.slice(0, six).map(({ strMeal, strMealThumb }, index) => (
                 <div
                   className="carousel-div"
                   key={ index }
                   data-testid={ `${index}-recommendation-card` }
                 >
                   <img src={ strMealThumb } alt="Imagem do Meal" />
                   <p data-testid={ `${index}-recommendation-title` }>{strMeal}</p>
                 </div>
               ))}
            </div>
          </section>
        ) : (
          <section>
            { apiDetails.length !== 0 && apiDetails.meals
              .map((a, i) => (
                <button
                  className="recipe-card"
                  type="button"
                  key={ a.idMeal }
                  data-testid={ `${i}-recipe-card` }
                >
                  <p data-testid="recipe-category">{a.strCategory}</p>
                  <p data-testid="recipe-title">{a.strMeal}</p>
                  <iframe
                    data-testid="video"
                    src={ a.strYoutube.replace('watch?v=', 'embed/') }
                    title="YouTube video player"
                  />
                  { Object.keys(a)
                    .filter((c) => c.includes('strIngredient')).map((d, index) => (
                      <p
                        key={ d }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {a[d]}
                      </p>))}
                  { Object.keys(a)
                    .filter((c) => c.includes('strMeasure')).map((d, index) => (
                      <p
                        key={ d }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {a[d]}
                      </p>))}
                  <p data-testid="instructions">{a.strInstructions}</p>
                  <img
                    src={ a.strMealThumb }
                    alt="Imagem da receita"
                    data-testid="recipe-photo"
                  />
                </button>
              ))}
            <div className="carousel">
              { drinks.length !== 0
               && drinks.slice(0, six).map(({ strDrink, strDrinkThumb }, index) => (
                 <div
                   className="carousel-div"
                   key={ index }
                   data-testid={ `${index}-recommendation-card` }
                 >
                   <img src={ strDrinkThumb } alt="Imagem do drink" />
                   <p data-testid={ `${index}-recommendation-title` }>{strDrink}</p>
                 </div>
               ))}
            </div>
          </section>
        )}
      <button
        onClick={ saveLocalStorageInProgress }
        className="button-start"
        type="button"
        data-testid="start-recipe-btn"
      >
        { (localInProgress.length !== 0)
         && [...Object.keys(localInProgress.drinks || []),
           ...Object.keys(localInProgress.meals || [])].some((a) => a === id)
          ? 'Continue Recipe' : 'Start Recipe' }
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;

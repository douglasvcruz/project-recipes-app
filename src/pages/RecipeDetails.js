import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useCopy from '../hooks/useCopy';
import '../styles/RecipeDetails.css';

function RecipeDetails({ match }) {
  const { makeFetch, drinks, meals } = useContext(AppContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const [apiDetails, setApiDetails] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [ingredients, setIngredients] = useState([{}]);

  const copia = useCopy();

  const six = 6;
  const test = pathname.includes('/meals');

  const { id } = useParams();

  useEffect(() => {
    const obj = {
      ingredient: Object.entries((apiDetails ? apiDetails[0] : []) || [])
        .filter((a) => a[0].includes('strIngredient')
        && a[1]?.length !== 0 && a[1] !== null).map((b) => b[1]),
      measure: Object.entries((apiDetails ? apiDetails[0] : []) || [])
        .filter((a) => a[0].includes('strMeasure')
      && a[1] !== ' ' && a[1] !== null).map((b) => b[1]),
    };
    setIngredients(obj);
  }, [apiDetails]);

  const fetchDetails = async () => {
    let url = '';
    if (pathname === `/meals/${id}`) {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const api = await makeFetch(url);
      setApiDetails(api?.meals);
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const api = await makeFetch(url);
      setApiDetails(api?.drinks);
    }
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
    } else if (test) {
      const { idMeal, strMeal, strArea,
        strMealThumb, strCategory } = apiDetails[0];
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
        strDrinkThumb, strAlcoholic } = apiDetails[0];
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
    <section>
      <p>{copia.copied}</p>
      <header>
        <button
          className="favorite-recipe-details"
          type="button"
          onClick={ saveLocalStorageFavorites }
        >
          <img
            data-testid="favorite-btn"
            src={ localFavorites.some((a) => a.id === id) ? blackHeartIcon
              : whiteHeartIcon }
            alt="white heart"
          />
        </button>
        <button
          className="search-recipe-details"
          type="button"
          data-testid="share-btn"
          onClick={ () => copia.copyButton(match.url) }
        >
          <img className="img-search" src={ shareIcon } alt="share icon" />
        </button>
        { apiDetails?.map((a, i) => (
          <div
            className="img-recipe-details"
            key={ i }
          >
            <img
              key={ i }
              src={ test ? a.strMealThumb : a.strDrinkThumb }
              alt="Imagem da receita"
              data-testid="recipe-photo"
            />
            <p
              className="p-category"
              data-testid="recipe-category"
            >
              {test ? a.strCategory : a.strAlcoholic}
            </p>
            <p
              className="p-title"
              data-testid="recipe-title"
            >
              {test ? a.strMeal : a.strDrink}
            </p>
          </div>
        ))}
      </header>
      <section className="sect">
        { apiDetails?.map((a, i) => (
          <button
            type="button"
            key={ test ? a.idMeal : a.idDrink }
            data-testid={ `${i}-recipe-card` }
          >
            <p className="p-ingredient">Ingredients</p>
            <div className="ingredient-box">
              { ingredients.ingredient?.map((b, index) => (
                <li className="ingredients" key={ index }>
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `${b} ${ingredients.measure[index] || ''}` }
                  </p>
                </li>
              )) }
            </div>
            <p className="p-ingredient">Instructions</p>
            <p
              className="instructions"
              data-testid="instructions"
            >
              {a.strInstructions}
            </p>
            { test && <p className="p-ingredient">Video</p>}
            { test ? <iframe
              className="video"
              data-testid="video"
              src={ a.strYoutube.replace('watch?v=', 'embed/') }
              title="YouTube video player"
            /> : ''}
          </button>
        ))}
        <div className="arrumando">
          <p className="p-instruction">Recommended</p>
          <div className="carousel">
            { (test ? drinks : meals).slice(0, six).map((b, index) => (
              <div
                className="carousel-div recipe-card"
                key={ index }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  src={ test ? b.strDrinkThumb : b.strMealThumb }
                  alt="Imagem do Meal"
                />
                <p
                  data-testid={ `${index}-recommendation-title` }
                >
                  {test ? b.strDrink : b.strMeal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
    </section>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;

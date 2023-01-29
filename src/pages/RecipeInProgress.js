import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useCopy from '../hooks/useCopy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useFetch from '../hooks/useFetch';

function RecipeInProgress() {
  const copia = useCopy();

  const [favoriteList, setFavoriteList] = useState([]);
  const [startApi, setStartApi] = useState([]);
  const { makeFetch } = useFetch();

  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const fetchDetails = async () => {
    let url = '';
    if (pathname.includes(`/meals/${id}`)) {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const api = await makeFetch(url);
    setStartApi(api);
    console.log(api);
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteList(favoriteRecipes);
  }, []);

  const localStorageFavorites = (e) => {
    setFavoriteList(favoriteList.filter((favorite) => favorite.id !== e));
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(favoriteList.filter((favorite) => favorite.id !== e)));
  };

  const test = pathname
    .includes(`/meals/${id}`);
  const ternario = (pathname
    .includes(`/meals/${id}`) ? startApi.meals : startApi.drinks);
  return (
    <div>
      {
        ternario?.map((e) => (
          <div key={ e.id }>
            <h1 data-testid="recipe-title">{ test ? e.strMeal : e.strDrink }</h1>
            <img
              src={ test ? e.strMealThumb : e.strDrinkThumb }
              alt={ test ? e.strMeal : e.strDrink }
              data-testid="recipe-photo"
            />
            { test
              ? (
                <button
                  type="button"
                  style={ { border: 'none', backgroundColor: 'inherit' } }
                  onClick={ () => copia.copyButton(`/meals/${e.idMeal}`) }
                  data-testid="share-btn"
                >
                  <img
                    src={ shareIcon }
                    alt="profile-icon"
                  />
                </button>
              )
              : (
                <button
                  type="button"
                  style={ { border: 'none', backgroundColor: 'inherit' } }
                  onClick={ () => copia.copyButton(`/drinks/${e.idDrink}`) }
                  data-testid="share-btn"
                >
                  <img
                    src={ shareIcon }
                    alt="profile-icon"
                  />
                </button>)}
            <button
              type="button"
              style={ { border: 'none', backgroundColor: 'inherit' } }
              onClick={ () => (test
                ? localStorageFavorites(e.idMeal)
                : localStorageFavorites(e.idDrink)) }
            >
              <img
                src={ blackHeartIcon }
                alt="profile-icon"
                data-testid="favorite-btn"
              />

            </button>
            <p data-testid="recipe-category">{ e.strCategory }</p>
            <p data-testid="instructions">{ e.strInstructions }</p>
            <button data-testid="finish-recipe-btn" type="button">Finalizar</button>

          </div>
        ))
      }
    </div>
  );
}

export default RecipeInProgress;

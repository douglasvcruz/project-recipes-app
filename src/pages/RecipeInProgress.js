import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useCopy from '../hooks/useCopy';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import useFetch from '../hooks/useFetch';
import '../styles/RecipeInProgress.css';

export default function RecipeInProgress() {
  const [startApi, setStartApi] = useState([{}]);
  const [local, setLocal] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [disable, setDisable] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [check, setCheck] = useState('');
  const { id } = useParams();
  const { makeFetch } = useFetch();
  const copia = useCopy();
  const history = useHistory();
  const { location: { pathname } } = history;
  const test = pathname.includes(`/meals/${id}`);
  const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const localDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const fetchDetails = async () => {
    let url = '';
    if (test) {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const api = await makeFetch(url);
    setStartApi(test ? api.meals : api.drinks);
  };

  const localStorageFavorites = () => {
    if (localFavorites.some((a) => a.id === id)) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(localFavorites.filter((a) => a.id !== id)));
    } else if (test) {
      const { idMeal, strMeal, strArea,
        strMealThumb, strCategory } = startApi[0];
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
        strDrinkThumb, strAlcoholic } = startApi[0];
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

  const setClassName = (e, ingredientes) => {
    const teste = document.getElementById(e);
    if (teste.className === 'test') {
      teste.className = '';
    } else {
      teste.className = 'test';
    }
    if (pathname.includes('/meals')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          ...local.meals,
          [id]: (local.meals || []).length !== 0
            ? [ingredientes, ...local.meals[id] || []]
            : [ingredientes],
        },
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {
          ...local.drinks,
          [id]: (local.drinks || []).length !== 0
            ? [ingredientes, ...local.drinks[id] || []]
            : [ingredientes],
        },
      }));
    }
    setCheck(check + 1);
    setToggle(!toggle);
  };

  const checkedButtons = () => {
    setLocal(JSON.parse(localStorage.getItem('inProgressRecipes')) || []);
  };

  const redirectDoneRecipes = () => {
    if (test) {
      const { idMeal, strMeal, strArea,
        strMealThumb, strCategory, strTags } = startApi[0];
      localStorage.setItem('doneRecipes', JSON.stringify([...localDone, {
        id: idMeal,
        nationality: strArea,
        name: strMeal,
        category: strCategory,
        image: strMealThumb,
        type: 'meal',
        tags: ((strTags !== null ? strTags : '').split(',')),
        alcoholicOrNot: '',
        doneDate: new Date(),
      }]));
    } else {
      const { idDrink, strDrink, strCategory,
        strDrinkThumb, strAlcoholic } = startApi[0];
      localStorage.setItem('doneRecipes', JSON.stringify([...localDone, {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: new Date(),
        tags: [],
      }]));
    }
    history.push('/done-recipes');
  };

  const saveIngredients = () => {
    const obj = {
      ingredient: Object.entries(startApi[0] || []).filter((a) => a[0]
        .includes('strIngredi') && a[1] !== null && a[1].length !== 0).map((b) => b[1]),
      measure: Object.entries(startApi[0] || []).filter((a) => a[0].includes('strMeasure')
      && a[1] !== ' ' && a[1] !== null).map((b) => b[1]),
    };
    setIngredients(obj);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    saveIngredients();
    if (test) {
      setCheck(((local.meals || [])[id] || []).length);
    } else {
      setCheck(((local.drinks || [])[id] || []).length);
    }
  }, [startApi]);

  useEffect(() => {
    if (check === document.getElementsByName('checkbox').length) {
      setDisable(false);
    }
    checkedButtons();
  }, [toggle]);

  return (
    <>
      <p>{copia.copied}</p>
      { startApi.map((e, i) => (
        <section key={ i }>
          <div className="img-recipe-details">
            <img
              src={ test ? e.strMealThumb : e.strDrinkThumb }
              alt={ test ? e.strMeal : e.strDrink }
              data-testid="recipe-photo"
            />
            <p className="p-category" data-testid="recipe-category">{ e.strCategory }</p>
            <p className="p-title" data-testid="recipe-title">
              { test ? e.strMeal : e.strDrink }
            </p>
          </div>
          <div className="ingredient-box">
            {ingredients?.ingredient?.map((d, index) => (
              <li
                className="ingredients testando"
                key={ index }
              >
                <label
                  htmlFor="checkbox"
                  id={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    name="checkbox"
                    onChange={ () => setClassName(index, d) }
                    checked={ (test
                      ? Object.values(local.meals || [])
                      : Object.values(local.drinks || []))
                      .some((a) => a.includes(d)) }
                    type="checkbox"
                  />
                  <span className="span-ingredient">
                    { `${d} ${ingredients.measure[index] || ''}` }
                  </span>
                </label>
              </li>))}
          </div>
          <button
            className="search-recipe-details"
            type="button"
            onClick={ () => (test
              ? copia.copyButton(`/meals/${e.idMeal}`)
              : copia.copyButton(`/drinks/${e.idDrink}`)) }
            data-testid="share-btn"
          >
            <img
              src={ shareIcon }
              alt="profile-icon"
            />
          </button>
          <button
            className="favorite-recipe-details"
            type="button"
            onClick={ localStorageFavorites }
          >
            <img
              src={ localFavorites
                .some((a) => a.id === id) ? blackHeart
                : whiteHeart }
              alt="profile-icon"
              data-testid="favorite-btn"
            />
          </button>
          <p className="instructions" data-testid="instructions">
            { e.strInstructions }
          </p>
          <button
            className="button-start"
            onClick={ redirectDoneRecipes }
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ disable }
          >
            Finalizar
          </button>
        </section>))}
    </>
  );
}

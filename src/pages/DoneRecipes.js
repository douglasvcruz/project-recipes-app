import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useCopy from '../hooks/useCopy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState('');

  const copia = useCopy();
  const history = useHistory();

  const local = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setDoneRecipes(local);
  }, []);

  const filterAll = () => {
    setDoneRecipes(local);
  };

  const filterFood = () => {
    setDoneRecipes(local.filter((a) => a.type === 'meal'));
  };

  const filterDrink = () => {
    setDoneRecipes(local.filter((a) => a.type === 'drink'));
  };

  return (
    <>
      <Header
        title="Done Recipes"
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ filterFood }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrink }
        >
          Drinks
        </button>
      </div>
      { (doneRecipes || []).map((e, index) => (
        <div key={ index }>
          <p>{copia.copied}</p>
          <button
            type="button"
            style={ { border: 'none', backgroundColor: 'inherit' } }
            onClick={ () => copia.copyButton(e.type === 'meal'
              ? `/meals/${e.id}`
              : `/drinks/${e.id}`) }
          >
            <img
              src={ shareIcon }
              alt="profile-icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>{e.doneDate}</p>
          {e.tags?.map((b) => (
            <p
              key={ e }
              data-testid={ `${index}-${b?.trim()}-horizontal-tag` }
            >
              {b}
            </p>
          ))}
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { e.type === 'meal' ? `${e.nationality} - ${e.category}` : e.alcoholicOrNot }
          </p>
          <button
            type="button"
            onClick={ () => history.push(e.type === 'meal'
              ? `/meals/${e.id}`
              : `/drinks/${e.id}`) }
          >
            <h1 data-testid={ `${index}-horizontal-name` }>{ e.name }</h1>
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </button>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default DoneRecipes;

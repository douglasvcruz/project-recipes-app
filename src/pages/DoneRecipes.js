import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useCopy from '../hooks/useCopy';
import shareIcon from '../images/shareIcon.svg';
import fastFood from '../images/fastFood.svg';
import drinkIcon from '../images/allDrink.svg';
import mealIcon from '../images/allMeal.svg';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState('');

  const copia = useCopy();
  const history = useHistory();
  const ten = 10;

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
      <section className="section-filter">
        <button
          className="filter-btn"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          <img src={ fastFood } alt="fast food" />
          <p className="filter-text">All</p>
        </button>
        <button
          className="filter-btn"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ filterFood }
        >
          <img src={ mealIcon } alt="meal" />
          <p className="filter-text">Foods</p>
        </button>
        <button
          className="filter-btn"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrink }
        >
          <img src={ drinkIcon } alt="fast food" />
          <p className="filter-text">Drinks</p>
        </button>
      </section>
      <p>{copia.copied}</p>
      <div className="order-done">
        { (doneRecipes || []).map((e, index) => (
          <section className="section-done-recipes" key={ index }>
            <button
              className="button-img"
              type="button"
              onClick={ () => history.push(e.type === 'meal'
                ? `/meals/${e.id}`
                : `/drinks/${e.id}`) }
            >
              <img
                src={ e.image }
                alt={ e.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </button>
            <div className="content-done">
              <div>
                <h4 data-testid={ `${index}-horizontal-name` }>{ e.name }</h4>
                <p
                  className="p-nationality"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { e.type === 'meal' ? `${e.nationality} - ${e.category}`
                    : e.alcoholicOrNot }
                </p>
                <p
                  className="p-done"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {`Done in: ${e.doneDate.slice(0, ten).replace('-', '/')
                    .replace('-', '/')}`}
                </p>
                <div className="tags">
                  {e.tags.map((b) => (
                    <p
                      className="p-tags"
                      key={ e }
                      data-testid={ `${index}-${b?.trim()}-horizontal-tag` }
                    >
                      {b}
                    </p>))}
                </div>
              </div>
              <button
                className="button-share"
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
            </div>
          </section>))}
      </div>
      <Footer />
    </>
  );
}

export default DoneRecipes;

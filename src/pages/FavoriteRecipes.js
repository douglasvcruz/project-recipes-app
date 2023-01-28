import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeFavoriteCard from '../components/RecipeFavoriteCard';

export default function FavoriteRecipes() {
  const [status, setStatus] = useState({ all: true });
  const [favoriteList, setFavoriteList] = useState([]);
  const { drink, meal, all } = status;

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteList(favoriteRecipes);
  }, []);

  const meals = favoriteList.filter((each) => each.type === 'meal');
  const drinks = favoriteList.filter((each) => each.type === 'drink');

  return (
    <>
      <Header
        title="Favorite Recipes"
        haveSearch
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setStatus({ all: true }) }
          // style={ { border: 'none', backgroundColor: 'inherit' } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setStatus({ meal: true }) }
          // style={ { border: 'none', backgroundColor: 'inherit' } }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setStatus({ drink: true }) }
          // style={ { border: 'none', backgroundColor: 'inherit' } }
        >
          Drinks

        </button>
      </div>
      <div>
        { all ? favoriteList
          .map((each, index) => (<RecipeFavoriteCard
            each={ each }
            key={ index }
            index={ index }
            favoriteList={ favoriteList }
            test={ each.type }
          />)) : ''}

        { meal ? meals
          .map((each, index) => (<RecipeFavoriteCard
            each={ each }
            key={ index }
            index={ index }
            favoriteList={ favoriteList }
            test={ each.type }
          />)) : ''}

        { drink ? drinks
          .map((each, index) => (<RecipeFavoriteCard
            each={ each }
            key={ index }
            index={ index }
            favoriteList={ favoriteList }
            test={ each.type }
          />)) : ''}
      </div>
      <Footer />
    </>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeFavoriteCard from '../components/RecipeFavoriteCard';
import FilterContext from '../context/FilterContext';

function FavoriteRecipes() {
  const [status, setStatus] = useState({ all: true });
  const { drink, meal, all } = status;
  const { favoriteList, setFavoriteList } = useContext(FilterContext);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteList(favoriteRecipes);
  }, []);

  const meals = (favoriteList || []).filter((each) => each.type === 'meal');
  const drinks = (favoriteList || []).filter((each) => each.type === 'drink');

  return (
    <div>
      <Header
        title="Favorite Recipes"
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setStatus({ all: true }) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setStatus({ meal: true }) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setStatus({ drink: true }) }
        >
          Drinks
        </button>
      </div>
      <div className="favorite-recipes">
        { all ? (favoriteList || [])
          .map((each, index) => (<RecipeFavoriteCard
            each={ each }
            key={ index }
            index={ index }
            test={ each.type }
          />)) : ''}
        { meal ? meals
          .map((each, index) => (<RecipeFavoriteCard
            each={ each }
            key={ index }
            index={ index }
            test={ each.type }
          />)) : ''}
        { drink ? drinks
          .map((each, index) => (<RecipeFavoriteCard
            each={ each }
            key={ index }
            index={ index }
            test={ each.type }
          />)) : ''}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;

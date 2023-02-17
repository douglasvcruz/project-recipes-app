import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import RecipeFavoriteCard from '../../components/RecipeFavoriteCard/index';
import FilterContext from '../../context/FilterContext';
import drinkIcon from '../../images/allDrink.svg';
import mealIcon from '../../images/allMeal.svg';
import fastFood from '../../images/fastFood.svg';
import { SectionFilter } from '../../styles/style';
import { Section } from './style';

function FavoriteRecipes() {
  const [status, setStatus] = useState({ all: true });
  const { drink, meal, all } = status;
  const { favoriteList, setFavoriteList } = useContext(FilterContext);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteList(favoriteRecipes);
  }, [setFavoriteList]);

  const meals = favoriteList?.filter((each) => each.type === 'meal');
  const drinks = favoriteList?.filter((each) => each.type === 'drink');

  return (
    <>
      <Header
        title="Favorite Recipes"
      />
      <SectionFilter>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setStatus({ all: true }) }
        >
          <img src={ fastFood } alt="fast food" />
          <p>All</p>
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setStatus({ meal: true }) }
        >
          <img src={ mealIcon } alt="meal" />
          <p className="filter-text">Foods</p>
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setStatus({ drink: true }) }
        >
          <img src={ drinkIcon } alt="fast food" />
          <p>Drinks</p>
        </button>
      </SectionFilter>
      <Section>
        { all ? favoriteList
          ?.map((each, index) => (
            <RecipeFavoriteCard
              each={ each }
              key={ index }
              index={ index }
              test={ each.type }
            />)) : ''}
        { meal ? meals
          ?.map((each, index) => (
            <RecipeFavoriteCard
              each={ each }
              key={ index }
              index={ index }
              test={ each.type }
            />)) : ''}
        { drink ? drinks
          ?.map((each, index) => (
            <RecipeFavoriteCard
              each={ each }
              key={ index }
              index={ index }
              test={ each.type }
            />)) : ''}
      </Section>
      <Footer />
    </>
  );
}

export default FavoriteRecipes;

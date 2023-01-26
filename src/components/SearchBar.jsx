import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function SearchBar() {
  const { ingredients, ingredient, searchHandleChange, fetchApi,
  } = useContext(AppContext);
  console.log(ingredient.meals);
  return (
    <div>
      <input
        value={ searchHandleChange.value }
        onChange={ searchHandleChange.onChange }
        placeholder="Search"
        type="search"
        name="search"
        data-testid="search-input"
      />
      <br />
      <label htmlFor="Ingredient">
        <input
          id="Ingredient"
          type="radio"
          name="option"
          value="ingredient"
          checked={ ingredients.value === 'ingredient' }
          onChange={ ingredients.onChange }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          id="name"
          type="radio"
          name="option"
          value="name"
          checked={ ingredients.value === 'name' }
          onChange={ ingredients.onChange }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="First letter">
        <input
          id="First letter"
          type="radio"
          name="option"
          value="letter"
          checked={ ingredients.value === 'letter' }
          onChange={ ingredients.onChange }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <br />
      <button
        data-testid="exec-search-btn"
        onClick={ fetchApi }
      >
        Search
      </button>
    </div>
  );
}

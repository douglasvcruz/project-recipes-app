import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input
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
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          id="name"
          type="radio"
          name="option"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="First letter">
        <input
          id="First letter"
          type="radio"
          name="option"
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <br />
      <button
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

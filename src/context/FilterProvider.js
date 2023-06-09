/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useContext, useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from './AppContext';
import FilterContext from './FilterContext';

function FilterProvider({ children }) {
  const { setDrinks, setMeals, makeFetch } = useContext(AppContext);

  const twelve = 12;

  const { location: { pathname } } = useHistory();

  const [toggle, setToggle] = useState('');
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const fetchApis = async () => {
    const url = {
      meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      categoryMeals: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      categoryDrinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    };

    const five = 5;
    const apiMeals = await makeFetch(url.meals);
    const apiDrinks = await makeFetch(url.drinks);
    const apiCategoryMeals = await makeFetch(url.categoryMeals);
    const apiCategoryDrinks = await makeFetch(url.categoryDrinks);

    setMeals(apiMeals?.meals?.slice(0, twelve));
    setDrinks(apiDrinks?.drinks?.slice(0, twelve));
    setCategoryMeals(apiCategoryMeals?.meals?.slice(0, five));
    setCategoryDrinks(apiCategoryDrinks?.drinks?.slice(0, five));
  };

  const handleApi = async (e) => {
    const url = {
      meals: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`,
      drinks: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e}`,
      mealsAll: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      drinksAll: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    };
    if (e === 'All' || e === toggle) {
      const apiMealsAll = await makeFetch(url.mealsAll);
      const apiDrinksAll = await makeFetch(url.drinksAll);
      setMeals(apiMealsAll?.meals?.slice(0, twelve));
      setDrinks(apiDrinksAll?.drinks?.slice(0, twelve));
    } else if (e !== 'All' && pathname === '/meals') {
      const apiMeals = await makeFetch(url.meals);
      setMeals(apiMeals?.meals?.slice(0, twelve));
    } else if (e !== 'All' && pathname === '/drinks') {
      const apiDrinks = await makeFetch(url.drinks);
      setDrinks(apiDrinks?.drinks?.slice(0, twelve));
    }
    setToggle(e);
  };

  useEffect(() => {
    fetchApis();
  }, []);

  const values = useMemo(
    () => ({
      handleApi,
      categoryMeals,
      categoryDrinks,
      favoriteList,
      setFavoriteList,
    }),
    [
      handleApi,
      categoryMeals,
      categoryDrinks,
      favoriteList,
      setFavoriteList,
    ],
  );
  return (
    <FilterContext.Provider value={ values }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;

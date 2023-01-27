/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from './AppContext';
import useHandleChange from '../hooks/useHandleChange';
import useFetch from '../hooks/useFetch';

function AppProvider({ children }) {
  const email = useHandleChange('');
  const password = useHandleChange('');
  const history = useHistory();
  const ingredients = useHandleChange('');
  const [disabled, setDisabled] = useState(true);
  const [drinks, setDrinks] = useState('');
  const [meals, setMeals] = useState('');
  const searchHandleChange = useHandleChange('');
  const { makeFetch } = useFetch();
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const twelve = 12;

  const validationError = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const num = 7;
    const allTests = regex.test(email.value) && password.value.length >= num;
    if (allTests) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const fetchMeals = async () => {
    let url = '';
    if (ingredients.value === 'ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchHandleChange.value}`;
    } else if (ingredients.value === 'name') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchHandleChange.value}`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchHandleChange.value}`;
      if (searchHandleChange.value.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    const api = await makeFetch(url);
    if (api.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      if (api.meals.length === 1) {
        history.push(`/meals/${api.meals[0].idMeal}`);
      }
      setMeals(api.meals.slice(0, twelve));
      searchHandleChange.setValue('');
    }
  };

  const fetchDrinks = async () => {
    let url = '';
    if (ingredients.value === 'ingredient') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchHandleChange.value}`;
    } else if (ingredients.value === 'name') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchHandleChange.value}`;
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchHandleChange.value}`;
      if (searchHandleChange.value.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    const api = await makeFetch(url);
    if (api.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      if (api.drinks.length === 1) {
        history.push(`/drinks/${api.drinks[0].idDrink}`);
      }
      setDrinks(api.drinks.slice(0, twelve));
      searchHandleChange.setValue('');
    }
  };

  const handleSubmit = async () => {
    const user = {
      email: email.value,
    };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

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

    setMeals(apiMeals.meals.slice(0, twelve));
    setDrinks(apiDrinks.drinks.slice(0, twelve));
    setCategoryMeals(apiCategoryMeals.meals.slice(0, five));
    setCategoryDrinks(apiCategoryDrinks.drinks.slice(0, five));
  };

  useEffect(() => {
    validationError();
  }, [email, password]);

  useEffect(() => {
    fetchApis();
  }, []);

  const values = useMemo(
    () => ({
      email,
      password,
      disabled,
      handleSubmit,
      ingredients,
      drinks,
      meals,
      searchHandleChange,
      fetchMeals,
      fetchDrinks,
      categoryMeals,
      categoryDrinks,
    }),
    [
      email,
      password,
      disabled,
      handleSubmit,
      ingredients,
      drinks,
      meals,
      searchHandleChange,
      fetchMeals,
      fetchDrinks,
    ],
  );

  return (
    <AppContext.Provider value={ values }>
      <div className="App">{children}</div>
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;

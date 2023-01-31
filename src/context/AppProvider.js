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
    if ((api || []).drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      if ((api?.drinks || []).length === 1) {
        history.push(`/drinks/${(api || []).drinks[0].idDrink}`);
      }
      setDrinks((api || []).drinks.slice(0, twelve));
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

  useEffect(() => {
    validationError();
  }, [email, password]);

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
      setDrinks,
      setMeals,
      makeFetch,
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
      setDrinks,
      setMeals,
      makeFetch,
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

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
  const [ingredient, setIngredient] = useState('');
  const searchHandleChange = useHandleChange('');
  const { makeFetch } = useFetch();

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
  const fetchApi = async () => {
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
    setIngredient(api);
  };

  const handleSubmit = () => {
    const user = {
      email: email.value,
    };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  useEffect(() => {
    validationError();
  }, [email, password]);

  // useEffect(() => {
  //   const urlName = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients.value}`;
  //   const getByName = async () => {
  //     const ApiNameRecipe = await makeFetch(urlName);
  //     setIngredient(ApiNameRecipe);
  //   };
  //   getByName();
  // }, [ingredients]);

  const values = useMemo(
    () => ({
      email,
      password,
      disabled,
      handleSubmit,
      ingredients,
      ingredient,
      searchHandleChange,
      fetchApi,
    }),
    [
      email,
      password,
      disabled,
      handleSubmit,
      ingredients,
      ingredient,
      searchHandleChange,
      fetchApi,
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

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
// import FilterContext from '../context/FilterContext';

function RecipeDetails() {
  const { makeFetch } = useContext(AppContext);
  const { location: { pathname } } = useHistory();
  const [apiDetails, setApiDetails] = useState([]);

  // const { apiDetails, setIdState } = useContext(FilterContext);
  const props = useParams();
  console.log(props);
  const fetchDetails = async () => {
    // console.log(idState.id);
    let url = '';
    console.log(pathname);
    if (pathname === `/meals/${props.id}`) {
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.id}`;
    //   console.log()
    } else {
      url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${props.id}`;
    }
    const api = await makeFetch(url);
    setApiDetails(api);
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  console.log(apiDetails);

  //   setIdState(props);
  //   console.log(apiDetails);
  return (
    <div>RecipeDetails</div>
  );
}
RecipeDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RecipeDetails;

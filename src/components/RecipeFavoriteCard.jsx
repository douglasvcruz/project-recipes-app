import React from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useCopy from '../hooks/useCopy';

function RecipeFavoriteCard({ each, index, test, favoriteList, setFavoriteList }) {
  const { id, nationality, category, name, image, alcoholicOrNot, type } = each;
  const copia = useCopy();
  const history = useHistory();

  const localStorageFavorites = (e) => {
    setFavoriteList(favoriteList.filter((favorite) => favorite.id !== e));
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(favoriteList.filter((favorite) => favorite.id !== e)));
  };

  return (
    <div
      className="favorite-div"
      key={ id }
    >
      <p>{ copia.copied }</p>
      <button type="button" onClick={ () => history.push(`/${type}s/${id}`) }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
      <button type="button" onClick={ () => history.push(`/${type}s/${id}`) }>
        <h4
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </h4>
      </button>
      { test === 'meal' ? (
        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${nationality} - ${category}`}
        </p>
      ) : (
        <p data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </p>
      )}
      <button
        type="button"
        style={ { border: 'none', backgroundColor: 'inherit' } }
        onClick={ () => { copia.copyButton(`/${type}s/${id}`); } }
      >
        <img
          src={ shareIcon }
          alt="profile-icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />

      </button>
      <button
        type="button"
        style={ { border: 'none', backgroundColor: 'inherit' } }
        onClick={ () => localStorageFavorites(id) }
      >
        <img
          src={ blackHeartIcon }
          alt="profile-icon"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />

      </button>
    </div>
  );
}

RecipeFavoriteCard.propTypes = {}.isRequired;

export default RecipeFavoriteCard;

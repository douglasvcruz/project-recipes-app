import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useCopy from '../hooks/useCopy';

export default function RecipeFavoriteCard(props) {
  const { each, index, test } = props;
  const { id, nationality, category, name, image, alcoholicOrNot, type } = each;

  const copia = useCopy();

  return (
    <div key={ id }>
      <p>{ copia.copie }</p>
      <img
        src={ image }
        style={ { width: 200 } }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <h4
        data-testid={ `${index}-horizontal-name` }
      >
        { name }

      </h4>

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
        onClick={ () => { copia.copyButton(`${type}s/${id}`); } }
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
        onClick={ () => {} }
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

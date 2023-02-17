import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useCopy from '../../hooks/useCopy';
import FilterContext from '../../context/FilterContext';
import { CardContainer, Card, ButtonCard, Icon } from './style';

function RecipeFavoriteCard({ each, index, test }) {
  const { id, nationality, category, name, image, alcoholicOrNot, type } = each;
  const copia = useCopy();
  const history = useHistory();
  const { favoriteList, setFavoriteList } = useContext(FilterContext);

  const localStorageFavorites = (e) => {
    setFavoriteList(favoriteList.filter((favorite) => favorite.id !== e));
    localStorage.setItem('favoriteRecipes', JSON
      .stringify(favoriteList.filter((favorite) => favorite.id !== e)));
  };

  return (
    <>
      <p>{ copia.copied }</p>
      <CardContainer key={ id }>
        <ButtonCard
          type="button"
          onClick={ () => history.push(`/${type}s/${id}`) }
        >
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </ButtonCard>
        <Card>
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
          <Icon
            ml={ 20 }
            type="button"
            onClick={ () => { copia.copyButton(`/${type}s/${id}`); } }
          >
            <img
              src={ shareIcon }
              alt="profile-icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </Icon>
          <Icon
            type="button"
            onClick={ () => localStorageFavorites(id) }
          >
            <img
              src={ blackHeartIcon }
              alt="profile-icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </Icon>
        </Card>
      </CardContainer>
    </>
  );
}

RecipeFavoriteCard.propTypes = {}.isRequired;

export default RecipeFavoriteCard;

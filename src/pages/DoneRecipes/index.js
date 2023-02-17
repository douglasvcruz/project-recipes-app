import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import useCopy from '../../hooks/useCopy';
import shareIcon from '../../images/shareIcon.svg';
import fastFood from '../../images/fastFood.svg';
import drinkIcon from '../../images/allDrink.svg';
import mealIcon from '../../images/allMeal.svg';
import { SectionFilter } from '../../styles/style';
import { Order, ButtonImg, Done, Icon,
  Nationality, Section, Tags, ContainerDone } from './style';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  const copia = useCopy();
  const history = useHistory();
  const ten = 10;

  const local = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    setDoneRecipes(local);
  }, []);

  const filterAll = () => {
    setDoneRecipes(local);
  };

  const filterFood = () => {
    setDoneRecipes(local.filter((a) => a.type === 'meal'));
  };

  const filterDrink = () => {
    setDoneRecipes(local.filter((a) => a.type === 'drink'));
  };

  return (
    <>
      <Header
        title="Done Recipes"
      />
      <SectionFilter>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          <img src={ fastFood } alt="fast food" />
          <p>All</p>
        </button>
        <button
          className="filter-btn"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ filterFood }
        >
          <img src={ mealIcon } alt="meal" />
          <p>Foods</p>
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrink }
        >
          <img src={ drinkIcon } alt="fast food" />
          <p>Drinks</p>
        </button>
      </SectionFilter>
      <p>{copia.copied}</p>
      <Order>
        { doneRecipes?.map((e, index) => (
          <Section key={ index }>
            <ButtonImg
              type="button"
              onClick={ () => history.push(e.type === 'meal'
                ? `/meals/${e.id}`
                : `/drinks/${e.id}`) }
            >
              <img
                src={ e.image }
                alt={ e.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </ButtonImg>
            <ContainerDone>
              <div>
                <h4 data-testid={ `${index}-horizontal-name` }>{ e.name }</h4>
                <Nationality data-testid={ `${index}-horizontal-top-text` }>
                  { e.type === 'meal' ? `${e.nationality} - ${e.category}`
                    : e.alcoholicOrNot }
                </Nationality>
                <Done data-testid={ `${index}-horizontal-done-date` }>
                  {`Done in: ${e.doneDate.slice(0, ten).replace('-', '/')
                    .replace('-', '/')}`}
                </Done>
                <Tags>
                  {e.tags.map((b) => (
                    <p
                      key={ e }
                      data-testid={ `${index}-${b?.trim()}-horizontal-tag` }
                    >
                      {b}
                    </p>))}
                </Tags>
              </div>
              <Icon
                type="button"
                style={ { border: 'none', backgroundColor: 'inherit' } }
                onClick={ () => copia.copyButton(e.type === 'meal'
                  ? `/meals/${e.id}`
                  : `/drinks/${e.id}`) }
              >
                <img
                  src={ shareIcon }
                  alt="profile-icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </Icon>
            </ContainerDone>
          </Section>))}
      </Order>
      <Footer />
    </>
  );
}

export default DoneRecipes;

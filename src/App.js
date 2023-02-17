import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login/index';
import Meals from './pages/Meals/index';
import Drinks from './pages/Drinks/index';
import Profile from './pages/Profile/index';
import DoneRecipes from './pages/DoneRecipes/index';
import FavoriteRecipes from './pages/FavoriteRecipes/index';
import AppProvider from './context/AppProvider';
import FilterProvider from './context/FilterProvider';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <FilterProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Meals } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route
              exact
              path="/meals/:id/in-progress"
              component={ RecipeInProgress }
            />
            <Route
              exact
              path="/drinks/:id/in-progress"
              component={ RecipeInProgress }
            />
            <Route exact path="/meals/:id" component={ RecipeDetails } />
            <Route exact path="/drinks/:id" component={ RecipeDetails } />
          </Switch>
        </FilterProvider>
      </AppProvider>
    </>
  );
}

export default App;

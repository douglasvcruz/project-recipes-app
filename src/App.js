import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import './App.css';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </AppProvider>
  );
}

export default App;

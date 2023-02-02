import React from 'react';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <Header
        title="MEALS"
      />
      <Filters />
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;

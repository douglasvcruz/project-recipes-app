import React from 'react';
import Filters from '../../components/Filters/index';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import Recipes from '../../components/Recipes/index';

function Meals() {
  return (
    <>
      <Header
        title="Meals"
      />
      <Filters />
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;

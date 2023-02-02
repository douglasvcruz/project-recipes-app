import React from 'react';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <>
      <Header
        title="DRINKS"
      />
      <Filters />
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;

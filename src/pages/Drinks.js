import React from 'react';
import Header from '../components/Header';

export default function Drinks() {
  const haveSearch = true;

  return (
    <div>
      <Header
        title="Drinks"
        haveSearch={ haveSearch }
      />
    </div>
  );
}

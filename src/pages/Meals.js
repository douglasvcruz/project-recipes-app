import React from 'react';
import Header from '../components/Header';

export default function Meals() {
  const haveSearch = true;

  return (
    <div>
      <Header
        title="Meals"
        haveSearch={ haveSearch }
      />
    </div>
  );
}

'use client';

import Filter from '@/components/Filter';
import SearchBar from '@/components/UI/SearchBar';

import { fuels, yearsOfProduction } from '@/constants';
import CarsList from './CarsList';
import { useState } from 'react';
import { IFilter } from '@/types';

const Catalogue = () => {
  const [filters, setFilters] = useState<IFilter>({
    manufacturer: '',
    year: 2022,
    model: '',
    limit: 10,
    fuel: '',
  });

  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore the cars you might like</p>
      </div>
      <div className="home__filters">
        <SearchBar onSetFilters={setFilters} />
        <div className="home__filter-container">
          <Filter onSetFilters={setFilters} title="fuel" options={fuels} />
          <Filter
            onSetFilters={setFilters}
            title="year"
            options={yearsOfProduction}
          />
        </div>
      </div>
      <CarsList filters={filters} onSetFilters={setFilters} />
    </div>
  );
};

export default Catalogue;

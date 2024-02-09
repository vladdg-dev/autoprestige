import dotenv from 'dotenv';

import { useEffect } from 'react';

import Filter from '@/components/Filter';
import Hero from '@/components/Hero';
import SearchBar from '@/components/UI/SearchBar';
import { fetchCars } from '@/utils';
import CarCard from '@/components/CarCard';
import { ICar } from '@/types';
import { fuels, yearsOfProduction } from '@/constants';

dotenv.config();

export default async function Home({ searchParams }) {
  const cars: ICar[] = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <Filter title="fuel" options={fuels} />
            <Filter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {cars ? (
          <section>
            <div className="home__cars-wrapper">
              {cars.map((car) => (
                <CarCard key={car.model} car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No results</h2>
          </div>
        )}
      </div>
    </main>
  );
}

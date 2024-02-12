import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ShowMore from '@/components/ShowMore';
import CarCard from '@/components/CarCard';
import { ICar, IFilter } from '@/types';

const CarsList: FC<{
  filters: IFilter;
  onSetFilters: Dispatch<SetStateAction<IFilter>>;
}> = ({ filters, onSetFilters }) => {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<ICar[]>([]);

  const { manufacturer, year, model, limit, fuel } = filters;

  const key = process.env.RAPID_API_KEY;
  const host = process.env.RAPID_API_HOST;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': key as string,
              'X-RapidAPI-Host': host as string,
            },
          },
        );
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error(error);
      }
    };

    const timeoutId = setTimeout(fetchCars, 500);
    return () => clearTimeout(timeoutId);
  }, [manufacturer, year, model, limit, fuel, host, key]);

  return (
    <>
      {cars.length > 0 ? (
        <section>
          <div className="home__cars-wrapper">
            {cars.map((car, index) => (
              <CarCard key={index} car={car} />
            ))}
          </div>
          <ShowMore
            pageNumber={
              searchParams.get('limit') !== null
                ? parseInt(searchParams.get('limit')!, 10) / 10
                : 1
            }
            isNext={
              searchParams.get('limit') !== null
                ? parseInt(searchParams.get('limit')!, 10) > cars.length
                : false
            }
            onSetFilters={onSetFilters} // Unchanged
          />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">No results</h2>
        </div>
      )}
    </>
  );
};

export default CarsList;

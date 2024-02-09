import { ICar } from '@/types';

const url: string = process.env.RAPID_API_URL!;
const apiKey: string = process.env.RAPID_API_KEY!;
const host: string = process.env.RAPID_API_HOST!;

export const fetchCars = async (model: string) => {
  try {
    const response = await fetch(`${url}?model=${model}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': host,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const generateCarImageUrl = (car: ICar, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', year.toString());
  url.searchParams.append('angle', `${angle}`);

  return url.toString();
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

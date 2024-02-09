'use client';

import { FC, FormEvent, useState } from 'react';
import Image from 'next/image';

import SearchManufacturer from '../SearchManufacturer';
import { useRouter } from 'next/navigation';

const SearchButton: FC<{ className?: string }> = ({ className }) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${className}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying glass"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );
};

const SearchBar = () => {
  const router = useRouter();

  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  const searchHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (manufacturer === '' && model === '')
      return alert('Please fill in the search bar');

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set('model', model);
    } else {
      searchParams.delete('model');
    }

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer);
    } else {
      searchParams.delete('manufacturer');
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={searchHandler}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          onSetManufacturer={setManufacturer}
        />
        <SearchButton className="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton className="sm:hidden" />
      </div>
      <SearchButton className="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;

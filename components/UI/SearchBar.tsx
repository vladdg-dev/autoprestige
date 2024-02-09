'use client';

import { useState } from 'react';

import SearchManufacturer from '../SearchManufacturer';

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('');

  const searchHandler = () => {};

  return (
    <form className="searchbar" onSubmit={searchHandler}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          onSetManufacturer={setManufacturer}
        />
      </div>
    </form>
  );
};

export default SearchBar;

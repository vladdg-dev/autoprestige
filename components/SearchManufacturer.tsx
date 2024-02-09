'use client';

import {
  ChangeEvent,
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';

import { manufacturers } from '@/constants';

interface SearchManufacturerProps {
  manufacturer: string;
  onSetManufacturer: Dispatch<SetStateAction<string>>;
}

const SearchManufacturer: FC<SearchManufacturerProps> = ({
  manufacturer,
  onSetManufacturer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryFilteredResults = useMemo(() => {
    if (!searchQuery) return manufacturers;

    const normalizedQuery = searchQuery.toLowerCase().trim();

    return manufacturers.filter((manufacturer) =>
      manufacturer
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '')
        .includes(normalizedQuery),
    );
  }, [searchQuery]);

  const searchInputHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={onSetManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car logo"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(placeholder: string) => placeholder}
            onChange={(event) => searchInputHandler(event)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterEnter={() => setSearchQuery('')}
          >
            <Combobox.Options>
              {searchQueryFilteredResults.length === 0 &&
                searchQuery !== '' && (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Nothing found.
                  </div>
                )}
              {searchQueryFilteredResults.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative search-manufacturer__option ${
                      active ? 'bg-primary-blue text-white' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;

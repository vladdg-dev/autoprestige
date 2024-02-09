'use client';

import { FC, Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { updateSearchParams } from '@/utils';

interface FilterProps {
  title: string;
  options: [
    {
      title: string;
      value: string;
    },
  ];
}

const Filter: FC<FilterProps> = ({ title, options }) => {
  const router = useRouter();

  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = (event: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, event.value.toLowerCase());

    router.push(newPathName, { scroll: false });
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(event) => {
          setSelected(event);
          handleUpdateParams(event);
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? 'bg-primary-blue text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Filter;

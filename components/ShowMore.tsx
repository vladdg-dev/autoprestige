'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction } from 'react';
import Button from './UI/Button';
import { updateSearchParams } from '@/utils';
import { IFilter } from '@/types';

interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
  onSetFilters: Dispatch<SetStateAction<IFilter>>;
}

const ShowMore: FC<ShowMoreProps> = ({ pageNumber, isNext, onSetFilters }) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSearchParams('limit', newLimit.toString());

    onSetFilters((prevState) => ({
      ...prevState,
      limit: newLimit,
    }));

    router.push(newPathName, { scroll: false });
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <Button
          title="Show More"
          type="button"
          className="bg-primary-blue rounded-full text-white"
          clickHandler={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;

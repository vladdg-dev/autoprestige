'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Button from './UI/Button';
import { updateSearchParams } from '@/utils';

interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

const ShowMore: FC<ShowMoreProps> = ({ pageNumber, isNext }) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSearchParams('limit', newLimit.toString());

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

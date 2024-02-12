import { FC, ReactNode, Suspense } from 'react';

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
};

export default Provider;

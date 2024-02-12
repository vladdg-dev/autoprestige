import Hero from '@/components/Hero';
import Catalogue from '@/components/Catalogue';
import Provider from '@/components/Provider';

import dotenv from 'dotenv';

dotenv.config();

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Provider>
        <Hero />
        <Catalogue />
      </Provider>
    </main>
  );
};

export default Home;

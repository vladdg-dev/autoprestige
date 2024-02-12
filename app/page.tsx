import Hero from '@/components/Hero';
import Catalogue from '@/components/Catalogue';
import Provider from '@/components/Provider';

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Provider>
        <Catalogue />
      </Provider>
    </main>
  );
};

export default Home;

import React from 'react';
import Hero from '../components/Home/Hero';
import QuickInfo from '../components/Home/QuickInfo';
import PhotoCarousel from '../components/Home/PhotoCarousel';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <QuickInfo />
      <PhotoCarousel />
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import Main from '../components/main';
import Header from '../components/header';
import Footer from '../components/footer';

const Index = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div>
      <Header />
      <Main />
      <Footer/>
    </div>
  );
};

export default Index;

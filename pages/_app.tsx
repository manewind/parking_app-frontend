import { useEffect, useState } from 'react';
import { AuthProvider } from '../contexts/authContext';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';  
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

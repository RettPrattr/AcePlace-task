import Router from 'next/router';
import { useState, useEffect, FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import '../app/styles/global.scss'; 
import '../app/styles/fonts.scss'; 

const Loader: FunctionComponent = () => (
  <div className="preloader">
    <div className="loader"></div>
  </div>
);

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => {

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000); 
    };
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

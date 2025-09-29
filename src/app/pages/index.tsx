import React from 'react';
import Head from 'next/head';
import WeatherApp from '../components/WeatherApp';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>How&apos;s the sky looking today? - Weather App</title>
        <meta name="description" content="Get current weather information for any city worldwide. Check temperature, humidity, and weather conditions with a beautiful modern interface." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="weather, temperature, humidity, forecast, climate, sky" />
        <meta name="theme-color" content="#1e1b4b" />
        <link rel="icon" href="/favicon.ico" />
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          body {
            background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%);
            min-height: 100vh;
          }

          ::placeholder {
            color: rgba(255, 255, 255, 0.5) !important;
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus {
            -webkit-text-fill-color: #ffffff !important;
            -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.05) inset !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
        `}</style>
      </Head>
      <WeatherApp />
    </>
  );
};

export default Home;
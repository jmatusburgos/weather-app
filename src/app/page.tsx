import React from 'react';
import Head from 'next/head';
import WeatherApp from './components/WeatherApp';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Weather App - Get Current Weather Information</title>
        <meta name="description" content="Get current weather information for any city worldwide. Check temperature, humidity, and weather conditions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="weather, temperature, humidity, forecast, climate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <WeatherApp />
      </main>
    </>
  );
};

export default Home;
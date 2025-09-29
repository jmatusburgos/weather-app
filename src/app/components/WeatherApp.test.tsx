import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherApp from './WeatherApp';
import { WeatherData } from '../types/weather';

// Mock the fetch API
global.fetch = jest.fn();

const mockWeatherData: WeatherData = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
  base: 'stations',
  main: { temp: 15.4, feels_like: 14.9, temp_min: 13.8, temp_max: 16.7, pressure: 1012, humidity: 72 },
  visibility: 10000,
  wind: { speed: 4.63, deg: 240 },
  clouds: { all: 20 },
  dt: 1622564400,
  sys: { type: 2, id: 2019646, country: 'GB', sunrise: 1622519612, sunset: 1622574613 },
  timezone: 3600,
  id: 2643743,
  name: 'London',
  cod: 200,
};

describe('WeatherApp', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should display weather information on successful search', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockWeatherData }),
    });

    render(<WeatherApp />);

    const cityInput = screen.getByTestId('city-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(cityInput, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId('weather-info')).toBeInTheDocument();
    });

    expect(screen.getByText('London, GB')).toBeInTheDocument();
    expect(screen.getByTestId('temperature')).toHaveTextContent('15°');
    expect(screen.getByTestId('humidity')).toHaveTextContent('72%');
    expect(screen.getByTestId('description')).toHaveTextContent('few clouds');
  });

  it('should display an error message for an invalid city', async () => {
    const errorMessage = 'City not found';
    (fetch as jest.Mock).mockResolvedValue({
      ok: true, // The fetch to /api/weather itself is successful
      json: () => Promise.resolve({ success: false, error: errorMessage }),
    });

    render(<WeatherApp />);

    const cityInput = screen.getByTestId('city-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(cityInput, { target: { value: 'InvalidCity' } });
    fireEvent.click(searchButton);

    const errorElement = await screen.findByTestId('error-message');
    expect(errorElement).toHaveTextContent(errorMessage);
    expect(screen.queryByTestId('weather-info')).not.toBeInTheDocument();
  });

  it('should update input value on change and call search on button click', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockWeatherData }),
    });
    render(<WeatherApp />);
    const cityInput = screen.getByTestId('city-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(cityInput, { target: { value: 'Paris' } });
    expect(cityInput).toHaveValue('Paris');

    fireEvent.click(searchButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/api/weather?city=Paris&lang=en'));
  });
});
import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherInfoProps {
    weatherData: WeatherData;
    t: any;
    language: string; // Keep for locale-specific date formatting
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData, t, language }) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getWeatherEmoji = (main: string) => {
    const weatherEmojis: { [key: string]: string } = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    return weatherEmojis[main] || '🌤️';
  };

  return (
    <div 
      data-testid="weather-info"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '32px',
        color: '#ffffff',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '24px' 
      }}>
        <div>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            color: '#ffffff', 
            fontSize: '28px',
            fontWeight: '600'
          }}>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p style={{
            margin: '0',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '16px'
          }}>
            {formatDate()}
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '48px',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
          }}>
            {getWeatherEmoji(weatherData.weather[0].main)}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '64px',
              fontWeight: '300',
              lineHeight: '1',
              color: '#ffffff'
            }} data-testid="temperature">
              {Math.round(weatherData.main.temp)}°
            </div>
            <div style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginTop: '4px'
            }}>
              <span data-testid="feels-like">{t.feelsLike}</span> {Math.round(weatherData.main.feels_like)}°
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '16px',
        marginTop: '24px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '20px',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '8px'
          }}>
            💧
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '4px'
          }} data-testid="humidity">
            {weatherData.main.humidity}%
          </div>
          <div style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            {t.humidity}
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '20px',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '8px'
          }}>
            🌤️
          </div>
          <div style={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#ffffff',
            marginBottom: '4px',
            textTransform: 'capitalize'
          }} data-testid="description">
            {weatherData.weather[0].description}
          </div>
          <div style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            {t.condition}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
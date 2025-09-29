// /app/api/weather/route.ts
import { NextResponse } from 'next/server';
import { WeatherApiResponse } from '@/app/types/weather';
import { translations } from '@/../public/locales/translations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const lang = searchParams.get('lang') || 'en'; // Default to English if no language is specified
  const t = translations[lang as keyof typeof translations] || translations.en;

  if (!city) {
    return NextResponse.json({ success: false, error: t.cityRequired }, { status: 400 });
  }

  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

  console.log(API_KEY);

  if (!API_KEY) {
    return NextResponse.json({ success: false, error: t.apiKeyMissing }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=${lang}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ success: false, error: t.cityNotFound }, { status: 404 });
      }
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: WeatherApiResponse = await response.json();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ success: false, error: t.fetchError }, { status: 500 });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { WeatherApiResponse } from '../../types/weather';
import { translations } from '../../lib/translations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherApiResponse>
) {
  const lang = (req.query.lang as string) || 'en';
  const t = translations[lang as keyof typeof translations] || translations.en;

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: t.methodNotAllowed });
  }

  const { city } = req.query;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ success: false, error: t.cityRequired });
  }

  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ success: false, error: t.apiKeyMissing });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=${lang}`
    );
    
    console.log(response);
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ success: false, error: t.cityNotFound });
      }
      throw new Error(`Weather API error: ${response.status}`);
    }

    console.log('Response is OK'); // Add this line
    const data = await response.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Weather API error:', error);
    return res.status(500).json({ success: false, error: t.fetchError });
  }
}
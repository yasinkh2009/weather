import { location } from '@/lib/store/location';

const useFetch = async ({
  isOpenWeatherMap = true,
  url = '',
  options = {},
}: {
  isOpenWeatherMap?: boolean;
  url?: string;
  options?: RequestInit;
}) => {
  if (isOpenWeatherMap) {
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
    const correctedLocation = location.value.split(' ').join('+');

    url = `https://api.openweathermap.org/data/2.5/find?q=${correctedLocation}&units=imperial&type=accurate&mode=json&APPID=${apiKey}`;
  }

  const response = await window.fetch(url, options);
  const data = await response.json();

  return data;
};

export default useFetch;

import { weatherData } from '@/lib/store/weather';

const background = (): string => {
  const backgroundImages: { [key: string]: string } = {
    thunderstorm: '/images/thunderstorm.avif',
    drizzle: '/images/drizzle.avif',
    rain: '/images/rain.avif',
    snow: '/images/snow.avif',
    atmosphere: '/images/atmosphere.avif',
    clear: '/images/clear.avif',
    clouds: '/images/clouds.avif',
  };

  const weatherId = weatherData.value?.id;

  const weatherIdToImageKey: { [key: string]: [number, number] } = {
    thunderstorm: [200, 232],
    drizzle: [300, 321],
    rain: [500, 531],
    snow: [600, 622],
    atmosphere: [701, 781],
    clear: [800, 800],
    clouds: [801, 804],
  };

  if (weatherId !== undefined) {
    for (const [key, range] of Object.entries(weatherIdToImageKey)) {
      if (weatherId >= range[0] && weatherId <= range[1]) {
        return backgroundImages[key];
      }
    }
  }

  return '';
};

export default background;

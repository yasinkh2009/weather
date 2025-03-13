import { ref } from 'vue';
import useFetch from '../utils/fetch';

interface WeatherData {
  temp: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  clouds: number;
  id: number;
  status: string;
}

const weatherData = ref<WeatherData | null>(null);

const getWeatherData = async () => {
  weatherData.value = await useFetch({}).then((data) => {
    const dataList = data.list[0];

    return {
      temp: Math.round(dataList.main.temp),
      tempMin: Math.round(dataList.main.temp_min),
      tempMax: Math.round(dataList.main.temp_max),
      pressure: dataList.main.pressure,
      humidity: dataList.main.humidity,
      windSpeed: dataList.wind.speed,
      clouds: dataList.clouds.all,
      id: dataList.weather[0].id,
      status: dataList.weather[0].main,
    };
  });
};

export { weatherData, getWeatherData };

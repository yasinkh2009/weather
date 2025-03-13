<script lang="ts" setup>
import { inject, ref, watch, type Ref } from 'vue';
import { unit } from '@/lib/store/unit';
import WeatherDetailsItem from './WeatherDetailsItem.vue';

const weatherData = inject('weatherData') as Ref<{
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  clouds: number;
} | null>;
const getWeatherData = inject('getWeatherData') as () => void;

getWeatherData();

const tempMin = ref(0);
const tempMax = ref(0);
const pressure = ref(0);
const humidity = ref(0);
const windSpeed = ref(0);
const clouds = ref(0);

watch(
  weatherData,
  (newWeatherData) => {
    if (newWeatherData) {
      tempMin.value = newWeatherData.tempMin;
      tempMax.value = newWeatherData.tempMax;
      pressure.value = newWeatherData.pressure;
      humidity.value = newWeatherData.humidity;
      windSpeed.value = newWeatherData.windSpeed;
      clouds.value = newWeatherData.clouds;
    }
  },
  { immediate: true }
);

watch(unit, (newUnit) => {
  if (newUnit === 'F') {
    tempMax.value = Math.round((tempMax.value * 9) / 5 + 32);
    tempMin.value = Math.round((tempMin.value * 9) / 5 + 32);
  } else {
    tempMax.value = Math.round(((tempMax.value - 32) * 5) / 9);
    tempMin.value = Math.round(((tempMin.value - 32) * 5) / 9);
  }
});
</script>

<template>
  <div class="pt-8 border-t border-t-white hidden lg:flex flex-col gap-8">
    <span class="text-[14px] font-medium">Weather Details</span>
    <div class="flex flex-col gap-4">
      <WeatherDetailsItem title="Clouds" :value="`${clouds}%`" />
      <WeatherDetailsItem title="Humidity" :value="`${humidity}%`" />
      <WeatherDetailsItem title="Wind" :value="`${windSpeed} mph`" />
      <WeatherDetailsItem title="Pressure" :value="`${pressure} Pa`" />
      <WeatherDetailsItem
        title="Highest Temperature"
        :value="`${tempMax}°${unit}`"
      />
      <WeatherDetailsItem
        title="Lowest Temperature"
        :value="`${tempMin}°${unit}`"
      />
    </div>
  </div>
</template>

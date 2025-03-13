<script lang="ts" setup>
import { ref, inject, watch } from 'vue';
import { unit, toggleUnit } from '@/lib/store/unit';
import WeatherDetails from './WeatherDetails.vue';
import LocationIcon from '../icons/LocationIcon.vue';

const { selectedCity } = defineProps<{ selectedCity: string }>();

interface WeatherData {
  temp: number;
  status: string;
}

const weatherData = inject<WeatherData>('weatherData', { temp: 0, status: '' });
const getWeatherData = inject('getWeatherData') as (city: string) => void;

watch(
  () => selectedCity,
  (newCity) => {
    getWeatherData(newCity);
  },
  { immediate: true }
);

const temp = ref(0);
const status = ref('');

watch(
  weatherData,
  (newWeatherData) => {
    if (newWeatherData) {
      temp.value = newWeatherData.temp;
      status.value = newWeatherData.status;
    }
  },
  { immediate: true }
);

watch(unit, (newUnit) => {
  if (newUnit === 'F') {
    temp.value = Math.round((temp.value * 9) / 5 + 32);
  } else {
    temp.value = Math.round((5 / 9) * (temp.value - 32));
  }
});
</script>

<template>
  <div class="flex flex-col gap-16">
    <div
      class="flex flex-col lg:flex-row gap-1 lg:gap-0 justify-between items-start lg:items-end"
    >
      <div class="flex flex-col gap-1 lg:gap-2.5">
        <span class="text-2xl lg:text-8xl drop-shadow-sm">{{ status }}</span>
        <span
          class="text-5xl lg:text-7xl font-semibold drop-shadow-sm select-none cursor-pointer"
          @click="toggleUnit"
          >{{ temp }}°{{ unit }}</span
        >
      </div>
      <div class="flex items-center gap-1 lg:gap-2">
        <LocationIcon class="w-6 h-6 lg:w-9 lg:h-9 drop-shadow-sm" />
        <span class="lg:text-2xl font-medium drop-shadow-sm">{{
          selectedCity
        }}</span>
      </div>
    </div>
    <WeatherDetails />
  </div>
</template>

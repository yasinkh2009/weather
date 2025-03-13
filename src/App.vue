<script setup lang="ts">
import { ref, watch, provide } from 'vue';

import { weatherData } from '@/lib/store/weather';
import { location } from '@/lib/store/location';
import background from '@/lib/utils/background';

import Preloader from '@/components/common/Preloader.vue';
import LeftSide from '@/components/LeftSide/LeftSide.vue';
import RightSide from '@/components/RightSide/RightSide.vue';

const isLoading = ref(true);

const isSearchModalOpen = ref(false);
provide('isSearchModalOpen', isSearchModalOpen);

watch(weatherData, (newWeatherData) => {
  if (newWeatherData) {
    isLoading.value = false;
  }
});

const handleFetchStart = () => {
  isLoading.value = true;
};
</script>

<template>
  <Preloader :class="{ 'opacity-0 invisible scale-125': !isLoading }" />
  <div
    class="bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${background()})` }"
  >
    <div
      class="min-h-screen grid lg:grid-cols-8 font-poppins text-white py-12 px-6 lg:py-0 md:px-16 lg:px-0 bg-gradient-to-b from-transparent to-black/80"
    >
      <LeftSide
        :class="{ 'opacity-0 invisible scale-90': isLoading }"
        :selected-city="location"
      />
      <RightSide
        :class="{ 'opacity-0 invisible': isLoading }"
        @update:city="location = $event"
        @fetch-start="handleFetchStart"
      />
    </div>
  </div>
</template>

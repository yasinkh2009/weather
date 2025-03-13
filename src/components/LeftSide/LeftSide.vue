<script lang="ts" setup>
import Header from './Header.vue';
import Main from './Main.vue';

const { selectedCity } = defineProps<{ selectedCity: string }>();
</script>

<template>
  <div
    class="lg:col-span-5 lg:p-18 transition-all duration-300 flex lg:justify-between flex-col gap-16 lg:gap-0"
  >
    <Header />
    <Main :selected-city="selectedCity" />
  </div>
</template>

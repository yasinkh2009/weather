<script lang="ts" setup>
import { inject, type Ref } from 'vue';
import Search from './Search.vue';
import CloseIcon from '../icons/CloseIcon.vue';
import WeatherDetails from './WeatherDetails.vue';

const emit = defineEmits(['update:city', 'fetch-start']);
const isSearchModalOpen = inject('isSearchModalOpen') as Ref<boolean>;

const closeSearchModal = () => {
  isSearchModalOpen.value = false;
};
</script>

<template>
  <div
    :class="{
      'w-full h-full fixed lg:relative inset-0 z-40 col-span-3 py-12 px-6 lg:p-18 bg-black/20 backdrop-blur-[48px] border-l border-l-white/20 transition-all duration-300 flex flex-col justify-start gap-16 lg:gap-9 scale-95': true,
      'invisible opacity-0 scale-95 lg:visible lg:opacity-100 lg:scale-100':
        !isSearchModalOpen,
      'visible opacity-100 scale-100': isSearchModalOpen,
    }"
  >
    <div class="flex justify-center lg:hidden">
      <button type="button" @click="isSearchModalOpen = false">
        <CloseIcon class="size-6" />
      </button>
    </div>
    <Search
      @update:city="emit('update:city', $event)"
      @fetch-start="emit('fetch-start')"
      @close="closeSearchModal"
    />
    <WeatherDetails />
  </div>
</template>

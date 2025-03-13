<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, inject, type Ref } from 'vue';
import SearchIcon from '../icons/SearchIcon.vue';

const isSearchModalOpen = inject('isSearchModalOpen') as Ref<boolean>;

const now = ref(new Date());

const date = (input: object) => {
  return new Intl.DateTimeFormat('en-US-u-ca-persian', input).format(now.value);
};
const year = ref(date({ year: 'numeric' }));
const month = ref(date({ month: 'short' }));
const day = ref(date({ day: '2-digit' }));

const updateTime = () => {
  now.value = new Date();
};

const greeting = computed(() => {
  const hours = now.value.getHours();
  if (hours < 12) return 'Good morning';
  if (hours < 18) return 'Good afternoon';
  return 'Good evening';
});

onMounted(() => {
  const interval = setInterval(updateTime, 1000);
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <div class="flex justify-between items-center">
    <div
      class="flex lg:justify-between flex-col gap-1 lg:gap-0 lg:flex-row items-start lg:items-center grow"
    >
      <span class="text-xs lg:text-xl drop-shadow-sm"> {{ greeting }}! </span>
      <div
        class="flex items-center gap-1 lg:gap-4 text-xs lg:text-xl [&>*]:drop-shadow-sm"
      >
        <span>{{ `${month} ${day} ${year}` }}</span>
        <span class="h-7.5 w-px bg-white hidden lg:inline-block"></span>
        <span class="text-white md:hidden">|</span>
        <span>{{
          now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }}</span>
      </div>
    </div>
    <button type="button" class="lg:hidden" @click="isSearchModalOpen = true">
      <SearchIcon class="size-6" />
    </button>
  </div>
</template>

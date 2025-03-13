<script lang="ts" setup>
import { ref } from 'vue';
import SearchSuggestions from './SearchSuggestions.vue';

const city = ref('');
const emit = defineEmits(['update:city', 'fetch-start', 'close']);

const updateCity = (newCity: string) => {
  city.value = newCity;
  emit('update:city', city.value);
  city.value = '';
};
</script>

<template>
  <div class="flex flex-col items-start gap-9">
    <input
      v-model="city"
      type="text"
      class="text-sm lg:text-md placeholder:text-white/40 block w-full pb-3 border-b border-b-white/40 outline-none"
      placeholder="Search Location"
    />
    <SearchSuggestions
      :search="city"
      @update:search="updateCity"
      @fetch-start="emit('fetch-start')"
      @close="emit('close')"
    />
  </div>
</template>

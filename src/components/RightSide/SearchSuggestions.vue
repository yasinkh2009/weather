<script lang="ts" setup>
import { ref, watch } from 'vue';
import sourceData from '@/lib/cities.json';

const { search } = defineProps<{ search: string }>();
const emit = defineEmits(['update:search', 'fetch-start', 'close']);

const defaultCities: Array<string> = ['Tehran', 'Shiraz', 'Isfahan'];

const suggestions = ref<string[]>(defaultCities);

watch(
  () => search,
  () => {
    if (!search) {
      suggestions.value = defaultCities;
      return;
    } else {
      const suggestionsObjects = sourceData
        .filter((item) =>
          item.city.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 3);
      suggestions.value = [...suggestionsObjects.map((item) => item.city)];
    }
  }
);

const selectSuggestion = (suggestion: string) => {
  emit('fetch-start');
  emit('update:search', suggestion);
  emit('close');
  suggestions.value = defaultCities;
};
</script>

<template>
  <div
    class="flex flex-col items-start gap-4 px-2.5 text-base text-white/50 font-normal"
  >
    <span
      v-for="suggestion in suggestions"
      :key="suggestion"
      class="cursor-pointer select-none text-sm lg:text-base"
      @click="selectSuggestion(suggestion)"
    >
      {{ suggestion }}
    </span>
    <span v-if="suggestions.length === 0">No cities found.</span>
  </div>
</template>

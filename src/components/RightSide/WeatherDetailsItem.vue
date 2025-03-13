<script lang="ts" setup>
defineProps<{
  title: string;
  value: string;
}>();
</script>

<template>
  <div class="flex justify-between items-center">
    <span class="text-white/60">{{ title }}</span>
    <span class="text-white/70">{{ value }}</span>
  </div>
</template>

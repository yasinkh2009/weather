<script lang="ts" setup>
defineProps<{
  title: string;
  value: string;
}>();
</script>

<template>
  <div
    class="flex justify-between items-center text-white [&>*]:drop-shadow-sm"
  >
    <span>{{ title }}</span>
    <span>{{ value }}</span>
  </div>
</template>

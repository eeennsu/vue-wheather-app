<template>
  <div
    v-for="i in 3"
    :key="i" 
    class="relative flex items-center justify-between w-full py-4 pr-4 transition-transform duration-300 rounded-lg shadow-md opacity-60 max-sm:max-w-80 pl-7 bg-weather-secondary/45 hover:-translate-y-1 h-[100px]"
  >
    <div class="flex flex-col flex-1 gap-2">
      <BaseSkeletonVue class="max-w-[70%]" />
      <BaseSkeletonVue class="max-w-[60%]" />
    </div>

    <div class="flex flex-col items-end flex-1 gap-2">
      <BaseSkeletonVue class="max-w-[50px] w-full" />
      <BaseSkeletonVue class="max-w-[70px] w-full" />
    </div>
  </div>
</template>

<script setup>
import BaseSkeletonVue from './BaseSkeleton.vue';

</script>
<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-col items-center mt-14">
      <BaseSkeletonVue class="max-w-[260px] h-[100px] w-full" />
      <BaseSkeletonVue class="max-w-[260px] h-[75px] w-full" />
    </div>

    <div class="flex flex-col items-center mt-8">
      <BaseSkeletonVue class="max-w-[260px] h-[100px] w-full" />
      <BaseSkeletonVue class="max-w-[260px] h-[75px] w-full" />
    </div>
   
    <div class="flex flex-col items-center px-8 py-12 mt-32">
      <BaseSkeletonVue class="max-w-screen-md h-[100px] w-full" />
    </div>
   
    <div class="flex flex-col items-center px-8 py-12">
      <BaseSkeletonVue class="max-w-screen-md h-[100px] w-full" />
    </div>
  </div>
</template>

<script setup>
import BaseSkeletonVue from './BaseSkeleton.vue';
</script>

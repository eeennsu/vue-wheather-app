<template>
  <div class="flex w-full pl-7 pr-4 py-4 justify-between transition-transform duration-300 items-center rounded-lg shadow-md cursor-pointer bg-weather-secondary/45 hover:-translate-y-1.5">
    <div class="flex items-center gap-3">
      <h2 class="text-3xl font-bold tracking-wider">{{ city.name }}</h2>
      <span class="text-xl">|</span>
      <h3 class="text-lg">{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="self-end text-4xl">
        {{ getCelsius(city.weather.main.temp) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-sm">
          H: {{ getCelsius(city.weather.main.temp_max) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCelsius } from '../utils/formmat';
  defineProps({
    city: {
      type: Object,
      required: true,
      default: () => {}
    }
  });
</script>
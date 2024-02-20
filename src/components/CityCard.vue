<template>
  <div class="relative flex items-center justify-between w-full py-4 pr-4 transition-transform duration-300 rounded-lg shadow-md cursor-pointer max-sm:max-w-80 pl-7 bg-weather-secondary/45 hover:-translate-y-1">
    <div class="flex gap-3 sm:items-center max-sm:flex-col">
      <h2 class="text-xl font-bold tracking-wider sm:text-3xl">{{ city.name }}</h2>
      <span class="text-xl max-sm:hidden">|</span>
      <h3 class="text-sm sm:text-lg">{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="self-end text-4xl">
        {{ getCelsius(city.weather.main.temp) }}&#8451;
      </p>
      <div class="flex gap-2">
        <span class="text-sm">
          H: {{ getCelsius(city.weather.main.temp_max) }}&#8451;
        </span>
      </div>
    </div>

    <div class="absolute -top-2 -right-2">
      <button
        class="flex items-center justify-center transition-colors bg-white rounded-full hover:text-white text-weather-tertiary hover:bg-weather-tertiary w-7 h-7"
        @click.stop="removeCityCard(city.id)"
      >
        <font-awesome-icon :icon="['fas', 'minus']" />
      </button>
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
  },
  removeCityCard: {
    type: Function,
    required: true
  }
});

</script>
<template>
  <div v-for="city in savedCities" :key="city.id" class="w-full">
    <CityCard :city="city" @click="gotoCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0" class="text-center">
    추가된 지역이 없습니다. 즐겨찾는 지역을 추가하여 빠르게 확인하세요!
  </p>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';
import axios from 'axios';

let savedCities = reactive([]);

const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities = JSON.parse(localStorage.getItem('savedCities'));

    const requests = [];
    
    savedCities.forEach((city) => {
      const response = axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: city.coords.lat,
          lon: city.coords.lng,
          appid: import.meta.env.VITE_WHEATHER_API_KEY,
          units: 'imperial'
        }
      });

      requests.push(response);
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((weather, i) => {
      savedCities[i].weather = weather.data;
    });
  }
}

await getCities();

const router = useRouter();
const gotoCityView = (city) => {
  router.push({
    name: 'detailCity',
    params: {
      city: city?.name,
      state: city?.state,
    },
    query: {
      lat: city?.coords.lat,
      lng: city?.coords.lng
    }
  });
}
</script>
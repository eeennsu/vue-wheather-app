<template>
  <div v-for="city in savedCities" :key="city.id" class="flex justify-center w-full">
    <CityCard 
      :city="city" 
      :removeCityCard="removeCityCard"
      @click="goToCityView(city)" 
    />
  </div>

  <p v-if="savedCities.length === 0" class="text-center">
    추가된 지역이 없습니다. 즐겨찾는 지역을 추가하여 빠르게 확인하세요!
  </p>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';
import axios from 'axios';

const savedCities = ref([]);

const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));

    const requests = [];
    
    savedCities.value.forEach((city) => {
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
      savedCities.value[i].weather = weather.data;
    });
  }
}

await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: 'detailCity',
    params: {
      city: city?.name,
      state: city?.state,
    },
    query: {
      id: city?.id,
      lat: city?.coords.lat,
      lng: city?.coords.lng,
    }
  });
}

const removeCityCard = (cityId) => {
  
  let filteredCities = savedCities.value.filter((city) => {
    return city.id !== cityId;
  });

  localStorage.setItem('savedCities', JSON.stringify(filteredCities));

  savedCities.value = [...filteredCities];
}

</script>
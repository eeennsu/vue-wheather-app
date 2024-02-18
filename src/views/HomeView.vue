<template>
  <main class="flex flex-col items-center">
    <section class="relative w-full max-w-3xl px-4 mt-10">
      <input 
        class="w-full p-2 text-lg text-white bg-transparent border-b outline-none placeholder:text-white/65" 
        v-model="searchTerm"
        @input="getSearchResult"
        placeholder="Search for a city or country" 
        type="text"
      > 

      <ul class="absolute w-full rounded-sm text-white shadow-md bg-weather-tertiary top-[66px]">
        <p 
          v-if="searchError" 
          class="px-4 py-2.5 italic text-white/75"
        >
          Sorry, something went wrong...
        </p>

        <p 
          v-if="!searchError && searchResults?.length === 0"
          class="px-4 py-2.5 italic text-white/75"
        >
          No results match.
        </p>

        <template v-else>
          <li          
            v-for="result in searchResults" 
            :key="result.id && searchTerm.length === 0"
            @click="previewCity(result)"
            class="w-full px-4 py-2.5 border-b cursor-pointer border-b-white/70 hover:bg-weather-primary/55 last-of-type:border-b-0"
          >
            {{ result?.place_name }}
          </li>
        </template>
      </ul>
    </section> 

    <section class="flex flex-col w-full max-w-3xl gap-4 mt-20">
      <Suspense>
        <CityList />

        <template #fallback>
          <p>
            Loading...
          </p>
        </template>
      </Suspense>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityList from '../components/CityList.vue';
import axios from 'axios';

const router = useRouter();

const searchTerm = ref('');
const queryTimeout = ref(null);
const searchResults = ref(null);
const searchError = ref(null);

const MAP_BOX_API_KEY = 'pk.eyJ1IjoiZXVuc3UiLCJhIjoiY2xzcjRyZjBnMHdqdTJwcWo1cTFncjhnZCJ9.oRvdFqcukJkMholFx-tkzw';

const fetchCities = async () => {    
  try {
    if (searchTerm.value.length >= 1) {
      const options = {
        method: 'GET',
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm.value}.json`,
        params: {
          access_token: MAP_BOX_API_KEY
        }
      };

      const { data } = await axios.request(options);
      searchResults.value = data.features;
      console.log(searchResults.value);
      
    } else {
      searchResults.value = null;
    }
      
  } catch (error) {
    console.log(error);
    searchError.value = error;
  }
}

const getSearchResult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(fetchCities, 300);
}

const previewCity = (selectedCity) => {
  const [city, state] = selectedCity?.place_name.split(',') || ['', ''];
  const [lng, lat] = selectedCity?.geometry.coordinates || ['', ''];

  router.push({
    name: 'detailCity',
    params: {
      state: state.replaceAll(' ', ''),
      city
    },
    query: {
      lat,
      lng,
      preview: true
    }
  });
}
</script>
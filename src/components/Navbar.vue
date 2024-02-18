<template>
  <header class="sticky top-0 flex justify-center shadow-md bg-weather-tertiary">

    <nav class="flex flex-col items-center w-full max-w-3xl py-4 text-white sm:py-6 max-sm:gap-6 sm:flex-row sm:justify-between">
      <RouterLink :to="{ name: 'home' }">   
        <div class="flex items-center flex-1 gap-4">
          <font-awesome-icon :icon="['fas', 'sun']" class="text-3xl" />
          <h1 class="text-xl font-bold">
            Local Wheather
          </h1>
        </div>
      </RouterLink>
      
      <div class="flex items-center justify-end gap-5 felx-1">
        <font-awesome-icon :icon="['fas', 'circle-info']" class="text-2xl transition-transform cursor-pointer hover:scale-[1.2]" @click="handleModalOpen" />
        <font-awesome-icon :icon="['fas', 'plus']" class="text-2xl transition-transform cursor-pointer hover:scale-[1.2]" @click="addCity" v-if="route.query.preview"/>
      </div>
                                
      <Modal 
        :isModalOpen="isModalOpen" 
        @close-modal="handleCloseModal"
      >    
        <div class="text-black">
          <h1 class="mb-1 text-2xl font-semibold">About:</h1>
          <p>
            The Local Weather allows you to track the current and
            future weather of cities of your choosing.
          </p>
          <h2 class="mt-10 text-2xl font-semibold">How it works:</h2>
          <ol class="list-decimal list-inside">
            <li>
              Search for your city by entering the name into the
              search bar.
            </li>
            <li>
              Select a city within the results, this will take
              you to the current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the
              top right. This will save the city to view at a
              later time on the home page.
            </li>
          </ol>

          <h2 class="mt-10 text-2xl font-semibold">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select
            the city within the home page. At the bottom of the
            page, there will be am option to delete the city.
          </p>
        </div>               
      </Modal>
    </nav>     
    
  </header>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { uid } from 'uid';
import Modal from './Modal.vue';

const route = useRoute();
const router = useRouter();
let savedCities = reactive([]);

const isModalOpen = ref(false);
const handleModalOpen = () => {
  isModalOpen.value = !isModalOpen.value;
}

const handleCloseModal = () => {
  isModalOpen.value = false;
}

const addCity = () => {  
  if (localStorage.getItem('savedCities')) {
    savedCities = JSON.parse(localStorage.getItem('savedCities'))
  }

  const locationObj = {
    id: uid(),
    name: route.params.city,
    state: route.params.state,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng
    }
  }

  savedCities.unshift(locationObj);
  localStorage.setItem('savedCities', JSON.stringify(savedCities));

  let query = Object.assign({}, route.query);
  delete query.preview;
  
  router.replace({ query });
  alert('추가되었습니다');
;}
</script>
<template>
  <header class="sticky top-0 flex justify-center shadow-md bg-weather-primary">

    <nav class="flex flex-col items-center w-full max-w-3xl gap-4 py-6 text-white sm:flex-row sm:justify-between">
      <RouterLink :to="{ name: 'home' }">   
        <div class="flex items-center flex-1 gap-4">
          <font-awesome-icon :icon="['fas', 'sun']" class="text-3xl" />
          <h1 class="text-xl font-bold">
            Local Wheather
          </h1>
        </div>
      </RouterLink>
      
      <div class="flex items-center justify-end gap-3 felx-1">
        <font-awesome-icon :icon="['fas', 'circle-info']" class="text-2xl transition-colors cursor-pointer hover:text-weather-secondary" @click="handleModalOpen" />
        <font-awesome-icon :icon="['fas', 'plus']" class="text-2xl cursor-pointer hover:text-weather-secondary" @click="handleModalOpen"/>
      </div>
                                
      <Modal 
        :isModalOpen="isModalOpen" 
        @close-modal="handleCloseModal"
      >
        <h1>
          Hello From Modal!
        </h1>
      </Modal>
    </nav>     
    
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Modal from './Modal.vue';

const isModalOpen = ref(false);
const handleModalOpen = () => {
  isModalOpen.value = !isModalOpen.value;
}

const handleCloseModal = () => {
  isModalOpen.value = false;
}
</script>
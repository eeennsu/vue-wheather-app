<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';

</script>

<template>
  <div class="flex flex-col text-wheather-text min-h-dvh font-nanum-gothic bg-weather-primary">
    <Navbar />
    
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';

</script>

<template>
  <div class="flex flex-col text-wheather-text min-h-dvh font-nanum-gothic bg-weather-primary">
    <Navbar />
    
    <RouterView v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.page-enter-active {
  transition: 500ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>
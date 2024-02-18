<template>
  <div
    v-show="isModalOpen"
    class="absolute top-0 left-0 flex items-center justify-center w-full h-screen px-8 bg-black bg-opacity-50"
    @click="$emit('close-modal')"
  >
    <div 
      v-if="isModalOpen"
      class="relative z-50 self-start w-full max-w-screen-md px-6 py-12 mt-20 bg-white rounded-md drop-shadow-lg sm:mt-32"
    >
      <button 
        class="absolute w-8 h-8 text-white rounded-full top-3 right-3 bg-weather-primary hover:brightness-125" 
        @click="$emit('close-modal')"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
defineEmits(['close-modal']);

defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
    required: true,
  },
  content: {
    type: String,
    required: true
  }
});


</script>
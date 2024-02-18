<template>
  <Transition name="modal-outer">
    <div
      v-show="isModalOpen"
      class="absolute top-0 left-0 flex items-center justify-center w-full h-screen px-8 bg-black bg-opacity-50"
    >
      <Transition name="modal-inner">
        <div 
          v-if="isModalOpen"
          class="relative z-50 self-start w-full max-w-screen-md px-6 py-12 bg-white rounded-md mt-28 drop-shadow-lg sm:mt-40"
        >
          <button 
            class="absolute flex items-center justify-center w-10 h-10 text-white rounded-full top-5 right-5 bg-weather-primary hover:brightness-125" 
            @click="$emit('close-modal')"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" class="text-xl" />
          </button>
          <slot />
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
defineEmits(['close-modal']);

defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
    required: true,
  }
});

</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.15s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.15s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-inner-leave-to {
  transform: scale(0.9);
}
</style>
<template>
  <div>
    <Suspense>
      <DetailCity />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import DetailCity from '../components/DetailCity.vue';

</script>
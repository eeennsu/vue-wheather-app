<template>
  <div>
    <Suspense>
      <DetailCity />
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import DetailCity from '../components/DetailCity.vue';
import CityViewSkeleton from '../components/CityViewSkeleton.vue';
</script>
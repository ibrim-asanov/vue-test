<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

// Set the props type
type Props = {
  id: string;
  name: string;
  tour: string;
  hotspots?: number;
};

// Define the module props
defineProps<Props>();

// Set the route params
const route = useRoute();
const theKey = route.query.key ? route.query.key : "";
</script>

<template>
  <RouterLink :to="`${tour}/${id}?key=${theKey}`" class="floor-item-link">
    <div class="floor-item">
      <h2>{{ name }}</h2>
      <span v-if="hotspots">{{ hotspots }} Hotspots</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.floor-item {
  border: 1px solid var(--color-border);
  padding: 30px;
  border-radius: 8px;
}
.floor-item:hover {
  border: 1px solid var(--color-border-hover);
}
.floor-item-link {
  min-width: 300px;
}
</style>

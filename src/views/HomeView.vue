<script lang="ts" setup>
import { getLink } from "../services/getLink";

// Get the ENV variables
const tour = import.meta.env.VITE_APP_TOUR_ID;
</script>

<template>
  <div v-if="tour" class="home">
    <h1>Welcome to the Panorama Viewer</h1>
    <h2>Open to viewer to explore the tour</h2>
    <RouterLink :to="getLink('tour', '', '', '', tour)" class="home-tour">
      Open Viewer
    </RouterLink>
  </div>

  <div v-else class="home-no-content">
    <h1>Sorry, there is nothing found</h1>
    <h2>Try again later or contact us :)</h2>
  </div>
</template>

<style>
.home-tour {
  display: inline-flex;
  justify-content: center;
  min-width: 300px;
  font-size: 20px;
  font-weight: 600;
  padding: 14px 24px;
  margin: 50px 0;
  border: 1px solid;
  color: var(--color-dark);
  border-radius: 4px;
}
</style>

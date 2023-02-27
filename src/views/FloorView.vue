<script setup lang="ts">
// Importers
import { ref, watch, computed, defineAsyncComponent } from "vue";
import { useRoute, RouterView } from "vue-router";
import { useTourStore } from "../stores/tour";
import type { Tour } from "../types/Tours.interface";
import { apiTours } from "../services/apiLinks";

// Import the components async
const FloorHotspotsNav = defineAsyncComponent(
  () => import("../components/FloorHotspotsNav.vue")
);
const FloorPlan = defineAsyncComponent(
  () => import("../components/FloorPlan.vue")
);

// Set the route params
const route = useRoute();
const urlTour = ref<string | any>(route.params.tour);
const urlHotspot = ref<string | any>(route.params.hotspot);
const urlKey = ref<string | any>(route.query.key);

// Update the url variables
watch(
  () => route.fullPath,
  async () => {
    urlTour.value = route.params.tour ? route.params.tour : "";
    urlHotspot.value = route.params.hotspot ? route.params.hotspot : "";
    urlKey.value = route.query.key ? route.query.key : "";
  }
);

// Set the data
const tour = ref<Tour>();
const error = ref(null);
const store = useTourStore();

// Check first the store than fetch the data
if (store.tour) {
  // Reset the error
  error.value = null;

  // Check the store first
  tour.value = store.tour;
} else {
  fetch(apiTours(urlTour.value, urlKey.value))
    .then(async function (response: any) {
      // Set the data
      let data = await response.json();
      tour.value = data.data;

      // Update the store
      store.update(tour.value);
    })
    .catch((err) => ((error.value = err), console.log(err)));
}

// Check if the floor url matches the floors in the tour
const floorExists = computed(() => {
  let output = tour.value?.structure?.filter((item: string | any) => {
    return item?.id == route.params.floor;
  });

  return output && output.length ? true : false;
});
</script>

<template>
  <div v-if="error || !floorExists" class="error">
    <h3>Something went wrong. Please, try different floor or hotspot.</h3>
  </div>
  <div v-else-if="tour" class="floor-page">
    <template v-for="floor in tour?.structure" :key="floor.id">
      <div v-if="floor.id == route.params.floor" class="floor-content bg-light">
        <div class="floor-hotspots">
          <FloorHotspotsNav :hotspots="floor.hotspots" />
        </div>
        <div
          class="floor-plan"
          :class="urlHotspot ? 'display-hotspot' : 'display-floor'"
        >
          <template v-if="urlHotspot">
            <RouterView />
          </template>
          <template v-else>
            <FloorPlan :image="floor.floor_plan" :hotspots="floor.hotspots" />
          </template>
        </div>
      </div>
    </template>
  </div>
  <LoadingScreen v-else class="inner-loader" />
</template>

<style scoped>
.floor-content {
  width: 100%;
  max-width: 1700px;
  min-height: 90vh;
  margin: 0 auto;
  padding: 2vw;
  display: flex;
  flex-flow: row wrap;
  gap: 2vw;
}
.floor-plan {
  width: calc(80% - 2vw);
}
.floor-hotspots {
  width: 20%;
}
</style>

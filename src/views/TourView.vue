<script setup lang="ts">
import type { Tour } from "../types/Tours.interface";
import { ref, defineAsyncComponent } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
import { useTourStore } from "../stores/tour";
import { apiTours } from "../services/apiLinks";

// Import the component async
const Breadcrumbs = defineAsyncComponent(
  () => import("../components/BreadcrumbsNav.vue")
);
const TourItems = defineAsyncComponent(
  () => import("../components/TourItems.vue")
);

// Set the route params
const route = useRoute();
const urlTour = ref<string | any>(route.params.tour);
const urlKey = ref<string | any>(route.query.key);

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

// Count the hotspots
function countHotspots(hotspots: string | any[]) {
  const count: Ref<number | undefined> = ref();
  if (hotspots) {
    count.value = hotspots.length;
  }
  return count.value;
}
</script>

<template>
  <div v-if="error" class="error">
    <h3>Something went wrong. Please, try different tour.</h3>
  </div>
  <div v-else-if="tour" class="tour-page">
    <h1 v-if="tour?.name">{{ tour?.name }}</h1>
    <div v-if="tour?.description" v-html="tour.description"></div>
    <Breadcrumbs
      :tour_id="tour?.id ? tour.id : ''"
      :tour_name="tour?.name ? tour.name : ''"
      :data="tour?.structure ? tour.structure : []"
    />
    <div :if="tour.structure" class="tour-content">
      <div class="tour-items">
        <template v-for="floor in tour.structure" :key="floor.id">
          <TourItems
            :id="floor.id"
            :name="floor.name"
            :hotspots="countHotspots(floor.hotspots)"
            :tour="tour.id"
          ></TourItems>
        </template>
      </div>
      <RouterView />
    </div>
  </div>
  <LoadingScreen v-else class="full-loader" />
</template>

<style>
.tour-items {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 50px 0 15px;
}
</style>

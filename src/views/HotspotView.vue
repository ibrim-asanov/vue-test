<script setup lang="ts">
// Importers
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { PanoramaData } from "../types/Panorama.interface";
import { apiHotspots } from "../services/apiLinks";
import { getLink } from "../services/getLink";
import { usePanoramaStore } from "../stores/panorama";
import LoadingScreen from "../components/LoadingScreen.vue";

// Set the data
const panoramas = ref<PanoramaData>();
const error = ref(null);
const store = usePanoramaStore();

// Set the route params
const route = useRoute();
const urlTour = ref<string | any>(route.params.tour);
const urlFloor = ref<string | any>(route.params.floor);
const urlHotspot = ref<string | any>(route.params.hotspot);
const urlKey = ref<string | any>(route.query.key);

// Check first the store than fetch the data
function fetchHotspots() {
  // Reset the error
  error.value = null;

  // Check the store first
  if (store.panorama && store.panorama_id === urlHotspot.value) {
    panoramas.value = store.panorama;
  } else {
    fetch(apiHotspots(urlTour.value, urlHotspot.value, urlKey.value))
      .then(async function (response: any) {
        // Set the data
        let data = await response.json();
        panoramas.value = data;

        // Update the store
        store.update(panoramas.value, urlHotspot.value);
      })
      .catch((err) => ((error.value = err), console.log(err)));
  }
}

// Fetch data before loading
onMounted(() => {
  fetchHotspots();
});

// Update when the url changes
watch(
  () => route.fullPath,
  async () => {
    urlTour.value = route.params.tour ? route.params.tour : "";
    urlFloor.value = route.params.floor ? route.params.floor : "";
    urlHotspot.value = route.params.hotspot ? route.params.hotspot : "";
    if (urlHotspot.value) {
      fetchHotspots();
    }
  }
);

// Set the date convert function
function dateConvert(date: number | any) {
  let output = "";
  if (date) {
    let theDate = new Date(date);
    output = theDate.toLocaleString();
  }

  return output;
}
</script>

<template>
  <div v-if="error" class="error">
    <h3>Something went wrong. Please, try different floor or hotspot.</h3>
  </div>
  <div v-else-if="panoramas?.data && store.panorama_id === urlHotspot">
    <template v-if="panoramas && panoramas?.data.length == 0">
      <div class="error-nopano">
        <h2>There are no photos here.</h2>
        <h3>Please, select another hotspot from the floor plan.</h3>
      </div>
    </template>

    <template v-else>
      <div class="hotspot-items">
        <div
          v-for="(panorama, index) in panoramas?.data"
          :key="index"
          class="hotspot-pano-item"
        >
          <RouterLink
            :to="getLink('panorama', urlTour, urlFloor, urlHotspot, panorama.id)"
            class="hotspot-pano-link"
          >
            <div class="hotspot-item-overlay">
              <img
                class="hotspot-item-overlay-icon"
                width="40"
                height="40"
                src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMiAxOXYtMTRjMC0uNTUyLjQ0Ny0xIDEtMSAuNTQyIDAgNC40MTggMi4wMjggOSAyLjAyOCA0LjU5MyAwIDguNDU2LTIuMDI4IDktMi4wMjguNTUgMCAxIC40NDcgMSAxdjE0YzAgLjU1My0uNDUgMS0xIDEtLjU0NCAwLTQuNDA3LTIuMDI4LTktMi4wMjgtNC41ODIgMC04LjQ1OCAyLjAyOC05IDIuMDI4LS41NTMgMC0xLS40NDgtMS0xem0xLjUtLjc5MSA2LjQ0OS03LjY5MWMuMjg5LS4zNDQuODc5LS4zMzggMS4xNi4wMTIgMCAwIDEuOTU0IDIuNDM0IDEuOTU0IDIuNDM0bDEuNzA0LTEuMjgzYy4zMTktLjI0LjgxNi0uMTY4IDEuMDU0LjE1NGw0LjY3OSA2LjMzNXYtMTIuNDRjLTEuNTguNTgtNC44MTkgMS43OTgtOC41IDEuNzk4LTMuNjcyIDAtNi45MTgtMS4yMTgtOC41LTEuNzk5em0yLjY1Ny0uODM0YzEuNjIzLS40NzEgMy42NTctLjkwMyA1Ljg0My0uOTAzIDIuMzA5IDAgNC40NDQuNDc5IDYuMTA1Ljk4bC0zLjA0MS00LjExNy0xLjA2NS44MDIuMjc1LjM0NGMuMjU5LjMyMy4yMDYuNzk2LS4xMTcgMS4wNTQtLjMyMy4yNTktLjc5NS4yMDctMS4wNTQtLjExN2wtMi41OTEtMy4yMzZ6bS42OTgtOS41MzRjLTEuMDUxIDAtMS45MDUuODU0LTEuOTA1IDEuOTA1cy44NTQgMS45MDQgMS45MDUgMS45MDQgMS45MDQtLjg1MyAxLjkwNC0xLjkwNC0uODUzLTEuOTA1LTEuOTA0LTEuOTA1em0wIDEuM2MuMzMzIDAgLjYwNC4yNzEuNjA0LjYwNSAwIC4zMzMtLjI3MS42MDQtLjYwNC42MDQtLjMzNCAwLS42MDUtLjI3MS0uNjA1LS42MDQgMC0uMzM0LjI3MS0uNjA1LjYwNS0uNjA1eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"
              />
              <h5>{{ panorama.name }}</h5>
              <h6>{{ dateConvert(panorama.taken_on) }}</h6>
            </div>
            <img :src="panorama.assets.thumbnail" />
          </RouterLink>
        </div>
      </div>
      <RouterView />
    </template>
  </div>
  <LoadingScreen v-else class="inner-loader" />
</template>

<style scoped>
.error-nopano h2 {
  font-weight: 600;
}
.hotspot-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  z-index: 1;
}
.hotspot-pano-item {
  display: inline-flex;
  border-radius: 4px;
  overflow: hidden;
  background: #1c222a;
}
.hotspot-item-overlay {
  position: absolute;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: var(--color-white);
  z-index: 1;
}
.hotspot-item-overlay-icon {
  filter: invert(1);
}
.hotspot-item-overlay h5 {
  font-weight: 700;
}
.hotspot-item-overlay h6 {
  font-weight: 600;
  background: hsl(210deg 9% 24% / 58%);
  padding: 4px 8px;
  border-radius: 3px;
}
.hotspot-pano-link {
  display: flex;
}
.hotspot-pano-link:not(.router-link-active) img {
  opacity: 0.4;
}
</style>

<script setup lang="ts">
// Importers
import { ref, watch, defineAsyncComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { PanoramaData } from "../types/Panorama.interface";
import { apiHotspots } from "../services/apiLinks";
import { usePanoramaStore } from "../stores/panorama";

// Import the components async
const PanoViewer = defineAsyncComponent(
  () => import("../components/PanoViewer.vue")
);

// Set the data
const panoramas = ref<PanoramaData>();
const status = ref(null);
const store = usePanoramaStore();

// Set the route params
const route = useRoute();
const urlTour = ref<string | any>(route.params.tour);
const urlFloor = ref<string | any>(route.params.floor);
const urlHotspot = ref<string | any>(route.params.hotspot);
const urlPanorama = ref<string | any>(route.params.panorama);
const urlKey = ref<string | any>(route.query.key);

// Check first the store than fetch the data
async function fetchHotspots() {
  if (store.panorama && store.panorama_id === urlHotspot.value) {
    panoramas.value = store.panorama;
    console.log("Displaying from the Panorama store");
  } else {
    fetch(apiHotspots(urlTour.value, urlHotspot.value, urlKey.value)).then(
      async function (response: any) {
        if (response.status != 200) {
          // Update the status
          status.value = response.status;
        } else {
          // Set the data
          let data = await response.json();
          panoramas.value = data;

          // Update the store
          store.update(panoramas.value, urlHotspot.value);
        }
      }
    );
    console.log("Fetched from the Panorama API");
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
    urlPanorama.value = route.params.panorama ? route.params.panorama : "";
    if (urlHotspot.value) {
      fetchHotspots();
    }
  }
);

// Check if panorama ID from the URL match the data
function panoramaExits(data: string | any, id: string | any) {
  return data.some(function (element: string | any) {
    return element.id === id;
  });
}
</script>

<template>
  <div v-if="status">Oops! Error: {{ status }}</div>
  <div v-else-if="panoramas?.data.length" class="tour-page">
    <div v-if="panoramaExits(panoramas?.data, urlPanorama)">
      <template v-for="panorama in panoramas?.data" :key="panorama.id">
        <div v-if="panorama.id === urlPanorama" class="hotspot-panorama">
          <PanoViewer
            v-if="panorama.assets"
            :image="panorama.assets.standard"
          />
        </div>
      </template>
    </div>
    <div v-else class="error">
      <h3>Sorry, there is no panoramas found. Try different hotspot.</h3>
    </div>
  </div>
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

.hotspot-pano-item:not(.active) img {
  opacity: 0.4;
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
</style>

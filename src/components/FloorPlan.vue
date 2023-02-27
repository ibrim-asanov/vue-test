<script setup lang="ts">
import { ref, watch } from "vue";
import type { Hotspot } from "../types/Tours.interface";
import { RouterLink, useRoute } from "vue-router";
import { getLink } from "../services/getLink";

// Set the props type
type Props = {
  image: string;
  hotspots: Hotspot[];
};

// Define the module props
defineProps<Props>();

// Set the route params
const route = useRoute();
const urlTour = ref<string | any>(route.params.tour);
const urlFloor = ref<string | any>(route.params.floor);

// Update the url variables
watch(
  () => route.fullPath,
  async () => {
    urlTour.value = route.params.tour ? route.params.tour : "";
    urlFloor.value = route.params.floor ? route.params.floor : "";
  }
);
</script>

<template>
  <div class="floorplan-hotspots">
    <div
      v-for="hotspot in hotspots"
      :key="hotspot.id"
      :id="hotspot.id"
      class="floorplan-hotspot-item"
      :style="[
        hotspot.position.x ? 'left:' + hotspot.position.x + '%' : '',
        hotspot.position.y ? 'top:' + hotspot.position.y + '%' : '',
      ]"
    >
      <RouterLink
        :to="getLink('hotspot', urlTour, urlFloor, '', hotspot.id)"
        class="floorplan-hotspot-link"
      >
        <span class="floorplan-hotspot-dot bg-dark"></span>
        <span class="floorplan-hotspot-name">{{ hotspot.name }}</span>
      </RouterLink>
    </div>
  </div>
  <img v-if="image" :src="image" class="floorplan-image" />
</template>

<style>
.floorplan-image {
  width: 100%;
  max-width: 100%;
}
.floorplan-hotspots {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.floorplan-hotspot-item {
  position: absolute;
}
.floorplan-hotspot-link {
  display: flex;
}
.floorplan-hotspot-link:hover {
  background: none;
}
.floorplan-hotspot-dot {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  z-index: 1;
}
.floorplan-hotspot-dot:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  animation: pulse 2s infinite;
}
.floorplan-hotspot-name {
  position: absolute;
  left: 18px;
  top: 0;
  height: 32px;
  line-height: 30px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  text-align: left;
  white-space: nowrap;
  color: var(--color-white);
  background: var(--bg-dark);
  font-size: 14px;
  font-weight: 500;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}
.focused .floorplan-hotspot-name,
.floorplan-hotspot-link:hover .floorplan-hotspot-name {
  padding-left: 30px;
  padding-right: 15px;
  opacity: 1;
  visibility: visible;
}
.focused .floorplan-hotspot-dot,
.floorplan-hotspot-link:hover .floorplan-hotspot-dot {
  background: var(--bg-accent);
}
</style>

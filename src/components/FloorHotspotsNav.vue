<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import type { Hotspot } from "../types/Tours.interface";
import { getLink } from "../services/getLink";

// Set the props type
type Props = {
  hotspots: Hotspot[];
};

// Define the module props
defineProps<Props>();

// Set the route params
const route = useRoute();
const urlTour = ref<string | any>(route.params.tour);
const urlFloor = ref<string | any>(route.params.floor);
const urlHotspot = ref<string | any>(route.params.hotspot);

// Update the url variables
watch(
  () => route.fullPath,
  async () => {
    urlTour.value = route.params.tour ? route.params.tour : "";
    urlFloor.value = route.params.floor ? route.params.floor : "";
    urlHotspot.value = route.params.hotspot ? route.params.hotspot : "";
  }
);

// Focus the point on mouse enter
function focusPoint(point: string) {
  const hotspot = document.getElementById(point);
  hotspot?.classList.add("focused");
}

// Unfocus the point on mouse leave
function unFocusPoint(point: string) {
  const hotspot = document.getElementById(point);
  hotspot?.classList.remove("focused");
}
</script>

<template>
  <h3 class="hotspots-nav-title">Pick Hotspot</h3>
  <ul class="hotspots-nav">
    <li
      v-for="hotspot in hotspots"
      :key="hotspot.id"
      @mouseover="($event) => focusPoint(hotspot.id)"
      @mouseleave="($event) => unFocusPoint(hotspot.id)"
      class="hotspots-nav-item"
    >
      <RouterLink
        :to="getLink('hotspot', urlTour, urlFloor, '', hotspot.id)"
        class="hotspots-nav-link"
      >
        {{ hotspot.name }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
ul.hotspots-nav {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 10px;
  padding: 0;
  margin: 30px 0;
  list-style: none;
}
.hotspots-nav-item {
  width: 100%;
}
.hotspots-nav-link {
  padding: 10px 14px;
  border-radius: 4px;
  display: block;
  text-align: left;
  font-weight: 600;
  color: var(--color-dark);
  background: var(--bg-light);
}
.hotspots-nav-link:hover,
.hotspots-nav-link.router-link-active {
  color: var(--color-white);
  background: var(--bg-dark);
}
.hotspots-nav-title {
  font-size: 18px;
  font-weight: 600;
  text-align: left;
}
.hotspots-nav-title:after {
  content: "";
  position: absolute;
  top: calc(100% + 9px);
  left: 0;
  width: 40px;
  height: 1px;
  background: var(--color-accent);
}
.hotspots-nav-link:after {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='15' height='15' stroke='%233d5063' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
  position: absolute;
  right: 10px;
  top: calc(50% - 8px);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  border-radius: 100%;
  background: var(--bg-light);
}

.hotspots-nav-link:hover:after,
.hotspots-nav-link.router-link-active:after {
  background: var(--bg-accent);
}
</style>

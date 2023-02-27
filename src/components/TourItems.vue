<script setup lang="ts">
import { RouterLink } from "vue-router";
import { getLink } from "../services/getLink";

// Set the props type
type Props = {
  id: string;
  name: string;
  tour: string;
  hotspots?: number;
};

// Define the module props
defineProps<Props>();
</script>

<template>
  <RouterLink
    :to="getLink('floor', tour, '', '', id)"
    class="tour-item-link color-dark"
  >
    <div class="tour-item">
      <h2 v-if="name">{{ name }}</h2>
      <span v-if="hotspots" class="bg-accent color-white">{{ hotspots }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.tour-item-link {
  flex: 1;
  max-width: 300px;
  border: 1px solid;
  padding: 14px 24px;
  border-radius: 4px;
}
.tour-item {
  position: relative;
}
.tour-item h2 {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 0px;
  white-space: nowrap;
  transition: 0.4s ease;
}
.tour-item span {
  font-size: 13px;
  position: absolute;
  top: calc(50% - 13px);
  right: 0;
  width: 26px;
  height: 26px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulse 2s infinite;
}
.tour-item-link:after {
  content: "";
  position: absolute;
  left: -1px;
  top: calc(100% + 1px);
  background: var(--bg-light);
  height: 0px;
  width: calc(100% + 2px);
  transition: height 0.2s ease;
  transition-delay: 0.2s;
}
.tour-item-link.router-link-active {
  background: var(--bg-light);
  border-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.tour-item-link.router-link-active:after {
  height: 15px;
}
.tour-item-link.router-link-active h2 {
  color: var(--color-dark);
  width: 100%;
}
.tour-item-link.router-link-active span {
  display: none;
}
</style>

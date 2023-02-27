<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import type { Floor } from "../types/Tours.interface";
import { getLink } from "../services/getLink";

// Set the props type
type Props = {
  tour_id: string;
  tour_name: string;
  data: Floor[];
};

// Define the module props
const props = defineProps<Props>();
const route = useRoute();

// Set the floor based on the data
const the_floor = computed<Floor[]>(() => {
  return props.data?.filter((item: string | any) => {
    return item?.id == route.params.floor;
  });
});
</script>

<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs-list">
      <li class="breadcrumbs-home">
        <RouterLink to="/">
          <img src="../assets/home.svg" width="15" />
        </RouterLink>
      </li>
      <li v-if="tour_id && tour_name">
        <RouterLink :to="getLink('tour', '', '', '', tour_id)">
          {{ tour_name }}
        </RouterLink>
      </li>

      <template v-if="the_floor.length">
        <li>
          <RouterLink :to="getLink('floor', tour_id, '', '', the_floor[0].id)">
            {{ the_floor[0].name }}
          </RouterLink>
        </li>

        <template v-for="hotspot in the_floor[0].hotspots" :key="hotspot.id">
          <li v-if="hotspot.id === route.params.hotspot">
            <RouterLink
              :to="getLink('hotspot', tour_id, the_floor[0].id, '', hotspot.id)"
            >
              {{ hotspot.name }}
            </RouterLink>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<style>
.breadcrumbs {
  margin: 40px 0;
}
.breadcrumbs-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--bg-light);
  border-radius: 3px;
  display: inline-flex;
  overflow: hidden;
}
.breadcrumbs-list li a {
  display: inline-flex;
  align-items: center;
  position: relative;
  min-height: 38px;
  padding: 0px 16px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  color: #848a90;
  background: var(--bg-white);
  transition: background 0.3s ease;
}
.breadcrumbs-list li:not(:last-child):not(:first-child) a {
  padding-left: 25px;
}
.breadcrumbs-list li:not(:last-child) a,
.breadcrumbs-list li:not(:last-child) a:after,
.breadcrumbs-list li a:hover:after,
.breadcrumbs-list li a:hover {
  background: hsl(210deg 71% 98%);
}
.breadcrumbs-list li a:after,
.breadcrumbs-list li a:before {
  content: "";
  position: absolute;
  left: 100%;
  top: 0;
  bottom: 0;
  width: 1em;
  background: var(--bg-white);
  clip-path: polygon(50% 50%, -50% -50%, 0 100%);
  transition: all 0.2s linear;
  z-index: 1;
}
.breadcrumbs-list li a:before {
  background: var(--bg-light);
  margin-left: 1px;
}
.breadcrumbs-list li a:last-child {
  border-right: none;
}
.breadcrumbs-list li a.is-active {
  background: #edf1f5;
}
.breadcrumbs-home img {
  opacity: 0.5;
}
</style>

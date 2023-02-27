<script setup lang="ts">
import { ref, onUpdated, onMounted } from "vue";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.scss";

// Set the props type
type Props = {
  image?: string;
};

// Define the module props
const props = defineProps<Props>();
const viewer = ref();

onMounted(() => {
  if (props.image) {
    viewer.value = new Viewer({
      container: "viewer",
      panorama: props.image,
      navbar: true,
      defaultZoomLvl: 0,
      maxFov: 100,
    });
  }
});

// Set the viewer
onUpdated(() => {
  if (props.image) {
    viewer.value.setPanorama(props.image);
  }
});
</script>

<template>
  <div id="viewer" style="width: 100%; height: 60vh"></div>
</template>

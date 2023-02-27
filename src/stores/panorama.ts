import { ref } from "vue";
import { defineStore } from "pinia";
import type { PanoramaData } from "../types/Panorama.interface";

export const usePanoramaStore = defineStore("panorama", () => {
  // Set the data
  const panorama_id = ref<string>();
  const panorama = ref<PanoramaData>();

  // Update the data with fetched one
  async function update(data: any, id: string | any) {
    panorama_id.value = await id;
    panorama.value = await data;
  }

  // Export the data
  return { panorama, panorama_id, update };
});

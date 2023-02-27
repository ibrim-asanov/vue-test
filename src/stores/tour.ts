import { ref } from "vue";
import { defineStore } from "pinia";
import type { Tour } from "../types/Tours.interface";

export const useTourStore = defineStore("tour", () => {
  // Set the data
  const tour = ref<Tour>();

  // Update the data with fetched one
  async function update(data: any) {
    tour.value = await data;
  }

  // Export the data
  return { tour, update };
});

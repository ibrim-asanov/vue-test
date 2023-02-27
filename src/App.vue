<script setup lang="ts">
import { RouterView } from "vue-router";
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <main id="app-main">
    <AppHeader />
    <div id="app-content">
      <RouterView />
    </div>
    <AppFooter />
  </main>
</template>

<style>
#app-content {
  width: 100%;
  text-align: center;
}
</style>

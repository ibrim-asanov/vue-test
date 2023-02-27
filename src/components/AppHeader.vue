<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<template>
  <header id="app-header">
    <RouterLink to="/">
      <img
        alt="Project logo"
        class="logo"
        src="../assets/logo.svg"
        width="50"
        height="50"
      />
    </RouterLink>
  </header>
</template>

<style>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>

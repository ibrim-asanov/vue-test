<script setup lang="ts">
// Get the current year
const date = new Date();
const year = date.getFullYear();
</script>

<template>
  <footer id="app-footer">
    <div class="footer-wrap">
      <p>Panorama Viewer - All Rights Reserved ©{{ year }}</p>
    </div>
  </footer>
</template>

<style>
#app-footer {
  position: relative;
  margin-top: auto;
  width: 100%;
}
.footer-wrap {
  margin-top: 60px;
  padding: 15px;
  color: var(--color-white);
  background: var(--bg-dark);
  text-align: center;
}
.footer-wrap p {
  font-size: 13px;
  font-weight: 500;
}
</style>

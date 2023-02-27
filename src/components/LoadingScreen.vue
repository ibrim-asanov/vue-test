<template>
  <div class="loader">
    <div class="loader-icon">
      <svg viewBox="0 0 1024 1024" width="70" height="70">
        <path
          fill="ffffff"
          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
        />
      </svg>
    </div>
  </div>
</template>

<style>
.loader-icon {
  animation: rotation 0.6s infinite linear;
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  min-height: 500px;
  height: 100%;
  width: 100%;
  z-index: 9;
}
.loader.full-loader {
  position: fixed;
  background: var(--bg-white);
}
.loader.inner-loader {
  position: absolute;
  height: auto;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

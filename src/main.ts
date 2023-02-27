import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import LoadingScreen from "./components/LoadingScreen.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("LoadingScreen", LoadingScreen);

app.mount("#app");

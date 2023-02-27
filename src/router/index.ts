import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:tour",
      name: "tour",
      component: () => import("../views/TourView.vue"),
      children: [
        {
          path: ":floor",
          name: "floor",
          component: () => import("../views/FloorView.vue"),
          children: [
            {
              path: ":hotspot",
              name: "hotspot",
              component: () => import("../views/HotspotView.vue"),
              children: [
                {
                  path: ":panorama",
                  name: "panorama",
                  component: () => import("../views/PanoramaView.vue"),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;

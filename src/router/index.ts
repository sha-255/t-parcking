import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import HomePage from "@/views/HomePage.vue";
import AddUserInOffice from "@/views/AddUserInOffice.vue";
import Office from "@/views/Office.vue";
import ParkingSpace from "@/views/ParkingSpace.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/add-user-in-office",
    name: "AddUserInOffice",
    component: AddUserInOffice,
  },
  {
    path: "/office",
    name: "Office",
    component: Office,
  },
  {
    path: "/parking-space",
    name: "ParkingSpace",
    component: ParkingSpace,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
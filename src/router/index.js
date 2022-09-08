/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("../views/PaymentView.vue")
  },
  {
    path: "/finish/:id",
    name: "finish",
    component: () => import("../views/FinishView.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

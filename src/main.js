/* eslint-disable prettier/prettier */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/grid.css";
import "@/assets/css/styles.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");

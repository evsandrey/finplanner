import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import users from "./store/modules/users";
import { API, setJWT, setCSRF } from "./utils/api";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

const token = localStorage.getItem("token");
const csrf = localStorage.getItem("csrf");

if (csrf) {
  setCSRF(csrf);
}

if (token) {
  setJWT(token);
  users.updateProfile();
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

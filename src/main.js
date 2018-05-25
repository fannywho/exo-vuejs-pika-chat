import Vue from "vue";
import router from "./router";
import App from "./components/App/App.vue";

import { firebaseApp } from "../firebase.config";
import store from './store/store';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;

firebaseApp;

let app;

firebaseApp.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      router,
      store,
    }).$mount("#app");
  }
});

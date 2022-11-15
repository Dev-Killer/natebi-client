import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/routes";
import store from "./store";
import vuetify from "./plugins/vuetify";
import swal from "./plugins/swal";
import moment from "./plugins/moment";
import { initializeApp } from "firebase/app";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DB_URL,
  projectId: process.env.VUE_APP_NAME,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MAIL_RID,
  appId: process.env.VUE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

Vue.prototype.$guardTLD = async (to, from, next) => {
  let host = window.location.hostname;
  if (host[host.length - 1] === ".") {
    window.location.host = host.slice(0, -1);
  }
  next();
};

new Vue({
  router,
  store,
  vuetify,
  swal,
  moment,
  render: (h) => h(App),
}).$mount("#app");

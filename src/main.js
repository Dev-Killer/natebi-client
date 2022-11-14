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
  apiKey: "AIzaSyC_7zU_Q_kbrYB-HKAhtlR6SDErsBHRgFo",
  authDomain: "nate-bi.firebaseapp.com",
  databaseURL: "https://nate-bi-default-rtdb.firebaseio.com",
  projectId: "nate-bi",
  storageBucket: "nate-bi.appspot.com",
  messagingSenderId: "355884350132",
  appId: "1:355884350132:web:830ad61aa3b9d6d258f5e1",
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

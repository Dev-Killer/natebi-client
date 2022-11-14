import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

const options = {
  //confirmButtonColor: '#b71c1c',
  //cancelButtonColor: '#424242',
};

Vue.use(VueSweetalert2, options);

export default new VueSweetalert2();

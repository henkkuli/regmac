import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
//import 'vue-material/dist/theme/default-dark.css' // This line here

import router from "./router";
import "./foo.scss";

Vue.use(VueMaterial)

let v = new Vue({
    el: "#app",
    router
});

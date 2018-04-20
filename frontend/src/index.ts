import Vue from "vue";
import VueRouter from "vue-router";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import Components from "./Components/Components";

Vue.use(VueRouter)
Vue.use(VueMaterial)

let router = new VueRouter({
    routes: [
        {path: '/', component: Components.CHome}
    ]
})

let v = new Vue({
    el: "#app",
    router
});

import Vue from "vue";
import VueRouter from "vue-router";

import Components from "./Components/Components";

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {path: '/', component: Components.cHome}
    ]
})

let v = new Vue({
    el: "#app",
    router
});

import Vue from "vue";
import VueRouter from "vue-router";
import Components from "./Components/Components";

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {path: '/', component: Components.CHome},
        {path: '/form/:id', component: Components.CForm}
    ]
})

export default router;
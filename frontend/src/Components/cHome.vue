<template>
<div>
    <h1>Hello!</h1>
    <div id="events">
        <ul v-if="ready">
            <li v-for="form in forms">
                <a href="/events/{{form.uuid}">{{form.title}}</a>
            </li>
        </ul>
    </div>
</div>
</template>

<script lang="ts">
import "whatwg-fetch";
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            forms: Array<{uuid: string, title: string}>(),
            ready: true
        }
    },
    mounted() {
        //fetch('/getForms')
        //.then((response) => {
        //    this.forms = response.json()
        //    this.ready = true
        //})
        setTimeout(() => {
            this.forms = [
                {uuid: '123', title: 'QQ'},
                {uuid: '343', title: 'KK'}
            ]
        }, 1000);
    }
})
</script>

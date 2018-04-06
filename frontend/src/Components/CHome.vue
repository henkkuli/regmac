<template>
<div>
    <h1>Hello!</h1>
    <div v-if="ready" id="events">
        <CEventCard v-for="form in forms"
                   v-bind:key="form.uuid"
                   v-bind:uuid="form.uuid"
                   v-bind:title="form.title"
                   v-bind:description="form.description"
        />
    </div>
</div>
</template>

<script lang="ts">
import "whatwg-fetch";
import Vue from "vue";
import CEventCard from './CEventCard';

export default Vue.extend({
    components: {
        'CEventCard': CEventCard
    },
    data() {
        return {
            forms: Array<{uuid: string, title: string, description: string}>(),
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
                {uuid: '123', title: 'QQ', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
                {uuid: '343', title: 'KK', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
            ]
        }, 1000);
    }
})
</script>

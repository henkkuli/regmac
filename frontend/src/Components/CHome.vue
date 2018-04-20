<template>
<div>
    <div v-if="ready" id="events" class="md-layout md-gutter md-alignment-top-left">
        <CEventCard v-for="form in forms"
                   v-bind:key="form.id"
                   v-bind:id="form.id"
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
            forms: Array<{id: string, title: string, description: string}>(),
            ready: true
        }
    },
    async mounted() {
        let resp = await fetch('/api/allForms')
        let json = await resp.json()

        for(let form of json) {
            this.forms.push({
                id: form.id,
                description: form.id,
                title: form.name
            })
        }
        console.log(this.forms[0].id)

        let titles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
        for(let num of titles) {
            this.forms.push({
                id: "u" + num,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                title: "Florencan event " + num
            })
        }

    }
})
</script>

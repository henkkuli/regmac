<template>
    <md-card md-with-hover @click.native="goto" class="md-layout-item md-size-25 md-xsmall-size-100">
        <md-card-header>
            {{title}}
        </md-card-header>

        <md-card-content>
            {{short_description}}
        </md-card-content>
    </md-card>
</template>

<style lang="css" scoped>
    md-card {
        margin-bottom: 9px;
    }
</style>

<script lang="ts">
import Vue from "vue";
import router from "../router";

export default Vue.extend({
    props: ["title", "description", "id"],
    data() {
        return {}
    },
    computed: {
        short_description() {
            if(this.description.length > 50){
                return this.description.substring(0, 47) + '...'
            }else {
                return this.description
            }},
    },
    methods: {
        goto(ev) {
            router.push("/form/" + this.id)
            return false
        }
    }
})

</script>

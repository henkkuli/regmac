<template>
    <md-card md-with-hover class="md-layout-item md-size-25 md-xsmall-size-100">
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

export default Vue.extend({
    props: ["title", "description", "uuid"],
    data() {
        return {
            title: this.title
        }
    },
    computed: {
        short_description() {
            if(this.description.length > 50){
                return this.description.substring(0, 47) + '...'
            }else {
                return this.description
            }},
        url() { return '/events/' + this.uuid }
    }
})

</script>

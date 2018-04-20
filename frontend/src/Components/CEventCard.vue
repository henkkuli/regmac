<template>
<div class="md-layout-item md-gutter">
    <md-card>
        <md-card-header>
            {{title}}
        </md-card-header>

        <md-card-content>
            {{description}}
        </md-card-content>
    </md-card>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ["title", "descriptiom", "uuid"],
    data() {
        return {
            title: this.title,
            descriptiom: this.descriptiom,
            url: '/events/' + this.uuid
        }
    }
})

</script>

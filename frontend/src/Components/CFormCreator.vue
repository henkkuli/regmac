<template>
  <div>
    <form novalidate class="md-layout md-gutter">
        <md-field>
            <label for="name">Nimi</label>
            <md-input name="name" id="name" required />
        </md-field>
        <md-field>
            <label for="description">Kuvaus</label>
            <md-textarea name="description" id="description" required />
        </md-field>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

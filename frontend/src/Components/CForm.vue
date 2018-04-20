<template>
  <div>
    <ul>
      <li>{{ id }}</li>
      <li>{{ name }}</li>
      <li>{{ description }}</li>
      <li>Fields:
          <ul>
              <li v-for="field in fields" :key="field.id">
                  {{ field.id }} - {{ field.name }}
              </li>
          </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import "whatwg-fetch"

export default Vue.extend({
    data() {
        return {
            id: this.$route.params.id,
            description: "",
            name: "",
            restrictions: "",
            fields: Array<{name: string, id: string, restrictions: string}>()
        }
    },
    async mounted() {
        let resp = await fetch('/api/form/' + this.id)
        let json = await resp.json()

        this.description = json.description
        this.name = json.name
        this.fields = json.fields
    }
})
</script>

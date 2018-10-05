<template>
  <li>
    <a :href=link>{{ name }}</a>
  </li>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Ilmo extends Vue {
  public functional = true;
  @Prop(String) private name!: string;
  @Prop(String) private link!: string;
}
</script>

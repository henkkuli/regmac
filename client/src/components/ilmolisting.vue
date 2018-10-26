<template>
  <ul>
    <li v-for="ilmo in filteredIlmos" :key="ilmo.name">
      <a :href="ilmo.link">{{ ilmo.name }}</a>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import IIlmo from '@/interfaces/IIlmo';

@Component
export default class IlmoListing extends Vue {
  @Prop(Function) private filter!: (ilmo: IIlmo) => boolean;
  @Getter private ilmos!: IIlmo[];

  get filteredIlmos(): IIlmo[] {
    if (!this.ilmos) {
      return [];
    }
    return this.ilmos.filter(this.filter);
  }

}
</script>

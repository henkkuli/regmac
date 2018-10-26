<template>
  <div>
    <span>{{ ilmo.name }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import IIlmo from '@/interfaces/IIlmo';

@Component
export default class  extends Vue {
  @Getter private ilmos!: IIlmo[];

  get ilmo(): IIlmo | undefined {
    return this.ilmos.find((ilmo) => ilmo.link === this.$route.params.id);
  }
}
</script>

<template>
  <div class="home">
    <IlmoListing :filter="filterOpenOrUpcoming" />
    <IlmoListing :filter="filterClosed" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import IlmoListing from '@/components/home/ilmolisting.vue';
import IIlmo from '@/interfaces/IIlmo';

@Component({
  components: {
    IlmoListing,
  },
})
export default class Home extends Vue {
  @Action private fetchIlmos!: () => void;

  private mounted() {
    this.fetchIlmos();
  }

  private filterOpenOrUpcoming = (ilmo: IIlmo) => (
    ilmo.isOpen || (!ilmo.isOpen && !ilmo.isClosed)
  )

  private filterClosed = (ilmo: IIlmo) => ilmo.isClosed;
}
</script>

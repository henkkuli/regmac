<template>
  <div>
    <IlmoListing :filter="filterOpenOrUpcoming" />
    <IlmoListing :filter="filterClosed" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IlmoListing from '@/components/ilmolisting.vue';
import IIlmo from '@/interfaces/IIlmo';

@Component({
  components: {
    IlmoListing,
  },
})
export default class Home extends Vue {
  private filterOpenOrUpcoming = (ilmo: IIlmo) => (
    ilmo.isOpen || (!ilmo.isOpen && !ilmo.isClosed)
  )

  private filterClosed = (ilmo: IIlmo) => ilmo.isClosed;
}
</script>

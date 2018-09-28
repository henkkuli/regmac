import Vue from 'vue';
import Vuex from 'vuex';
import IlmoModule from '@/stores/ilmo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ilmo: IlmoModule,
  },
});

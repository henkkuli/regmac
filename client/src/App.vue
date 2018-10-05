<template>
  <b-container id="app" fluid>
    <b-navbar>
      <b-navbar-brand><h1>Fyysikkokilta</h1></b-navbar-brand>
      <b-navbar-nav>
        <router-link to="/home">Home</router-link>
        <router-link to="/login">Login</router-link>
      </b-navbar-nav>
    </b-navbar>
    <b-col offset-md="3" md="6">
      <router-view />
    </b-col>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class App extends Vue {
  @Action private fetchIlmos!: () => void;

  public mounted() {
    this.fetchIlmos();
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  margin: 1em;
}
a {
  margin: 1em;
}
</style>

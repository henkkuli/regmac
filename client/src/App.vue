<template>
  <b-container id="app" fluid>
    <b-navbar>
      <b-navbar-brand><h1>Fyysikkokilta</h1></b-navbar-brand>

      <b-navbar-nav ml="auto" />

      <div v-if="!username">
        <b-link to="/">Home</b-link>
        <b-link to="/login">Login</b-link>
      </div>
      <div v-if="!!username">
        <span>Hello, {{ username }}!</span>
      </div>
    </b-navbar>
    <b-col offset-md="3" md="6">
      <router-view />
    </b-col>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class App extends Vue {
  @Action private fetchIlmos!: () => void;
  @Action private me!: () => void;
  @Getter private username!: string | undefined;

  public mounted() {
    this.fetchIlmos();
    this.me();
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

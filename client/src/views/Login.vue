<template>
  <b-form @submit="submit">
    <b-form-group label="Username" label-for="username">
      <b-form-input id="username" type="text" v-model="form.username" />
    </b-form-group>
    <b-form-group label="Password" label-for="password">
      <b-form-input id="password" type="password" v-model="form.password" />
    </b-form-group>
    <b-button :disabled="cannotSubmit" type="submit">Register</b-button>
  </b-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class Login extends Vue {
  @Action private login!: (args: { username: string, password: string }) => void;
  private form = {
    username: '',
    password: '',
  };

  private submit(ev: Event) {
    ev.preventDefault();

    if (this.cannotSubmit) {
      return;
    }
    this.login(this.form);
  }

  get cannotSubmit() {
    return !this.form.password.length || !this.form.username.length;
  }
}
</script>

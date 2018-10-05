<template>
  <b-form @submit="submit">
    <b-form-group label="Username" label-for="username">
      <b-form-input id="username" type="text" v-model="form.username" />
    </b-form-group>
    <b-form-group label="Password" label-for="password">
      <b-form-input id="password" type="password" v-model="form.password" />
    </b-form-group>
    <b-form-group label="Password again" label-for="password-confirm">
      <b-form-input
        id="password-confirm"
        type="password"
        v-model="form.passwordConfirmation"
      />
    </b-form-group>
    <b-button type="submit">Register</b-button>
  </b-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';

@Component
export default class Register extends Vue {
  @Action private register!:
    (args: { username: string, password: string}) => void;
  private form = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  private submit(ev: Event) {
    ev.preventDefault();

    const { username, password, passwordConfirmation } = this.form;
    if (!username.length) {
      alert('Empty usernames not allowed.');
      return;
    }
    if (!password.length) {
      alert('Empty passwords not allowed.');
      return;
    }
    if (password !== passwordConfirmation) {
      alert('Passwords don\'t match.');
      return;
    }
    this.register({ username, password });
  }
}
</script>

import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import IIlmo from '@/interfaces/IIlmo';

@Module
export default class DefaultModule extends VuexModule {
  public all: IIlmo[] = [];

  get ilmos() {
    return this.all;
  }

  @Mutation public setIlmos(ilmos: IIlmo[]) { this.all = ilmos; }

  @Action
  public async fetchIlmos() {
    setTimeout(() => [
      this.commit('setIlmos',
        [{ name: 'testi', link: 'asd', isOpen: true, isClosed: false }]),
    ], 1000);
  }
}

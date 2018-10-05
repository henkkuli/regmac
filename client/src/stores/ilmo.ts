import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import IIlmo from '@/interfaces/IIlmo';
import { register, login } from '@/api/user';

@Module
export default class DefaultModule extends VuexModule {
  private all: IIlmo[] = [];
  private mloading: boolean = false;

  get ilmos() {
    return this.all;
  }

  get loading() {
    return this.mloading;
  }

  @Mutation public SET_ILMOS(ilmos: IIlmo[]) { this.all = ilmos; }
  @Mutation public SET_LOADING(loading: boolean) { this.mloading = loading; }

  @Action
  public async fetchIlmos() {
    setTimeout(() =>
      this.commit('SET_ILMOS',
        [{ name: 'testi', link: 'asd', isOpen: true, isClosed: false }]),
    1000);
  }

  @Action
  public async login(args: { username: string, password: string}) {
    this.commit('SET_LOADING', true);
    await login(args.username, args.password);
    this.commit('SET_LOADING', false);
  }

  @Action
  public async register(args: { username: string, password: string }) {
    this.commit('SET_LOADING', true);
    await register(args.username, args.password);
    this.commit('SET_LOADING', false);
  }
}

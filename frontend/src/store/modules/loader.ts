import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "..";

@Module({
  namespaced: true,
  name: "loader",
  store,
  dynamic: true
})
export class LoaderModule extends VuexModule {
  threads: number = 0;

  get isLoading() {
    return this.threads > 0 ? true : false;
  }

  @Mutation
  startThread() {
    this.threads += 1;
  }

  @Mutation
  endThread() {
    this.threads -= 1;
  }
}

export default getModule(LoaderModule);

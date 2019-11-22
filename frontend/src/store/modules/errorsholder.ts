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
    name: "errorsholder",
    store,
    dynamic: true
  })
  export class ErrorsHolder extends VuexModule {
    errors: string[] = []
  
    get errorsList() {
      return this.errors; 
    }
  
    @Mutation
    putError(error: string ) {
      console.log("start putting error")
      this.errors.unshift(error);
      setTimeout(() => {
        console.log("timeout passed")
        this.errors.pop();
      }, 4 * 1000);
    }
    
    @Action({ commit: "putError" })
    showError(error: string) {
        return error
    }
 }
  
 export default getModule(ErrorsHolder);
  
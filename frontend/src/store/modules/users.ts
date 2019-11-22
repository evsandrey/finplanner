import {
  VuexModule,
  Module,
  getModule,
  MutationAction,
  Mutation,
  Action
} from "vuex-module-decorators";
import store from "..";
import {
  loginUser,
  registerUser,
  updateUser,
  setJWT,
  clearJWT,
  setCSRF
} from "@/utils/api";
import { UserProfile, UserLoginRq, UserRegisterRq, UserRs } from "./user";

@Module({
  namespaced: true,
  name: "users",
  store,
  dynamic: true
})
export class UserModule extends VuexModule {
  profile: UserProfile | null = null;
  token: string | null = localStorage.getItem("token") || null;
  csrf: string | null = localStorage.getItem("csrf") || null; 

  get isTokenized() {
    return this.token;
  }

  get isAuthenticated() {
    return this.token ? true : false;
  }

  get isAdmin() {
    if (this.profile != null && this.profile.role === "admin") {
      return true;
    } else {
      return false;
    }
  }

  get username() {
    return (this.profile && this.profile.username) || undefined;
  }
  
  get userId() {
    return (this.profile && this.profile.id) || undefined;
  }

  get profileData() {
    return this.profile;
  }

  get getToken() {
    return this.token;
  }

  @Mutation
  setProfile(userProfile: UserProfile) {
    this.profile = userProfile;
  }

  @Mutation
  setAuth(userRs: UserRs) {
    console.log("setAuth", userRs);
    this.profile = userRs.user;
    this.token = userRs.jwt;
    this.csrf = userRs.csrf;
    setJWT(userRs.jwt);
    setCSRF(userRs.csrf)
    localStorage.setItem("token", userRs.jwt);
    localStorage.setItem("csrf", userRs.csrf);
  }

  @Mutation
  dropAuth() {
    this.profile = null;
    this.token = null;
    this.csrf = null;
  }

  @Action({ commit: "setAuth" })
  async register(registerRq: UserRegisterRq) {
    const userRs: UserRs | null = await registerUser(registerRq);
    return userRs;
  }

  @Action({ commit: "setAuth" })
  async login(loginRq: UserLoginRq) {
    const userRs: UserRs | null = await loginUser(loginRq);
    return userRs;
  }

  @Action({ commit: "dropAuth" })
  logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    clearJWT();
  }

  @Action({ commit: "setProfile" })
  async updateProfile() {
    const UserProfileRs: UserProfile | null = await updateUser();
    return UserProfileRs;
  }

  @Action({ commit: "setProfile" })
  async checkAuth(token: string) {
    setJWT(token);
    this.updateProfile();
  }
}

export default getModule(UserModule);

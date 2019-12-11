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
import { UserProfileRs, UserLoginRq, UserRegisterRq, UserRs } from "./user";

@Module({
  namespaced: true,
  name: "users",
  store,
  dynamic: true
})
export class UserModule extends VuexModule {
  profile: UserProfileRs | undefined = undefined;
  token: string | undefined = localStorage.getItem("token") || undefined;
  csrf: string | undefined = localStorage.getItem("csrf") || undefined;

  get isTokenized() {
    return this.token;
  }

  get isAuthenticated() {
    return this.token && this.profile ? true : false;
  }

  get isAdmin() {
    if (this.profile != undefined && this.profile.role === "admin") {
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

  get avatar() {
    return (this.profile && this.profile.avatar_url) || undefined;
  }

  get profileData() {
    return this.profile;
  }

  get getToken() {
    return this.token;
  }

  @Mutation
  setProfile(userProfile: UserProfileRs) {
    this.profile = userProfile;
  }

  @Mutation
  setAuth(userRs: UserRs) {
    // console.log("setAuth", userRs);
    this.profile = userRs.user;
    this.token = userRs.jwt;
    this.csrf = userRs.csrf;
    setJWT(userRs.jwt);
    setCSRF(userRs.csrf);
    localStorage.setItem("token", userRs.jwt);
    localStorage.setItem("csrf", userRs.csrf);
  }

  @Mutation
  dropAuth() {
    this.profile = undefined;
    this.token = undefined;
    this.csrf = undefined;
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

  @Action({ commit: "setAuth" })
  async refresh(userRs: UserRs) {
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
    const UserProfileRs: UserProfileRs | null = await updateUser();
    return UserProfileRs;
  }

  @Action({ commit: "setProfile" })
  async refreshProfile(UserProfileRs: UserProfileRs) {
    return UserProfileRs;
  }

  @Action({ commit: "setProfile" })
  async checkAuth(token: string) {
    setJWT(token);
    this.updateProfile();
  }
}

export default getModule(UserModule);

<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-toolbar-title>App</v-toolbar-title>
      <v-toolbar-items>
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/components" text>Components</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn flat v-if="!isLoggedIn" to="login" >Login</v-btn>
      <v-btn flat v-if="!isLoggedIn" to="register" >Register</v-btn>

      <v-btn flat v-if="isLoggedIn" to="register" exact>{{ username }}</v-btn>
      <v-btn flat v-if="isLoggedIn" @click.prevent="logOut" exact>{{ username }}</v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>fas fa-list</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import users from "../../store/modules/users";
import router from "../../router";

@Component
export default class Navbar extends Vue {
  get isLoggedIn() {
    return users.isTokenized;
  }

  get username() {
    return users.username;
  }

  logOut() {
    users.logout();
    router.push("login");
  }
}
</script>

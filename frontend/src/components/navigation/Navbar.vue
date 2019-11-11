<template>
  <div>
    <v-app-bar color="indigo" dark>
      <v-toolbar-title>SPA app </v-toolbar-title>
      <v-divider
        class="mx-4"
        inset
        vertical
      ></v-divider>
      <v-toolbar-items>
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/components" text>Components</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="!isLoggedIn" to="login" text>Login</v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-btn v-if="!isLoggedIn" to="register" text>Register</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-menu v-if="isLoggedIn" left bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>
              <v-icon left>fas fa-user</v-icon>
              {{ username }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn v-if="isLoggedIn" @click.prevent="logOut" text>logout</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
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

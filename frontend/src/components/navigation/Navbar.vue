<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item v-if="isLoggedIn">
        <v-list-item-avatar>
          <!-- avatar -->
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense v-if="!isLoggedIn" >
        <v-list-item v-for="item in links" :key="item.title" link>
          <v-list-item-content>
            <v-btn :to="item.path" text>{{ item.title }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense v-if="isLoggedIn" >
        <v-list-item v-for="item in loggedInLinks" :key="item.title" link>
          <v-list-item-content>
            <v-btn :to="item.path" text>{{ item.title }}</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="indigo" dark>
      <!-- BIG SCREEN -->
      <v-toolbar-title class="hidden-sm-and-down">SPA app </v-toolbar-title>
      <v-divider class="mx-4 hidden-sm-and-down" inset vertical></v-divider>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in links" :key="item.title" :to="item.path" text>{{
          item.title
        }}</v-btn>
      </v-toolbar-items>

      <!-- END OF BIG SCREEN -->
      <!-- SMALL SCREEN -->
      <v-btn
        class="hidden-md-and-up"
        color="blue-grey"
        fab
        small
        @click.stop="drawer = !drawer"
      >
        <v-icon dark>fas fa-bars</v-icon>
      </v-btn>
      <!-- END OF SMALL SCREEN -->
      <v-spacer></v-spacer>
      <!-- BIG SCREEN RIGHT PART -->
      <v-toolbar-items v-if="!isLoggedIn" class="hidden-sm-and-down">
        <v-btn
          v-for="item in userLinks"
          :key="item.title"
          :to="item.path"
          text
          >{{ item.title }}</v-btn
        >
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="isLoggedIn" to="/newrequest" text color="red">
          <v-icon left>fas fa-plus</v-icon>
          new request
        </v-btn>
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
                <v-btn v-if="isLoggedIn" @click.prevent="logOut" text
                  >logout</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <!-- END OF BIG SCREEN RIGHT PART -->
      <!-- SMALL SCREEN RIGHT PART -->
      <v-toolbar-items v-if="isLoggedIn" class="hidden-md-and-up">
        <v-btn v-if="isLoggedIn" to="/newrequest" text color="red">
          <v-icon left>fas fa-plus</v-icon>
          new request
        </v-btn>
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
                <v-btn v-if="isLoggedIn" @click.prevent="logOut" text
                  >logout</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
        <v-btn v-if="!isLoggedIn" class="hidden-md-and-up" to="/login" fab small>
          <v-icon>fas fa-sign-in-alt</v-icon>
        </v-btn>
      <!-- END OF SMALL SCREEN RIGHT PART -->
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import users from "../../store/modules/users";
import router from "../../router";

@Component
export default class Navbar extends Vue {
  public drawer: boolean = false;
  public links: object[] = [{ title: "Home", path: "/" }];
  public loggedInLinks: object[] = [
    { title: "Home", path: "/" },
    { title: "Components", path: "/components" },
    { title: "Components", path: "/components" }
  ];

  public userLinks: object[] = [
    { title: "register", path: "/register" },
    { title: "login", path: "/login" }
  ];

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

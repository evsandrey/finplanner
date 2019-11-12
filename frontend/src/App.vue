<template>
  <v-app>
    <Navbar></Navbar>
    <Loader></Loader>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/navigation/Navbar.vue";
import Footer from "./components/navigation/Footer.vue";
import Loader from "./components/navigation/Loader.vue";

@Component({
  components: {
    Navbar,
    Loader,
    Footer
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  min-height: 100%;
}
body {
  min-height: 100%;
}
</style>

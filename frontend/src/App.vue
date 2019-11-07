<template>
  <v-app>
  <div>
    <Navbar></Navbar>
    <div id="main">
      <main role="main" class="container">
        <div class="starter-template">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/navigation/Navbar.vue";

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {}
</script>

<style>

</style>

<template>
  <v-app>
  <Navbar></Navbar>
  <Loader></Loader>
  <v-content>
    <v-container fluid>
      <v-row 
       align="center"
       justify="center" >
        <spacer></spacer>
        <v-col cols="8" sm="12" md="8">   
          <router-view></router-view>
        </v-col>
        <spacer></spacer>
      </v-row>
    </v-container>
  </v-content>  
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/navigation/Navbar.vue";
import Loader from "./components/navigation/Loader.vue";

@Component({
  components: {
    Navbar,
    Loader
  }
})
export default class App extends Vue {}
</script>

<style>

</style>

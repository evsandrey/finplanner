<template>
  <div class="home">
    <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Дорого, долго, как просили.</h1>
          <h4 class="subheading"></h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">Some text here</v-parallax>
    <v-parallax height="300" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"></v-parallax>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

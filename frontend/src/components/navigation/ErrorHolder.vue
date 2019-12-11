<template>
  <v-row>
    <v-snackbar
      color="error"
      :top="true"
      :value="true"
      v-for="(error, index) in errors"
      :key="index"
      :timeout="3000"
    >
      {{ error }}
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import errorsholder from "../../store/modules/errorsholder";

@Component
export default class ErrorHolder extends Vue {
  get errors() {
    return errorsholder.errorsList;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<template>
  <v-row align="center">
    <v-row justify="space-around">
      some text
    </v-row>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field
        v-model="target"
        :counter="10"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>

      <v-btn color="warning" @click="resetValidation">
        Reset Validation
      </v-btn>
    </v-form>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";

@Component
export default class RequestForm extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

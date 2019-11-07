<template>
  <div class="template">
    <h1>Content is here</h1>
    <h2>Property1: {{msg}}</h2>
    <h2>Property2: {{age}}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";

@Component
export default class ComponentTemplate extends Vue {
  @Prop({type: String, default: "Hello"}) 
  private msg!: string;
  @Prop({type: Number, default: 1}) 
  private age!: number;


  @Watch('msg')
  onPropertyChanged(value: string, oldValue: string) {
    // Do stuff with the watcher here.
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Template/>
  </div>
</template>

<script>
// @ is an alias to /src
import Template from "../components/TemplateComponent.vue";

export default {
  name: "home",
  components: {
    Template
  }
};
</script>

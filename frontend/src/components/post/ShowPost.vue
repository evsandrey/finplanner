<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="8">
    <h1>{{post.title}}</h1>
    <p v-html="post.text"></p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post } from './post';
import { API } from "../../utils/api";
import Router from "../../router/index";

@Component
export default class ShowPost extends Vue {
  @Prop({ type: String, default: 0 })
  private post_id!: string;
  
  private post: Post = new Post("","",undefined);

  async created(){
      const resp = await API.get(`posts/${this.post_id}`)
      this.post = resp.data as Post;
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

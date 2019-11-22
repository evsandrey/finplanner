<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="8">
    <v-card v-for="(post,index) in posts" :key="index" max-width="100%" class="mb-3">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{post.title}}</v-list-item-title>
          <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>
      <v-card-text v-html="post.text"></v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" @click.stop="show(post.id)">Read</v-btn>
        <v-btn text color="deep-purple accent-4">Bookmark</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post } from "./post";
import { API } from "../../utils/api";
import Router from "../../router/index";

@Component
export default class ListPosts extends Vue {
  private posts: Post[] = [];
  show(post_id: string) {
        Router.push({name: 'showPost', params: { post_id: post_id }})
  }

  async created() {
    const resp = await API.get(`posts`);
    this.posts = resp.data as Post[];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
<template>
  <v-row align="center">
    <v-col v-for="(post, index) in posts" :key="index" cols="12" xs="12" sm="12" md="12" justify="center">
      <v-card max-width="1100px" outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{
              post.title
              }}
            </v-list-item-title>
            <v-list-item-subtitle></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text v-html="post.text.substring(0, 1500)" class="text"></v-card-text>
        <v-list-item class="grow">
          <div class="gradient"></div>
          <v-btn
            text
            outlined
            color="indigo"
            @click.stop="show(post.id)"
          >Read</v-btn>

          <v-row align="center" justify="end">
            <UserPill v-model="post.user" class="mr-5"/>    
          </v-row>
        </v-list-item>
        <v-card-actions>
          
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post, PostHelper, PostRs } from "./post";
import { API } from "../../utils/api";
import Router from "../../router/index";
import { User } from "../user/User";
import UserPill from "../user/UserPill.vue";
import { UserProfileRs } from "../../store/modules/user";

@Component({
  components: {
    UserPill
  }
})
export default class ListPosts extends Vue {
  private posts: Post[] = [];
  show(post_id: string) {
    Router.push({ name: "showPost", params: { post_id: post_id } });
  }

  async created() {
    const resp = await API.get(`posts`);
    this.posts = PostHelper.fromRespArray(resp.data as PostRs[]);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text {
  color: black;
}
.text p {
  color: black;
}
.gradient {
    position: absolute;
    top: -70px;
    height:50px;
    width: 100%;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%, rgba(0,212,255,1) 100%);
}


</style>

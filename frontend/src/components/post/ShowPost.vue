<template>
  <v-row v-if="post" align="center" justify="center">
    <v-col cols="12" sm="12" md="12">
      <h1>{{ post.title }}<UserPill v-model="user" /><v-btn @click="edit()">edit</v-btn></h1>
      <p v-html="post.text"></p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post } from "./post";
import { API } from "../../utils/api";
import Router from "../../router/index";
import UserPill from "../user/UserPill.vue";
import { User } from "../user/User";
import { UserProfileRs } from "../../store/modules/user";

@Component({
  components: {
    UserPill
  }
})
export default class ShowPost extends Vue {
  @Prop({ type: Number, default: 0 })
  private post_id!: number;

  private post: Post | null = null;
  private user: User | null = null;

  async created() {
    const resp = await API.get(`posts/${this.post_id}`);
    if (resp.data) {
      this.post = resp.data as Post;
      this.user = new User(resp.data.user as UserProfileRs);
    }
  }
  edit() { 
    if(this.post && this.post_id){
        Router.push({ name: "editPost", params: { post_id: this.post.id as string} });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

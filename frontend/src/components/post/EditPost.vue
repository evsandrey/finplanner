<template>
  <v-row v-if="post" align="center" justify="center">
    <v-col cols="12" sm="12" md="12">
      <PostForm v-model="post"></PostForm>
      <v-btn large block color="primary" class="mt-6" @click="update()"
        >Update</v-btn
      >
      <v-btn large block color="error" class="mt-6" @click="remove()"
        >Delete</v-btn
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post, PostHelper, PostRs } from "./post";
import { API } from "../../utils/api";
import Router from "../../router/index";
import PostForm from "./PostForm.vue";
import users from "../../store/modules/users";

@Component({
  components: {
    PostForm
  }
})
export default class EditPost extends Vue {
  @Prop({ type: Number, default: 0 })
  private post_id!: number;

  private post: Post | null = null;

  async created() {
    const resp = await API.get(`posts/${this.post_id}`);
    if (resp.data) {
      this.post = new Post(resp.data as PostRs);
    }
  }

  update() {
    if (this.post)
      API.put(`posts/${this.post_id}`, this.post.asSavePostRq()).then(post => {
        Router.push("/post/" + post.data.id);
      });
  }

  remove() {
    if (this.post)
      API.delete(`posts/${this.post_id}`).then(post => {
        Router.push("/posts");
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

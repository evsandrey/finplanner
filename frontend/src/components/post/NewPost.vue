<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="8">
      <PostForm v-model="post"></PostForm>
      <v-btn large block color="primary" class="mt-6" @click="save()">Save</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post,PostHelper } from "./post";
import { API } from "../../utils/api";
import Router from "../../router/index";
import PostForm from "./PostForm.vue";
import users from "../../store/modules/users";

@Component({
  components: {
    PostForm
  }
})
export default class NewPost extends Vue {
  private post: Post = PostHelper.getNew();

  save() {
    API.post("posts", this.post.asSavePostRq()).then(post => {
      Router.push("/post/" + post.data.id);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

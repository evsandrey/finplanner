<template>
  <div>
      <PostForm v-model="post"></PostForm>
      <v-btn @click="save()"></v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post } from './post'
import { API } from '../../utils/api'
import Router from "../../router/index";
import PostForm from "./PostForm.vue";
import users from "../../store/modules/users"

@Component({
    components:{
        PostForm
    }
})
export default class NewPost extends Vue {
  private post: Post = new Post("","", users.userId );
  
  save(){
      API.post('posts',this.post)
      .then((post) => {
          Router.push('posts')
      })

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
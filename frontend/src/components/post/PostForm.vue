<template>
  <v-form>
        <v-text-field
            v-model="title"
            label="Title"
            required
          ></v-text-field>
      <v-textarea
          v-model="text"
          hint="text"
        ></v-textarea>
  </v-form>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post } from './post'
import { API } from '../../utils/api'
import Router from "../../router/index";

@Component
export default class PostForm extends Vue {
  @Prop({ 
      type: Post, 
      default: new Post("","","") 
  })
  private value!: Post;
  
  get title(){
      return this.value.title
  }
  set title(title: string){
      this.value.setTitle(title)
  }
  
  
  get text(){
      return this.value.text
  }
  set text(text: string){
      this.value.setText(text)
  }
  save(){
      API.post('posts',this.value)
      .then((post) => {
          Router.push('posts')
      })

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
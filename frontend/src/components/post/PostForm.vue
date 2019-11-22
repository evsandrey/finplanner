<template>
  <v-form>
    <v-text-field v-model="title" label="Title" required></v-text-field>
    <tiptap-vuetify v-model="text" :extensions="extensions" />
  </v-form>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Post } from "./post";
import { API } from "../../utils/api";
import Router from "../../router/index";

import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image
} from "tiptap-vuetify";

@Component({
  components: {
    TiptapVuetify
  }
})
export default class PostForm extends Vue {
  @Prop({
    type: Post,
    default: new Post("", "", "")
  })
  private value!: Post;

  extensions: Object = [
    History,
    Blockquote,
    Link,
    Underline,
    Strike,
    Italic,
    ListItem, // if you need to use a list (BulletList, OrderedList)
    BulletList,
    OrderedList,
    Image,
    [
      Heading,
      {
        // Options that fall into the tiptap's extension
        options: {
          levels: [1, 2, 3]
        }
      }
    ],
    Bold,
    Link,
    Code,
    HorizontalRule,
    Paragraph,
    HardBreak // line break on Shift + Ctrl + Enter
  ];

  get title() {
    return this.value.title;
  }
  set title(title: string) {
    this.value.setTitle(title);
  }

  get text() {
    return this.value.text;
  }
  set text(text: string) {
    this.value.setText(text);
  }
  save() {
    API.post("posts", this.value).then(post => {
      Router.push("posts");
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
<template>
  <v-form>
    <v-text-field v-model="position" label="Position" required></v-text-field>
    <v-text-field v-model="company" label="Company" required></v-text-field>
    <v-text-field
      v-model="company_url"
      label="Company website url"
      required
    ></v-text-field>
    <v-dialog
      ref="join_date_dialog"
      v-model="modal_join_date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="join_date"
          label="Join date"
          prepend-icon="far fa-calendar-alt"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="join_date" type="month" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal_join_date = false"
          >Cancel</v-btn
        >
        <v-btn
          text
          color="primary"
          @click="$refs.join_date_dialog.save(join_date)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      ref="quit_date_dialog"
      v-model="modal_quit_date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="quit_date"
          label="Quit date"
          prepend-icon="far fa-calendar-alt"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="quit_date" type="month" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal_quit_date = false"
          >Cancel</v-btn
        >
        <v-btn
          text
          color="primary"
          @click="$refs.quit_date_dialog.save(quit_date)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
    <tiptap-vuetify
      v-model="description"
      :extensions="extensions"
      placeholder="Describe you job"
    />
    <br />
    <br />
    <tiptap-vuetify
      v-model="exp"
      :extensions="extensions"
      placeholder="Describe you achievments"
    />
  </v-form>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { API } from "../../utils/api";
import { Job, JobHelper } from "./Job";

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
export default class JobForm extends Vue {
  @Prop({
    type: Job,
    default: JobHelper.getNew()
  })
  private value!: Job;

  modal_join_date: boolean = false;
  modal_quit_date: boolean = false;

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
  get position(): string {
    return this.value.position;
  }
  get join_date(): string {
    return `${this.value.join_date.getFullYear()}-${this.value.join_date.getMonth() +
      1}`;
  }
  get quit_date(): string {
    return `${this.value.quit_date.getFullYear()}-${this.value.quit_date.getMonth() +
      1}`;
  }
  get description(): string {
    return this.value.description;
  }
  get technologies(): string {
    return this.value.technologies;
  }
  get company(): string {
    return this.value.company;
  }
  get company_url(): string {
    return this.value.company_url;
  }
  get exp(): string {
    return this.value.exp;
  }

  set position(position: string) {
    this.value.set_position(position);
  }
  set join_date(join_date: string) {
    this.value.set_join_date(new Date(Date.parse(join_date + "-1")));
  }
  set quit_date(quit_date: string) {
    this.value.set_quit_date(new Date(Date.parse(quit_date + "-1")));
  }
  set description(description: string) {
    this.value.set_description(description);
  }
  set technologies(technologies: string) {
    this.value.set_technologies(technologies);
  }
  set company(company: string) {
    this.value.set_company(company);
  }
  set company_url(company_url: string) {
    this.value.set_company_url(company_url);
  }
  set exp(exp: string) {
    this.value.set_exp(exp);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

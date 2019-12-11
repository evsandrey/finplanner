<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="8">
      <JobForm v-model="job"></JobForm>
      <v-btn large block color="primary" class="mt-6" @click="save()"
        >Save</v-btn
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Job, JobHelper } from "./Job";
import { API } from "../../utils/api";
import Router from "../../router/index";
import JobForm from "./JobForm.vue";
import users from "../../store/modules/users";

@Component({
  components: {
    JobForm
  }
})
export default class NewJob extends Vue {
  private job: Job = JobHelper.getNew();

  save() {
    API.post("jobs", this.job).then(post => {
      //    Router.push("/post/" + post.data.id);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

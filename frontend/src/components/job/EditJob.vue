<template>
  <v-row v-if="loaded" align="center" justify="center">
    <v-col cols="12" sm="12" md="8">
      <JobForm v-model="job"></JobForm>
      <v-btn large block color="primary" class="mt-6" @click="update()"
        >Save</v-btn
      >
      <v-btn large block color="error" class="mt-6" @click="remove()"
        >Delete</v-btn
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Job, JobHelper, JobRs } from "./Job";
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
  @Prop({ type: Number, default: 0 })
  private job_id!: number;

  private job: Job | null = null;

  loaded: boolean = false;

  async created() {
    const resp = await API.get(`jobs/${this.job_id}`);
    if (resp.data) {
      this.job = new Job(resp.data as JobRs);
      this.loaded = true;
    }
  }

  update() {
    if (this.job)
      API.put(`jobs/${this.job_id}`, this.job).then(job => {
        Router.push("/job/" + job.data.id);
      });
  }

  remove() {
    if (this.job)
      API.delete(`jobs/${this.job_id}`).then(job => {
        Router.push("/jobs");
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

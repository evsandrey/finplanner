<template>
  <div class="jobs-list pa-3" v-if="jobs && jobs.length > 0">
    <div v-for="(job, index) in jobs" :key="index" class="job">
      <div class="d-flex">
        <div class="order-1">
          <h3 class="pa-0 ma-0">{{ job.position }}</h3>
          <p class="caption pa-0 ma-0">
            at <a :href="job.company_url">{{ job.company }}</a> in Moscow office
          </p>
        </div>
        <div v-if="editable" class="order-10">
          <v-btn class="ml-4" @click="edit(job.id)" text outlined> Edit</v-btn>
        </div>
        <div class="order-3 ml-auto">
          <p class="pa-0 ma-0">
            {{ format(job.join_date) }} - {{ format(job.quit_date) }}
          </p>
          <p class="caption pa-sm-0 ma-0 text-right">
            {{
              humanizer.humanize(job.quit_date - job.join_date, {
                units: ["y", "mo"],
                round: true
              })
            }}
          </p>
        </div>
      </div>
      <div class="job-body mt-4">
        <div
          class="job-description body-2 pa-sm-0 pl-md-4 ma-0"
          v-html="job.description"
        ></div>
      </div>
      <v-divider inset vertical></v-divider>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { Job, JobHelper, JobRs } from "./Job";
import { API } from "../../utils/api";
import Router from "../../router/index";
import {
  HumanizeDurationLanguage,
  HumanizeDuration
} from "humanize-duration-ts";

@Component({})
export default class ListJobs extends Vue {
  @Prop({
    type: Array
  })
  jobs!: Job[];

  @Prop({
    type: Boolean,
    default: true
  })
  editable!: boolean;

  langService: HumanizeDurationLanguage = new HumanizeDurationLanguage();
  humanizer: HumanizeDuration = new HumanizeDuration(this.langService);

  format(date: Date) {
    return date.getMonth() + 1 + "." + date.getFullYear();
  }

  edit(job_id: string) {
    Router.push({ name: "editJob", params: { job_id: job_id } });
  }
  // async created() {
  //   if (!this.jobs) {
  //     const resp = await API.get(`jobs/`);
  //     this.jobs = JobHelper.fromRespArr(resp.data as JobRs[]);
  //   }
  // }
}
</script>

<style scoped>
.jobs-list {
  max-width: 800px;
}
</style>

<template>
  <v-content>
    <v-container class="fill-height" fluid v-if="loaded || jobs.length > 0">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="10">
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <div class="spacer"></div>
              <v-card max-width="375" class="mx-auto">
                <v-avatar size="200" class="avatar_moved elevation-6" tile>
                  <v-img :src="user.avatar_url" dark></v-img>
                </v-avatar>
                <div class="spacer"></div>
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">fas fa-envelope</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{user.email}}</v-list-item-title>
                      <v-list-item-subtitle>Personal</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider ></v-divider>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">fa fa-child</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>34 y.o.</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider ></v-divider>  
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="indigo">fas fa-map-marker-alt</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Moscow</v-list-item-title>
                      <v-list-item-subtitle>Russia</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
              
              <v-card v-for="(plate, index) in plates" :key="index" class="mx-auto mt-5 hidden-sm-and-down" max-width="375" tile dense>
                <v-list dense>
                  <v-subheader>{{plate.name}}</v-subheader> 
                  <v-list-item-group>
                    <v-list-item v-for="(item,index) in plate.items" :key="index">
                      <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                          <v-rating small :value="item.rate" color="orange" half-increments readonly></v-rating>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <h2 ref="summary" >SUMMARY</h2>
              <p>
                Total of 10 years’ experience in design, architecture and development of software test automation solutions based on software development/release requirements of web-based, desktop and client server applications as an Automation Test Engineer and as a Manual Tester in domains of finance, banking and OS virtualization in enterprises and startups.
                A basic knowledge of programming and web technologies. 
                Strong Scripting skills (especially nix based) and other programming language experience like Java/C#.
                Excellent planning and organization skills, with a commitment to delivering on aggressive deadlines.
                A self-starter who delivers high quality work and can adapt to new challenges, either on their own or as part of a team.
                A strong desire to learn and develop problem solving skills.
                Strong understanding and experience working with Object Repository.
                A strong understanding of web applications and related architecture, specifically client side MVC and RESTful services.
              </p>
              <h3>Experience</h3> 
                <ul>
                  <li>Running up to 1000 end-to-end UI tests on daily basis.</li>
                  <li>Running up to 3000 REST API tests on CI/CD pipline stages.</li>
                  <li>Development of test reports repository with web UI, custom analizing tools and integrations with in-house and market reporting tools</li>
                  <li>Testing on stands with more than 4000 servers</li>
                  <li>Integrating tests to custom CI/CD pipelines</li>
                </ul>
                <v-btn  v-if="!readmore" class="ma-3" text outlined @click="showMore()">read more</v-btn>
              <p v-if="readmore">
                <ul>
                  <li>Expertise in Entire Software Development Life Cycle (SDLC) and Software Testing Life Cycle (STLC) in Agile as well as Iterative development environments(Waterfall).</li>
                  <li>Expertise in different types of testing like Automation testing, Manual testing, Integration testing, System testing, Smoke testing, Regression testing, Performance testing, Functional testing, Database testing, GUI testing, Web / UI and User Acceptance Testing.</li>
                  <li>Conversant in developing Test scenarios, Test cases, Test data, Test procedures, Test reports and documenting Manual and Automation Tests.</li>
                  <li>Experience in implementing different automation development efforts in Agile/Scrum or Waterfall development environments.</li>
                  <li>Involved in design and implementation of Selenium WebDriver Automation Framework for Smoke test and Regression test using TestNG.</li>
                  <li>Experience with Cross-Browser and Compatibility Testing using Selenium Grid and TestNG to test whether the web applications are working as desired in different browsers and environments.</li>
                  <li>Experience in testing the application web services using SoapUI.</li>
                  <li>Developed Test Scripts to implement Test Cases, Test Scenarios, and features for BDD (Behavior Driven Development), TDD (Test Driven Development) using Cucumber.</li>
                  <li>Performed Continuous Integration of code and scripts using Jenkins and triggered the Continuous Delivery process using Jenkins build jobs.</li>
                  <li>Effectively involved in Defects logging, tracking and managing Defect Life Cycles using HP Quality Center and JIRA.</li>
                  <li>Reviewed Application and Test logs, program outputs and reports to identify program processing errors and defects.</li>
                  <li>Maintained Selenium & JAVA automation code and resource in git(GitLab,Bitbucket), over the time for improvements and new features.</li>
                  <li>Experience in Database/Backend testing using SQL Queries for data design, data validation and data integrity testing.</li>
                  <li>Well conversant with the implementation from scratch and practical hands on experience in different types of frameworks like Data Driven, Hybrid and Page Object Model (POM).</li>
                  <li>Experience with Cross-Browser and Compatibility Testing to test whether the web applications are working as desired in different browsers and environments.</li>
                  <li>Experience in Parallel Execution of Multiple Tests at a time in different environments.</li>
                  <li>Proficiency in testing complex software applications including manual testing.</li>
                </ul>
                <v-btn class="ma-3" text outlined @click="showLess()">read less</v-btn>
              </p>
              <h2>PROFESSIONAL EXPERIENCE:</h2>
              <ListJobs :editable="true" :jobs="jobs"></ListJobs>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import { User, UserHelper } from "../components/user/User";
import { UserProfileRs } from '../store/modules/user'
import { Job, JobHelper, JobRs } from "../components/job/Job";
import ListJobs from "../components/job/ListJobs.vue";
import users from "../store/modules/users";
import { API, apiUrl } from "../utils/api";
import ProfileCard from "../components/user/ProfileCard.vue";
import {
  HumanizeDurationLanguage,
  HumanizeDuration
} from "humanize-duration-ts";
import { UserRs } from "../store/modules/user";

@Component({
  components: {
    ProfileCard,
    ListJobs
  }
})
export default class About extends Vue {
  // eslint-disable-next-line
  user: User | null = null;
  langService: HumanizeDurationLanguage = new HumanizeDurationLanguage();
  humanizer: HumanizeDuration = new HumanizeDuration(this.langService);
  private jobs: Job[] = [];
  readmore: boolean = false;

  $refs!: {
    summary: HTMLElement
  }

  plates: Object[] = [
    {
      name : "Languages",
      items: [
        {name: "Russian", rate: 5 },
        {name: "English", rate: 2 },
      ]
    },
    { name: "Programming languages",
      items: [ 
        {name :"Java", rate: 4 },
        {name :"SQL", rate: 3 },
        {name :"Ruby", rate: 3 },
        {name :"JS(Typescript)", rate: 4 },
        {name :"Python", rate: 3 },
        {name :"VB", rate: 3 },
        {name :"C#", rate: 4 },
      ]
    },
    {
      name: "Testing tools", 
      items: [
        {name: "Selenium",rate: 4}, 
        {name: "Watir", rate: 3 },
        {name: "Cypress", rate: 3 },
        {name: "Appium",rate: 3}, 
        {name: "(*)Unit",rate: 4}, 
        {name: "TestNG",rate: 3}, 
        {name: "Load Runner",rate: 2}, 
        {name: "JMeter",rate: 2}
      ]
    },
    { 
      name: "CI/CD tools", 
      items:  [
        {name: "Jenkins",rate: 5 }, 
        {name: "Teamcity",rate: 3 },
        {name: "circleci",rate: 3 },
        {name: "Ansible",rate: 3 },
        {name: "Capistrano",rate: 3 }, 
        {name: "Puppet",rate: 3 }, 
        {name: "Docker",rate: 4 }, 
        {name: "Kubernetes",rate: 4 }, 
        {name: "Helm",rate:2 }
      ]
    },
    { 
      name: "Web Technologies", 
      items:  [
        {name: "HTML",rate: 5}, 
        {name: "CSS",rate: 5}, 
        {name: "JavaScript",rate: 4},
        {name: "JQuery",rate: 4}, 
        {name: "AngularJS",rate: 3}, 
        {name: "VueJS",rate: 3 }, 
        {name: "NodeJS",rate: 4 }, 
        {name: "REST services",rate:5}
      ]
    },
    { 
      name: "Defect Tracking",
      items : [
        {name: "JIRA",rate: 4 },
        {name: "Adaptavist",rate: 4 },
        {name: "TestRail",rate: 4 },
        {name: "HP/Quality Center",rate:3}, 
        
      ]
    },
    {
      name: "Cross Browser Platforms",
      items: [
        {name: "Selenoid", rate: 4},
        {name: "SeleniumGRID", rate: 4}, 
        {name: "OpenStack", rate: 3}, 
        {name: "AWS", rate: 3}, 
        {name: "Docker", rate: 3}, 
        
      ]
    },
    {
      name: "Databases",
      items: [
        { name: "Oracle",  rate: 4 },
        { name: "MongoDB",  rate: 3 },
        { name: "Postgres",  rate: 4 },
        { name: "Mysql",  rate: 4 },
        { name: "Redis", rate: 3 }
      ]
    },
    { 
      name: "Operating Systems",
      items: [
        { name: "Windows", rate: 4 }, 
        { name: "Mac OS",  rate: 4 }, 
        { name: "Linux",  rate: 5 },
      ]
    }  
  ]

  showMore() {
    this.readmore = true;
  }
  showLess() {
    this.readmore = false;
    this.$refs["summary"].scrollIntoView();
  }


  loaded: boolean = false;

  format(date: Date) {
    return date.getMonth() + 1 + "." + date.getFullYear();
  }

  created() {
    // const resp = await API.get(`my-cv/`);
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl+'my-cv', false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200 && request.responseText) {
      console.log(request.response);
      this.user = new User(JSON.parse(request.response) as UserProfileRs);
      this.jobs = JobHelper.fromRespArr(JSON.parse(request.response).jobs.sort(this.sortFunction) as JobRs[]);
      this.loaded = true;
    }
  }

  sortFunction(a: JobRs,b: JobRs){  
    var dateA = new Date(a.join_date).getTime();
    var dateB = new Date(b.join_date).getTime();
    return dateA > dateB ? -1 : 1;  
  }; 

}
</script>

<style scoped>
.spacer {
  height: 100px;
}
.avatar_moved {
  position: absolute;
  top: -100px;
  left: calc(50% - 100px);
}
</style>
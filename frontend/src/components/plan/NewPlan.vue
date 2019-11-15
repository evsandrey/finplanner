<template>
  <v-stepper v-model="currentStep" vertical>
    <v-stepper-step :complete="currentStep > 1" step="1">
      Select you plan dates
      <small>From and To dates</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card>
        <v-row>
          <v-col cols="12" sm="6">
            <RangeSelector
              :showSummary="true"
              :showPreset="true"
              v-model="range"
            ></RangeSelector>
          </v-col>
          <v-col cols="12" sm="6">Description: {{ range }}</v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="primary" @click="currentStep = 2">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <v-stepper-step :complete="currentStep > 2" step="2"
      >Set your current income</v-stepper-step
    >

    <v-stepper-content step="2">
      <v-card>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form ref="form">
              <CashFlowInput
                v-model="incomeCashFlow"
                label="What is you current income?"
              ></CashFlowInput>
            </v-form>
          </v-col>
          <v-col cols="12" sm="6"
            >Description{{ incomeCashFlow }}</v-col
          >
        </v-row>
        <v-card-actions>
          <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>
          <v-btn text @click="currentStep = 1">back</v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <v-stepper-step :complete="currentStep > 3" step="3"
      >Set your current expences</v-stepper-step
    >

    <v-stepper-content step="3">
      <v-card>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form ref="form">
              <CashFlowInput
                v-model="outcomeCashFlow"
                label="What is you current expences?"
              ></CashFlowInput>
            </v-form>
          </v-col>
          <v-col cols="12" sm="6">Description
            {{outcomeCashFlow}}
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="primary" @click="currentStep = 4">Continue</v-btn>
          <v-btn text @click="currentStep = 2">back</v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <v-stepper-step :complete="currentStep > 4" step="4"
      >Set your personal growth plan?</v-stepper-step
    >

    <v-stepper-content step="4">
      <v-card>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form ref="form">
              <ChangeInput
                v-model="incomeGrowth"
                label="What is you planned income growth?"
              ></ChangeInput>
              <ChangeInput
                v-model="outcomeGrowth"
                label="What is you planned expences growth?"
              ></ChangeInput>
            </v-form>
          </v-col>
          <v-col cols="12" sm="6">Description
            {{incomeGrowth}}
            {{outcomeGrowth}}
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="primary" @click="currentStep = 5">Continue</v-btn>
          <v-btn text @click="currentStep = 3">back</v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <v-stepper-step :complete="currentStep > 5" step="5"
      >Set your investment plan?</v-stepper-step
    >

    <v-stepper-content step="5">
      <v-card>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form ref="form">
              <ChangeInput
                v-model="investGrowth"
                label="What is you planned investment rate?"
              ></ChangeInput>
            </v-form>
          </v-col>
          <v-col cols="12" sm="6">Description</v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="primary" @click="currentStep = 6">Continue</v-btn>
          <v-btn text @click="currentStep = 4">back</v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <v-stepper-step :complete="currentStep > 6" step="6"
      >Set your current savings?
    </v-stepper-step>

    <v-stepper-content step="6">
      <v-card>
        <v-row>
          <v-col cols="12" sm="6">
            <v-form ref="form">
              <CashInput
                v-model="savings"
                label="What is you current savings?"
              ></CashInput>
            </v-form>
          </v-col>
          <v-col cols="12" sm="6">Description</v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="primary" @click="currentStep = 7">Continue</v-btn>
          <v-btn text @click="currentStep = 5">back</v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>
  </v-stepper>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import RangeSelector from "../time/RangeSelector.vue";
import PeriodicitySelector from "../utility/PeriodicitySelector.vue";
import CurrencySelector from "../utility/CurrencySelector.vue";
import CashInput from "../utility/CashInput.vue";
import CashFlowInput from "../utility/CashFlowInput.vue";
import ChangeInput from "../utility/ChangeInput.vue";
import { DateRange } from "../../models/utils/time/DateRange";
import { Periodicity } from "../../models/utils/Periodicity";
import { Currencies } from "../../models/basic/Currency";
import { Cash } from "../../models/basic/Cash";
import { CashFlow } from '../../models/basic/CashFlow';
import { Change } from '../../models/change/Change';

@Component({
  components: {
    RangeSelector,
    PeriodicitySelector,
    CurrencySelector,
    CashInput,
    CashFlowInput,
    ChangeInput
  }
})
export default class NewPlan extends Vue {
  range: DateRange = new DateRange(new Date(), new Date());
  currentStep: number = 0;
  periodicity: Periodicity = Periodicity.monthly();
  incomeCashFlow: CashFlow = new CashFlow(new Cash(10, Currencies.getDefault()), Periodicity.monthly());
  outcomeCashFlow: CashFlow = new CashFlow(new Cash(10, Currencies.getDefault()), Periodicity.monthly());
  incomeGrowth :Change = Change.fromId("percents",10,Periodicity.yearly());
  outcomeGrowth :Change = Change.fromId("percents",10,Periodicity.yearly());
  investGrowth :Change = Change.fromId("percents",10,Periodicity.yearly());

  savings: Cash = new Cash(10, Currencies.getDefault())

  some() {
    this.range.to = new Date(
      this.range.from.getFullYear(),
      this.range.from.getMonth(),
      this.range.from.getDay()
    );
    this.range.getNumberOfYears;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

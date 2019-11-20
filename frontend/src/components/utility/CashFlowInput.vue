<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ChangeInput v-model="change" :label="label"></ChangeInput>
    </v-col>
    <v-col cols="12" sm="6">
      <v-row>
        <v-col cols="12" sm="12">
          <PeriodicitySelector v-model="periodicity"></PeriodicitySelector>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Watch, Prop, Emit, Vue } from "vue-property-decorator";
import { Currency, Currencies } from "../../models/basic/Currency";
import { Cash } from "../../models/basic/Cash";
import { CashFlow, CashFlowHelper } from "../../models/basic/CashFlow";
import { Periodicity } from "../../models/utils/Periodicity";
import ChangeInput from "../utility/ChangeInput.vue";
import PeriodicitySelector from "../utility/PeriodicitySelector.vue";
import { ChangeHelper, Change } from "../../models/change/Change";

@Component({
  components: {
    ChangeInput,
    PeriodicitySelector
  }
})
export default class CashFlowInput extends Vue {
  @Prop({
    type: Object as () => CashFlow,
    default: () => {
      return CashFlowHelper.getDefault();
    }
  })
  private value!: CashFlow;

  @Prop({
    type: String,
    default: "Amount"
  })
  private label!: string;

  get change(): Change {
    return this.value.fromChange;
  }
  set change(change: Change) {
    this.emitChange(new CashFlow(change, this.value.periodicity));
  }

  get periodicity(): Periodicity {
    return this.value.periodicity;
  }
  set periodicity(periodicity: Periodicity) {
    this.emitChange(new CashFlow(this.value.fromChange, periodicity));
  }

  @Emit("input")
  emitChange(cash: CashFlow) {
    return cash;
  }
}
</script>

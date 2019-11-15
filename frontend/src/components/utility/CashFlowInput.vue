<template>
  <v-row>
    <v-col cols="12" sm="6">
      <CashInput v-model="cash" :label="label"></CashInput>
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
import { CashFlow } from "../../models/basic/CashFlow";
import { Periodicity } from "../../models/utils/Periodicity";
import CashInput from "../utility/CashInput.vue";
import PeriodicitySelector from "../utility/PeriodicitySelector.vue";

@Component({
  components: {
    CashInput,
    PeriodicitySelector
  }
})
export default class CashFlowInput extends Vue {
  @Prop({
    type: Object as () => CashFlow,
    default: () => {
      return new CashFlow(
        new Cash(10, Currencies.getDefault()),
        Periodicity.yearly()
      );
    }
  })
  private value!: CashFlow;

  @Prop({
    type: String,
    default: "Amount"
  })
  private label!: string;

  get cash(): Cash {
    return this.value.cash;
  }
  set cash(cash: Cash) {
    this.emitChange(new CashFlow(cash, this.value.periodicity));
  }

  get periodicity(): Periodicity {
    return this.value.periodicity;
  }
  set periodicity(periodicity: Periodicity) {
    this.emitChange(new CashFlow(this.value.cash, periodicity));
  }

  @Emit("input")
  emitChange(cash: CashFlow) {
    return cash;
  }
}
</script>

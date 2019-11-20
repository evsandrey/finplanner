<template>
  <div class="template">
    <h1>Components examples:</h1>
    <h2>Range picker:</h2>
    <RangeSelector v-model="range" />
    <RangeView v-model="range" />

    {{ range.getNumberOfDays() }}

    <h2>Periodicity picker:</h2>
    <PeriodicitySelector v-model="periodicity" />
    {{ periodicity }}

    <h2>CurrencySelector:</h2>
    <CurrencySelector v-model="currency" />
    {{ currency }}

    <h2>CashInput:</h2>
    <CashInput v-model="cash" />
    {{ cash }}

    <h2>CashFlowInput:</h2>
    <CashFlowInput v-model="cashFlow" />
    {{ cashFlow }}

    <h2>ChangeInput:</h2>
    <ChangeInput v-model="change" />
    {{ change }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RangeSelector from "../components/time/RangeSelector.vue";
import { DateRange, DateRangeHelper } from "../models/utils/time/DateRange";
import PeriodicitySelector from "../components/utility/PeriodicitySelector.vue";
import RangeView from "../components/time/RangeView.vue";
import CurrencySelector from "../components/utility/CurrencySelector.vue";
import CashFlowInput from "../components/utility/CashFlowInput.vue";
import CashInput from "../components/utility/CashInput.vue";
import ChangeInput from "../components/utility/ChangeInput.vue";
import { Periodicity } from "../models/utils/Periodicity";
import { Currency, Currencies } from "../models/basic/Currency";
import { Cash } from "../models/basic/Cash";
import { CashFlow } from "../models/basic/CashFlow";
import { Change, ChangeHelper } from "../models/change/Change";

@Component({
  components: {
    RangeSelector,
    PeriodicitySelector,
    CurrencySelector,
    CashInput,
    CashFlowInput,
    ChangeInput,
    RangeView
  }
})
export default class ComponentTemplate extends Vue {
  range: DateRange = DateRangeHelper.getNextYear();

  test() {
    this.range.getNumberOfDays;
  }

  periodicity: Periodicity = Periodicity.monthly();

  currency: Currency = Currencies.getDefault();

  cash: Cash = new Cash(0, Currencies.getDefault());

  change: Change = ChangeHelper.fromStrategy(
    "percents",
    10,
    Periodicity.yearly()
  );

  cashFlow: CashFlow = new CashFlow(this.change, Periodicity.monthly());
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

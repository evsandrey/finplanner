<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="amount"
        type="number"
        :label="label"
        required
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <CurrencySelector v-model="currency"></CurrencySelector>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Watch, Prop, Emit, Vue } from "vue-property-decorator";
import { Currency, Currencies } from "../../models/basic/Currency";
import { Cash } from "../../models/basic/Cash";
import CurrencySelector from "./CurrencySelector.vue";

@Component({
  components: {
    CurrencySelector
  }
})
export default class CashInput extends Vue {
  @Prop({
    type: Object as () => Cash,
    default: () => {
      return new Cash(0, Currencies.getDefault());
    }
  })
  private value!: Cash;

  @Prop({
    type: String,
    default: "Amount"
  })
  private label!: string;

  get amount(): number {
    return this.value.amount;
  }
  set amount(amount: number) {
    if (isNaN(amount)) {
      this.emitChange(new Cash(0, this.value.currency));
    } else {
      this.emitChange(new Cash(amount, this.value.currency));
    }
  }

  get currency(): Currency {
    return this.value.currency;
  }
  set currency(currency: Currency) {
    this.emitChange(new Cash(this.value.amount, currency));
  }

  @Emit("input")
  emitChange(cash: Cash) {
    return cash;
  }
}
</script>

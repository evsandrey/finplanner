<template>
  <v-select
    v-model="currency"
    :items="aviableCurrency"
    item-text="code"
    item-value="code"
  ></v-select>
</template>
<script lang="ts">
import { Component, Watch, Prop, Emit, Vue } from "vue-property-decorator";
import { Currency, Currencies } from "../../models/basic/Currency";

@Component
export default class CurrencySelector extends Vue {
  @Prop({
    type: Object as () => Currency,
    default: () => {
      return new Currency("USD");
    }
  })
  private value!: Currency;

  private aviableCurrency: Currency[] = [];

  get currency(): string {
    return this.value.code;
  }

  set currency(currency: string) {
    this.emitChange(new Currency(currency));
  }

  @Emit("input")
  emitChange(currency: Currency) {
    return currency;
  }

  mounted() {
    this.aviableCurrency = Currencies.getAll();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

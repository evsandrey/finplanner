<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="amount"
        type="rate"
        :label="label"
        required
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <CurrencySelector v-model="currency"></CurrencySelector>
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
import { Change } from "../../models/change/Change";
import { Periodicity } from "../../models/utils/Periodicity";

@Component
export default class ChangeSelector extends Vue {
  @Prop({
    type: Object as () => Change,
    default: () => {
      return Change.fromId("percents", 0, Periodicity.yearly());
    }
  })
  private value!: Change;

  get rate() {
    return this.value.changeRate;
  }
  set rate(rate: number) {}

  get periodicity() {
    return this.value.changePeriodicity;
  }
  set periodicity(rate: Periodicity) {}

  @Emit("input")
  emitChange(rat: Date, toDate: Date) {
    // const input = new DateRange(fromDate, toDate);
    // return input;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

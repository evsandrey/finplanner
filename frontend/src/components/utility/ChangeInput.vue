<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="rate"
            type="number"
            :label="label"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select v-model="strategy" :items="strategies"></v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="3">
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
import { Change, ChangeHelper } from "../../models/change/Change";
import { Periodicity } from "../../models/utils/Periodicity";
import PeriodicitySelector from "../utility/PeriodicitySelector.vue";

@Component({
  components: {
    PeriodicitySelector
  }
})
export default class ChangeInput extends Vue {
  @Prop({
    type: Object as () => Change,
    default: () => {
      return ChangeHelper.fromStrategy("percents", 0, Periodicity.yearly());
    }
  })
  private value!: Change;

  @Prop({
    type: String,
    default: "Rate"
  })
  private label!: string;

  private strategies = ChangeHelper.aviableChanges;

  get rate() {
    return this.value.changeRate;
  }
  set rate(rate: number) {
    this.emitChange(
      ChangeHelper.fromStrategy(
        this.value.strategy,
        rate,
        this.value.changePeriodicity
      )
    );
  }

  get strategy() {
    return this.value.strategy;
  }

  set strategy(strategy: string) {
    this.emitChange(
      ChangeHelper.fromStrategy(
        strategy,
        this.value.changeRate,
        this.value.changePeriodicity
      )
    );
  }

  get periodicity() {
    return this.value.changePeriodicity;
  }
  set periodicity(periodicity: Periodicity) {
    this.emitChange(
      ChangeHelper.fromStrategy(
        this.value.strategy,
        this.value.changeRate,
        periodicity
      )
    );
  }

  @Emit("input")
  emitChange(change: Change) {
    return change;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

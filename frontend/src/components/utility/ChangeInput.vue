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
import { Change } from "../../models/change/Change";
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
      return Change.fromId("percents", 0, Periodicity.yearly());
    }
  })
  private value!: Change;

  @Prop({
    type: String,
    default: "Rate"
  })
  private label!: string;

  private strategies = Change.aviableChanges;

  get rate() {
    return this.value.changeRate;
  }
  set rate(rate: number) {
    this.emitChange(
      Change.fromId(this.value.id, rate, this.value.changePeriodicity)
    );
  }

  get strategy() {
    return this.value.id;
  }

  set strategy(strategy: string) {
    this.emitChange(
      Change.fromId(
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
      Change.fromId(this.value.id, this.value.changeRate, periodicity)
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

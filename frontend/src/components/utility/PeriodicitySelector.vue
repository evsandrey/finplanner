<template>
  <v-select
    v-model="periodicity"
    :items="aviablePeriods"
    item-text="forSelect"
    item-value="id"
  ></v-select>
</template>
<script lang="ts">
import { Component, Watch, Prop, Emit, Vue } from "vue-property-decorator";
import { Periodicity } from "../../models/utils/Periodicity";

@Component
export default class PeriodicitySelector extends Vue {
  @Prop({
    type: Object as () => Periodicity,
    default: () => {
      return Periodicity.yearly();
    }
  })
  private value!: Periodicity;

  private aviablePeriods: Periodicity[] = [];

  get periodicity(): string {
    return this.value.id;
  }

  set periodicity(periodicity: string) {
    this.emitChange(Periodicity.fromId(periodicity));
  }

  @Emit("input")
  emitChange(periodicity: Periodicity) {
    return periodicity;
  }

  mounted() {
    this.aviablePeriods = Periodicity.getAllAviable();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

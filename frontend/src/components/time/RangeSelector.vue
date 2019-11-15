<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          :value="menuFrom"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          @blur="from = parseDate(dateFormatted)"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fromFormatted"
              label="From"
              prepend-icon="far fa-calendar-alt"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="from"
            @input="menuFrom = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          :value="menuTo"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          @blur="to = parseDate(dateFormatted)"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="toFormatted"
              label="To"
              prepend-icon="far fa-calendar-alt"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="to" @input="menuTo = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-if="showSummary">
      <blockquote class="blockquote">
        it is {{ value.getNumberOfYears() }} years or
        {{ value.getNumberOfMonths() }} months or
        {{ value.getNumberOfDays() }} days
      </blockquote>
    </v-row>
    <v-row v-if="showPreset">
      <v-btn
        class="ma-3"
        @click="
          value.to = new Date(
            value.from.getFullYear() + 5,
            value.from.getMonth(),
            value.from.getDay()
          )
        "
        >5 years</v-btn
      >
      <v-btn
        class="ma-3"
        @click="
          value.to = new Date(
            value.from.getFullYear() + 10,
            value.from.getMonth(),
            value.from.getDay()
          )
        "
        >10 years</v-btn
      >
      <v-btn
        class="ma-3"
        @click="
          value.to = new Date(
            value.from.getFullYear() + 15,
            value.from.getMonth(),
            value.from.getDay()
          )
        "
        >15 years</v-btn
      >
      <v-btn
        class="ma-3"
        @click="
          value.to = new Date(
            value.from.getFullYear() + 20,
            value.from.getMonth(),
            value.from.getDay()
          )
        "
        >20 years</v-btn
      >
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Emit,
  Model,
  Watch,
  Vue
} from "vue-property-decorator";
import { DateRange } from "../../models/utils/time/DateRange";

@Component({
  components: {}
})
export default class RangeSelector extends Vue {
  @Prop({
    type: DateRange,
    default: () => {
      return new DateRange(new Date(), new Date());
    }
  })
  public value!: DateRange;

  @Prop({
    type: Boolean,
    default: false
  })
  public showSummary!: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  public showPreset!: boolean;

  menuFrom: boolean = false;
  menuTo: boolean = false;

  get from() {
    return this.value.from.toISOString().substr(0, 10);
  }
  set from(from: string) {
    let fromDate: Date = new Date(Date.parse(from));
    if (fromDate.getTime() > this.value.to.getTime()) {
      this.emitChange(fromDate, fromDate);
    } else {
      this.emitChange(fromDate, this.value.to);
    }
  }

  get to() {
    return this.value.to.toISOString().substr(0, 10);
  }
  set to(to: string) {
    let toDate: Date = new Date(Date.parse(to));
    if (toDate.getTime() < this.value.from.getTime()) {
      this.emitChange(toDate, toDate);
    } else {
      this.emitChange(this.value.from, toDate);
    }
  }

  @Emit("input")
  emitChange(fromDate: Date, toDate: Date) {
    const input = new DateRange(fromDate, toDate);
    return input;
  }

  get fromFormatted() {
    return this.formatDate(this.from);
  }

  get toFormatted() {
    return this.formatDate(this.to);
  }

  formatDate(dateIso: string) {
    if (!dateIso) return null;
    const [year, month, day] = dateIso.split("-");
    return `${day}.${month}.${year}`;
  }

  parseDate(date: string) {
    if (!date) return null;
    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  mounted() {
    this.from = this.value.from.toISOString().substr(0, 10);
    this.to = this.value.to.toISOString().substr(0, 10);
  }
}
</script>

<style scoped></style>

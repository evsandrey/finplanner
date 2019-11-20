<template>
  <div class="line">
    <div
      class="month"
      v-for="(month, index) in monthes"
      :key="`month-${index}`"
    >
      {{ month.str }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DateRange, DateRangeHelper } from "../../models/utils/time/DateRange";

@Component
export default class RangeView extends Vue {
  @Prop({
    type: Object as () => DateRange,
    default: () => {
      return DateRangeHelper.getNextYear();
    }
  })
  private value!: DateRange;

  get monthes() {
    let resultList = [];
    let date = new Date(this.value.from);
    let endDate = new Date(this.value.to);
    let monthNameList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    if (date == endDate) return [];
    while (date <= endDate) {
      let stringDate =
        monthNameList[date.getMonth()] + " " + date.getFullYear();

      //get first and last day of month
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      resultList.push({
        str: stringDate,
        first: firstDay,
        last: lastDay
      });
      date.setMonth(date.getMonth() + 1);
    }
    return resultList;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
  display: inline;
  overflow-x: scroll;
}
.month {
  display: inline;
}
</style>

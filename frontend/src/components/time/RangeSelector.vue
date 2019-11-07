<template>
  <div class="datepicker">
    <div>
        <span>From:</span><span><datepicker v-model="from" :monday-first=true calendar-class=picker></datepicker></span>
    </div>
    <div>
        <span>To:</span> <span><datepicker v-model="to" :monday-first=true calendar-class=picker></datepicker></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Model, Watch, Vue } from "vue-property-decorator";
import * as Datepicker from 'vuejs-datepicker';
import {DateRange} from '../../models/utils/DateRange'

@Component({
  components: {
    datepicker: Datepicker.default,
  }
})

export default class RangeSelector extends Vue {
  @Prop({
    type: DateRange, 
    default: (() => { return new DateRange(new Date(), new Date())})
  })
  public value!: DateRange;

  proxyFrom: Date = new Date();
  proxyTo: Date = new Date();
  
  get from(){
    return this.value.from
  }
  set from(fromDate: Date){
    if (fromDate.getTime() > this.value.to.getTime()){
      this.emitChange(fromDate,fromDate)
    } else {
      this.emitChange(fromDate,this.value.to)
    }
  }
  get to(){
    return this.value.to
  }
  set to(toDate: Date){
    if (toDate.getTime() < this.value.from.getTime()){
      this.emitChange(toDate,toDate)
    } else {
      this.emitChange(this.value.from, toDate)
    }
  }
  @Emit('input')
  emitChange(fromDate: Date, toDate: Date) {
    const input = new DateRange(fromDate,toDate)
    console.log(input)
    return input;
  }
}
</script>

<style scoped>
.datepicker {
  padding: 5px;
}
.datepicker div {
    display: inline-block;
}
.datepicker span {
    display: inline-block;
    padding-right: 5px;
}
</style>
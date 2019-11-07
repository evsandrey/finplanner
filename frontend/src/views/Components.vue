<template>
  <div class="template">
    <h1>Components examples:</h1>
    <h2>Range picker:</h2>
    <RangeSelector v-model="range"/>
    {{range}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RangeSelector from '../components/time/RangeSelector.vue'
import { DateRange } from '../models/utils/DateRange';
@Component({
    components:{
        RangeSelector,
    }
})
export default class ComponentTemplate extends Vue {
  range: DateRange = new DateRange(new Date(), new Date((new Date()).getTime()+1000000000));
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

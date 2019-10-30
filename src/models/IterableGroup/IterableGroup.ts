import { Range } from "../utils/Range"
import { RangedCashFlow } from "../../interfaces/RangedCashFlow";

export class IterableGroup implements IterableIterator<number>,RangedCashFlow {
    
    getFlowForMonth(): number {
        throw new Error("Method not implemented.");
    }
    getFlow(date: Date): number {
        throw new Error("Method not implemented.");
    }
    
    public ranges: Range[] = [];
    public flowRange: Range;
    private pointer: number;

    setBigRange() {
        let dates: Date[] =[];
        this.ranges.forEach( (range) => {
            dates.push(range.from);
            dates.push(range.to);
        })    
        var latest = new Date(Math.max.apply(null,dates));
        var earliest = new Date(Math.min.apply(null,dates));
        this.flowRange = new Range(earliest,latest);
    }

    iterate() {
        let cols = []
        for (let month of this.flowRange) {
            let rows = []
            for (let i in this.ranges){
                console.log(i)
                rows.push(this.ranges[i].getMonthIfExists(month.startDate))
            }
            cols.push(rows);
        };
        console.log(cols)
    }

    
    [Symbol.iterator](): IterableIterator<number> {
          return this;
    }
    next(value?: any): IteratorResult<number> {
        if (this.pointer < this.flowRange.monthes.length) {
            return {
              done: false,
              value: this.flowRange.monthes[this.pointer++].in
            }
          } else {
            this.pointer = 0;
            return {
              done: true,
              value: null,
            }
          }
    }
    
    

}
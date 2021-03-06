import "./Date";
import TimeConstants from "./TimeConstants";
import { Periodicity } from "./Periodicity";
import { Month } from "./Month";

export class Range implements IterableIterator<Month>{
  from: Date;
  to: Date;
  monthes: Month[] = [];
  monthesMap = {} ;
  
  private pointer: number = 0;
  
  constructor(from: Date, to: Date) {
      if (to.getTime() <= from.getTime()) {
        throw new Error("Start date is later or equal end date");
      }    
      this.from = from;
      this.to = to;
      let tmpMonth: Month = new Month(from);
      this.monthes.push(tmpMonth);
      this.monthesMap[tmpMonth.startDate.getTime()] = tmpMonth;
      tmpMonth = tmpMonth.getNext();
      while (tmpMonth.isAfterMonth(to)) {
        this.monthes.push(tmpMonth);
        this.monthesMap[tmpMonth.startDate.getTime()] = tmpMonth;
        tmpMonth = tmpMonth.getNext();
      };
  }
  
  [Symbol.iterator](): IterableIterator<Month> {
    return this;
  }
  next(value?: any): IteratorResult<Month> {
    if (this.pointer < this.monthes.length) {
      return {
        done: false,
        value: this.monthes[this.pointer++]
      }
    } else {
      this.pointer = 0;
      return {
        done: true,
        value: null,
      }
    }
  }
  

  getNumberOfDays(): number {
    let timediff: number = this.to.getTime() - this.from.getTime();
    return timediff / TimeConstants.DAY;
  }

  getNumberOfWeeks(): number {
    let timediff: number = this.to.getTime() - this.from.getTime();
    return timediff / TimeConstants.WEEK;
  }

  getNumberOfMonths(): number {
    return this.monthes.length;
  }

  getNumberOfYears(): number {
    return this.monthes.length/12;
  }

  getNumberOfPeriods(periodicity: Periodicity): number {
    return periodicity.getPeriodsNumberInRange(this);
  }
  getMonthIfExists(date: Date) {
      if (this.monthesMap[date.getTime()]) {
        return this.monthesMap[date.getTime()]
      } else {
        return null;
      }
  }
}

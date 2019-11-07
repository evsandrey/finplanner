import "./Date";
import TimeConstants from "./TimeConstants";

export class Month {
  startDate: Date;
  // in: number;
  // out: number;

  constructor(date: Date) {
    this.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  }
  getEnd(): Date {
    return new Date(
      this.startDate.getFullYear(),
      this.startDate.getMonth() + 1,
      1
    );
  }
  getName(): string {
    return TimeConstants.monthNames[this.startDate.getMonth()];
  }
  isThisMonth(date: Date): boolean {
    return this.startDate.getTime() == date.getStartOfMonth().getTime();
  }
  isAnotherMonth(date: Date): boolean {
    return this.startDate.getTime() !== date.getStartOfMonth().getTime();
  }
  isBeforeMonth(date: Date): boolean {
    return this.startDate.getTime() > date.getStartOfMonth().getTime();
  }
  isAfterMonth(date: Date): boolean {
    return this.startDate.getTime() < date.getStartOfMonth().getTime();
  }
  getNext(): Month {
    let nextMonthStart: Date = this.getEnd();
    return new Month(nextMonthStart);
  }
}

import { DateRange } from "./time/DateRange";
import TimeConstants from "./time/TimeConstants";
import { Period } from "./Period";

export type Periods = "monthly" | "quaterly" | "yearly";

export namespace Periodicity {
  export const aviablePeriods: string[] = ["monthly", "quaterly", "yearly"];

  export function fromEnum(period: Period): Periodicity {
    switch (period) {
      case Period.Month:
        return new Monthly();
      case Period.Quater:
        return new Quaterly();
      case Period.Year:
        return new Yearly();
    }
  }

  export function fromId(key: string): Periodicity {
    switch (key) {
      case "monthly":
        return new Monthly();
      case "quaterly":
        return new Quaterly();
      case "yearly":
        return new Yearly();
      default:
        return new Yearly();
    }
  }

  export function getAllAviable(): Periodicity[] {
    let periodicities: Periodicity[] = [];
    aviablePeriods.forEach(e => {
      periodicities.push(fromId(e));
    });
    return periodicities;
  }

  export function monthly(): Periodicity {
    return new Monthly();
  }
  export function quaterly(): Periodicity {
    return new Quaterly();
  }
  export function yearly(): Periodicity {
    return new Yearly();
  }
}

export interface Periodicity {
  period: Period;
  name: string;
  id: string;
  forSelect: string;
  getPeriodsNumberInRange(range: DateRange): number;
  getPeriodLength(date?: Date): number;
}

export class Monthly implements Periodicity {
  period = Period.Month;
  name = "Monthly";
  id = "monthly";
  forSelect = "per month";
  getPeriodsNumberInRange(range: DateRange): number {
    return range.getNumberOfMonths();
  }
  getPeriodLength(): number {
    return 1;
  }
}

export class Quaterly implements Periodicity {
  period = Period.Quater;
  name = "Quaterly";
  id = "quaterly";
  forSelect = "per quater";
  getPeriodsNumberInRange(range: DateRange): number {
    return range.getNumberOfMonths() / 3;
  }
  getPeriodLength(): number {
    return 3;
  }
}

export class Yearly implements Periodicity {
  period = Period.Year;
  name = "Yearly";
  id = "yearly";
  forSelect = "per year";
  getPeriodsNumberInRange(range: DateRange): number {
    return range.getNumberOfYears();
  }
  getPeriodLength(): number {
    return 12;
  }
}

export class DayCode {
  month: number | undefined;
  day: number;
  constructor(day: number, month?: number) {
    this.day = day;
    this.month = month;
  }
  setDay(day: number): void {
    this.day = day
  }
  setMonth(month: number): void {
    this.month = month
  }
}

export class ReleaseDay {
  dayCode: DayCode;
  period: Periods;
  constructor(period: Periods, dayCode: DayCode) {
    this.dayCode = dayCode;
    this.period = period;
  }
  isToday(date: Date): boolean {
    let dayOfMonth = date.getDayOfMonth();
    let month = date.getMonth();
    switch (this.period) {
      case "monthly":
        return dayOfMonth == this.dayCode.day;
      case "quaterly":
        throw "not implemented";
      case "yearly":
        return dayOfMonth == this.dayCode.day && month == this.dayCode.month;
    }
  }
}

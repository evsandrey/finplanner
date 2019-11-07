import { DateRange } from "./DateRange";
import TimeConstants from "./TimeConstants";

export enum Period {
  Monthly = "monthly",
  Quaterly = "quaterly",
  Yearly = "yearly"
}

export namespace Period {
  // export function parse(period: string): Period {
  //     return Period[period];
  // }
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
  getPeriodsNumberInRange(range: DateRange): number;
  getPeriodLength(date?: Date): number;
}

export class Monthly implements Periodicity {
  getPeriodsNumberInRange(range: DateRange): number {
    return range.getNumberOfMonths();
  }
  getPeriodLength(): number {
    return 1;
  }
}

export class Quaterly implements Periodicity {
  getPeriodsNumberInRange(range: DateRange): number {
    return range.getNumberOfMonths() / 3;
  }
  getPeriodLength(): number {
    return 3;
  }
}

export class Yearly implements Periodicity {
  getPeriodsNumberInRange(range: DateRange): number {
    return range.getNumberOfYears();
  }
  getPeriodLength(): number {
    return 12;
  }
}

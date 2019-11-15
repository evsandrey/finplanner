import { Periodicity }  from "../utils/Periodicity";
import { DateRanged } from '../interfaces/DateRanged';
import { Identifiable } from '../interfaces/Identifiable';
import { DateRange } from "../utils/time/DateRange"

export abstract class Change implements DateRanged,Identifiable {
  name: string | undefined;
  id: string | undefined;
  range: DateRange = new DateRange(new Date(),new Date());
  changeRate: number = 0;
  changePeriodicity: Periodicity = Periodicity.yearly();
  constructor(changeRate: number, changePeriodicity: Periodicity) {
    this.changeRate = changeRate;
    this.changePeriodicity = changePeriodicity; 
  }
}

export namespace ChangeHelper {
  export const aviableChanges: string[] = ["percents", "units"];
  export function fromId(
    key: string,
    changeRate: number,
    changePeriodicity: Periodicity
  ): Change {
    switch (key) {
      case "percents":
        return new PercentageChange(changeRate, changePeriodicity);
      case "units":
        return new UnitsGrowth(changeRate, changePeriodicity);
      default:
        return new UnitsGrowth(changeRate, changePeriodicity);
    }
  }

  export function getAllAviable(
    changeRate: number,
    changePeriodicity: Periodicity
  ): Change[] {
    let changes: Change[] = [];
    aviableChanges.forEach(e => {
      changes.push(fromId(e, changeRate, changePeriodicity));
    });
    return changes;
  }

  export function percentage(
    changeRate: number,
    changePeriodicity: Periodicity
  ): Change {
    return new PercentageChange(changeRate, changePeriodicity);
  }
  export function units(
    changeRate: number,
    changePeriodicity: Periodicity
  ): Change {
    return new PercentageChange(changeRate, changePeriodicity);
  }
}

export class PercentageChange extends Change {
  id: string = "percents";
  constructor(changeRate: number, changePeriodicity: Periodicity) {
    super(changeRate, changePeriodicity);
  }
}

export class UnitsGrowth extends Change {
  id: string = "units";
  constructor(changeRate: number, changePeriodicity: Periodicity) {
    super(changeRate, changePeriodicity);
  }
}

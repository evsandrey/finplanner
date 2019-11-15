import { Periodicity } from "../utils/Periodicity";
import { Cash } from "./Cash";
import { Change } from '../change/Change';
import { Identifiable } from '../interfaces/Identifiable';

export class CashFlow implements Identifiable {
  name: string | undefined;
  id: string | undefined;
  periodicity: Periodicity;
  fromChange: Change;
  from: Cash | undefined = undefined;
  to: Cash | undefined = undefined;
  
  constructor(fromChange: Change, periodicity: Periodicity, from?: Cash , to?: Cash) {
    this.fromChange = fromChange;
    this.periodicity = periodicity;
  }
  
  setFrom (from: Cash) {
    this.from = from;
  }
  setTo (to: Cash) {
    this.to = to;
  }

  setName(name: string): void {
    this.name = name;
  }
  setId(id: string): void {
    throw new Error("Method not implemented.");
  }


}

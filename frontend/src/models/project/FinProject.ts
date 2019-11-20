import { DateRange } from "../utils/time/DateRange";
import { Cash } from "../basic/Cash";
import { CashFlow } from "../basic/CashFlow";

export interface FinProject {
  projects: FinProject[];
  range: DateRange;
  balance: Cash[];
  input: CashFlow[];
  output: CashFlow[];
  constructor(range: DateRange): FinProject;
  getBalance(date: Date): Cash;
  getOut(date: Date): Cash;
  getIn(date: Date): Cash;

  recalc(): void;
}

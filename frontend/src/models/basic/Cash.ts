import { Currency } from "./Currency";
import { Change } from "../change/Change";
import { CashFlow } from "./CashFlow";

export class Cash {
  name: string = "New cash";
  id: string = "";
  amount: number;
  currency: Currency;
  changes: Change[] = [];
  cashFlows: CashFlow[] = [];

  constructor(amount: number, currency: Currency) {
    this.amount = amount;
    this.currency = currency;
  }

  putCash(cash: Cash): void {
    // todo: currency conversion
    this.amount += cash.amount;
  }

  takeCash(amount: number): Cash {
    // todo: currency conversion
    this.amount -= amount;
    return new Cash(amount, this.currency);
  }

  addChange(change: Change) {
    if (this.changes) {
      this.changes.push(change);
    } else {
      this.changes = [];
      this.changes.push(change);
    }
  }

  removeChange(change: Change) {
    throw "not implemented";
  }

  addCashFlow(cashFlow: CashFlow) {
    if (this.cashFlows) {
      this.cashFlows.push(cashFlow);
    } else {
      this.cashFlows = [];
      this.cashFlows.push(cashFlow);
    }
  }
  removeCashFlow(change: Change) {
    throw "not implemented";
  }
}

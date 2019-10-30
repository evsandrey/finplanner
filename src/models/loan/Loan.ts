import { Period, Periodicity } from "../utils/Periodicity";
import Rate from "../utils/Rate";
import { Range } from "../utils/Range"
import CashFlow from "../../interfaces/CashFlow";
import { Month } from "../utils/Month";
import { RangedCashFlow } from "../../interfaces/RangedCashFlow";

export const enum LoanType{
  Annuity = 1,
  Deferred = 2 
}

export abstract class Loan implements RangedCashFlow {
  public loanType: LoanType;
  public totalAmmount: number; // total amount of credit
  public rate: Rate; // rate of credit
  public flowRange: Range;
  public paymentPeriodicity: Periodicity;
  

  numberOfPayments: number;
  
  constructor(
    loanType: LoanType,
    totalAmmount: number,
    rate: Rate,
    range: Range,
    paymentPeriodicity: Periodicity
  ) {
    this.loanType =  loanType;
    this.totalAmmount = totalAmmount;
    this.rate = rate;
    this.flowRange = range;
    this.paymentPeriodicity = paymentPeriodicity;
  }

  getFlowForMonth(): number {
    return this.getPayment();
  }

  getFlow(date: Date): number {
    throw new Error("Method not implemented.");
  }

  getInfo() :object {
    return {
      loanType: this.loanType,
      totalAmmount: this.totalAmmount,
      rate: this.rate,
      range: this.flowRange,
      paymentPeriodicity: this.paymentPeriodicity,
      paymentsNumber: this.flowRange.getNumberOfPeriods(this.paymentPeriodicity)
    }
  }
  recalculate(){
    for (let month of this.flowRange) {
        
    }
  }


  getPayment() : number {
    let S = this.totalAmmount;
    let P = this.rate.convertSimpleRateTo(this.paymentPeriodicity);
    let N = this.flowRange.getNumberOfPeriods(this.paymentPeriodicity); // number of periods/payments
 
    let formulaTop = S*P/100;
    let formulaBottom = 1-Math.pow((1+P/100),N*-1)
    // let payment = formulaTop/formulaBottom;
    
    let i = P/100;
    let wholeTimeChange = Math.pow(1+i,N);
    let annuityCoef = (i*wholeTimeChange)/(wholeTimeChange-1);

    let payment = S*annuityCoef
    return payment;
  }


  /**
   * setRateForPeriod :void  
   * 
   * Base is Daily rate
   * 
   * */
  // public setRateForPeriod() :void {
  //     this.paymentPeriodicity
  //     this.ratePeriodicity
  // }

}

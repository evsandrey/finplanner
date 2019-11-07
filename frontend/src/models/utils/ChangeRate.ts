import { Monthly, Yearly, Periodicity } from "./Periodicity";
import { DateRange } from "./DateRange";


export enum RateType {
    Simple,
    Compound,
    Static
}

export default class ChangeRate {
    periodicity: Periodicity; 
    rate: number; 
    
    constructor(periodicity: Periodicity, rate: number) {
        this.periodicity = periodicity;
        this.rate = rate; 
    }

    convertCompoundRate(fromPeriodicity: Periodicity, toPeriodicity : Periodicity , rate: number) {
        // http://eos.ibi.spb.ru/umk/6_6/5/5_R2_T2.html
        // В качестве единого промежутка возьмем промежуток величины t x t’. 
        // В нем содержатся периоды t в количестве t’ и периоды t’ в количестве t. 
        // Условие эквивалентности запишется в виде равенства:
        // 
        // https://www.quora.com/How-do-you-convert-an-annual-interest-to-a-monthly-rate 
        // i  = ( 1 + i`)^t /t` - 1 
        // i` = ( 1 + i )^t`/t  - 1 
        //
        
        let i: number = rate/100;
        let i1: number;
        let t: number = fromPeriodicity.getPeriodLength();
        let t1: number = toPeriodicity.getPeriodLength();
        i1 = Math.pow((1+i),(t1/t)) - 1;
        return i1*100;
    }

    convertSimpleRate(fromPeriodicity: Periodicity, toPeriodicity : Periodicity , rate: number) {
        let i1: number;
        let t: number = fromPeriodicity.getPeriodLength();
        let t1: number = toPeriodicity.getPeriodLength();
        i1 = rate*(t1/t);
        return i1;
    }

    convertSimpleRateTo(toPeriodicity : Periodicity) {
        let t: number =  this.periodicity.getPeriodLength();
        let t1: number = toPeriodicity.getPeriodLength();
        let i1 = this.rate*(t1/t);
        return i1;
    }


    // toMonthly() :Rate {
    //     switch (typeof this.periodicity) {
    //         case typeof Daily:
    //             let dailyRate = 0
    //             return new Rate(new Monthly,newRate); 
    //             break;
    //         case typeof Weekly:
    //             let weeklyRate: number = 0
    //             return new Rate(new Monthly,newRate); 
    //             break;
    //         case typeof Monthly:
    //             return this;
    //             break;
    //         case typeof Yearly:
    //             let yearlyRate: number = 0
    //             return new Rate(new Monthly,newRate); 
    //             break;
    //     }

    // }


}
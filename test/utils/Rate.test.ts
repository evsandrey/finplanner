import Rate from "../../src/models/utils/Rate";
import { Periodicity, Yearly, Monthly } from "../../src/models/utils/Periodicity";
import { Range } from "../../src/models/utils/Range";

let yearly = new Yearly();
let monthly = new Monthly();

let rate: Rate = new Rate(monthly,10)

test('Check Compound rate convertations annual to monthly', () => {
    let yearlyRate: number = 10;
    let monthlyRate = rate.convertCompoundRate(yearly,monthly,yearlyRate)
    let ammount = 100;
    let using_year = 100*(1+yearlyRate/100);
    // expect(monthlyRate).toBe(0.7974140428903764);
    let using_month = 100 * Math.pow((1+monthlyRate/100),12);
    expect(using_month.toFixed(2)).toBe(using_year.toFixed(2));
});

test('Check Compound rate convertations monthly to annual', () => {
    let monthlyRate: number = 10;
    let yearlyRate = rate.convertCompoundRate(monthly,yearly,monthlyRate)
    let ammount = 100;
    let using_month = 100 * Math.pow((1+monthlyRate/100),12);
    let using_year = 100*(1+yearlyRate/100);
    expect(using_month.toFixed(2)).toBe(using_year.toFixed(2));
});

test('Check simple rate convertations monthly to annual', () => {
    let monthlyRate: number = 10;
    let yearlyRate = rate.convertSimpleRate(monthly,yearly,monthlyRate)
    expect(yearlyRate).toBe(120);
});

test('Check simple rate convertations annual to monthly', () => {
    let yearlyRate: number = 120;
    let monthlyRate = rate.convertSimpleRate(yearly,monthly,yearlyRate)
    expect(monthlyRate).toBe(10);
});
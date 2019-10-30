import { Loan, LoanType } from "../src/models/loan/Loan";
import Rate from "../src/models/utils/Rate";
import { Period } from "../src/models/utils/Periodicity";
import { Range } from "../src/models/utils/Range";

let jan19: Date = new Date(2019, 0, 1);
let jan21: Date = new Date(2021, 0, 1);

let loan: Loan = new Loan(LoanType.Annuity,100000,new Rate(Period.yearly(),10),new Range(jan19,jan21),Period.monthly())

test('Base annuity Loan', () => {
    let payment: number = loan.getPayment()
    expect(payment).toBe(4614.492633751669);
});
import {Month} from "../../src/models/utils/Month";

let jan1: Date = new Date(2019, 0, 1);
let jan15: Date = new Date(2019, 0, 15);
let feb1: Date = new Date(2019, 1, 1);
let feb15: Date = new Date(2019, 1, 15);
let jan1_leap: Date = new Date(2020, 0, 1);
let feb29_leap: Date = new Date(2020, 1, 29);
let month: Month = new Month(jan1);

test('Check start and end of month', () => {
    expect(month.startDate.getTime()).toBe(new Date(2019, 0, 1).getTime());
    expect(month.getEnd().getTime()).toBe(new Date(2019, 1, 1).getTime());
});

test('Check next month', () => {
    let nextMonth = month.getNext();
    expect(nextMonth.startDate.getTime()).toBe(new Date(2019, 1, 1).getTime());
    expect(nextMonth.getEnd().getTime()).toBe(new Date(2019, 2, 1).getTime());
});

test('Check isAnotherMonth ', () => {
    let nextMonth = month.getNext();
    let isAnother :boolean = month.isAnotherMonth(nextMonth.startDate)  
    expect(isAnother).toBe(true);
    isAnother = month.isAnotherMonth(jan15);
    expect(isAnother).toBe(false);
});



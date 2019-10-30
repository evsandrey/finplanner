import { Range } from "../../src/models/utils/Range";


let jan1: Date = new Date(2019, 0, 1);
let jan1_leap: Date = new Date(2020, 0, 1);
let feb29_leap: Date = new Date(2020, 1, 29);
let feb28: Date = new Date(2019, 1, 28);
let feb28_leap: Date = new Date(2020, 1, 28);
let feb13_leap: Date = new Date(2020, 1, 13);
let dec31: Date = new Date(2019, 11, 31);

// // Range tests
// // Constructor tests
test('Check days diff = 0 throw error', () => {
    let from = jan1.clone();
    let to = jan1.clone();
    const t = () => {
        new Range(from,to)
    };
    expect(t).toThrow(Error);
});

test('Check days diff < 0 throw error', () => {
    let from = new Date(2019, 1, 10);
    let to = new Date(2019, 1, 1);
    const t = () => {
        new Range(from,to)
    };
    expect(t).toThrow(Error);
});

// Get getNumberOfDays tests

test('Check days diff 2019, 1, 10 - 2019, 1, 1 = 9' , () => {
    let from = new Date(2019, 1, 1);
    let to = new Date(2019, 1, 10);
    let range: Range = new Range(from,to)
    expect(range.getNumberOfDays()).toBe(9);
});

test('Check days diff 2019, 1, 1 - 2019, 1, 1, 12, 0 = 0' , () => {
    let from = new Date(2019, 1, 1);
    let to = new Date(2019, 1, 1,12,0);
    let range: Range = new Range(from,to)
    expect(range.getNumberOfDays()).toBe(0.5);
});

test('Check days diff 2018, 1, 1 - 2019, 1, 1 = 0' , () => {
    let from = new Date(2018, 1, 1);
    let to = new Date(2019, 1, 1);
    let range: Range = new Range(from,to)
    expect(range.getNumberOfDays()).toBe(365);
});

test('Check year diff 2018, 1, 1 - 2019, 1, 1 = 1' , () => {
    let from = new Date(2018, 1, 1);
    let to = new Date(2019, 1, 1);
    let range: Range = new Range(from,to)
    expect(range.getNumberOfYears()).toBe(1);
});

test('Check year diff 2018, 1, 1 - 2019, 1, 1 = 1' , () => {
    let range: Range = new Range(jan1,jan1_leap)
    expect(range.getNumberOfYears()).toBe(0.9999925144097612);
});

test('Check that 12 monthes in 2019, 0, 1 - 2020, 0, 1 = 1' , () => {
    let range: Range = new Range(jan1,jan1_leap)
    expect(range.monthes.length).toBe(12);
    for (let month of range) {
        console.log(month.getName());
    }
});

test('Check that 1 month in 2018, 0, 1 - 2018, 0, 17 = 1' , () => {
    let from = new Date(2019, 0, 1);
    let to = new Date(2019, 0, 17);
    let range: Range = new Range(from,to)
    expect(range.monthes.length).toBe(1);
    expect(range.monthes[0].getName() ).toBe("January")

});


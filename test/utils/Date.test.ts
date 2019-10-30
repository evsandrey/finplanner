import "../../src/models/utils/Date";


let jan1: Date = new Date(2019, 0, 1);
let jan1_leap: Date = new Date(2020, 0, 1);
let feb29_leap: Date = new Date(2020, 1, 29);
let feb28: Date = new Date(2019, 1, 28);
let feb28_leap: Date = new Date(2020, 1, 28);
let feb13_leap: Date = new Date(2020, 1, 13);
let dec31: Date = new Date(2019, 11, 31);
let dec31_leap: Date = new Date(2020, 11, 31);



// DateHelperTest
// getDaysInMonth
test('Check days in january', () => {
    let days = jan1.getDaysInMonth()
    expect(days).toBe(31);
});

test('Check days in dec', () => {
    let days = dec31.getDaysInMonth()
    expect(days).toBe(31);
    days = dec31.getDaysInMonth()
    expect(days).toBe(31);
});

test('Check days in Feb 2020 = 29(Leap year)', () => {
    let days = feb29_leap.getDaysInMonth()
    expect(days).toBe(29);
    days = feb29_leap.getDaysInMonth()
    expect(days).toBe(29);
});

test('Check days in Feb 2019 = 28 and 2020 = 29', () => {
    let days = feb28.getDaysInMonth()
    expect(days).toBe(28);
    days = feb28_leap.getDaysInMonth()
    expect(days).toBe(29);
});

test('Check days in Feb 2019 = 28 and 2020 = 29', () => {
    let days = feb28.getDaysInMonth()
    expect(days).toBe(28);
    days = feb28_leap.getDaysInMonth()
    expect(days).toBe(29);
});
//getDayOfMonth
test('Check days in Feb 2019 = 28', () => {
    expect(jan1.getDayOfMonth()).toBe(1);
    expect(feb28.getDayOfMonth()).toBe(28);
    expect(feb28_leap.getDayOfMonth()).toBe(28);
    
});

//getDaysTillTheEndOfMonth
test('Check days in Feb 2019 = 28', () => {
    expect(jan1.getDaysTillTheEndOfMonth()).toBe(30);
    expect(feb28.getDaysTillTheEndOfMonth()).toBe(0);
    expect(feb28_leap.getDaysTillTheEndOfMonth()).toBe(1);
    
});



// Year 
// getDaysInTheYear
test('Check days in 2019 = 365, and 2020 = 366', () => {
    expect(feb13_leap.getDaysInTheYear()).toBe(366);
    expect(feb28.getDaysInTheYear()).toBe(365);
});

// getDaysFromTheBeginningOffYear
test('Check days from beginning in Feb 2019 = 28', () => {
    let days = feb28.getDayOfTheYear()
    expect(days).toBe(28+31);
});

test('Check days in Feb 2020 = 29(Leap year)', () => {
    let days = feb29_leap.getDayOfTheYear()
    expect(days).toBe(29+31);  
});

// getDaysTillTheEndOffYear
test('Check days till the end of the year', () => {
    expect(dec31.getDaysTillTheEndOffYear()).toBe(0);
    expect(dec31_leap.getDaysTillTheEndOffYear()).toBe(0);
    expect(jan1.getDaysTillTheEndOffYear()).toBe(364);
    expect(jan1_leap.getDaysTillTheEndOffYear()).toBe(365);
});